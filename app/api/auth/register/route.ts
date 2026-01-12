import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken, generateReferralCode } from '@/lib/auth'
import { validateKenyanPhone } from '@/lib/utils'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, phone, role } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Validate role
    const validRoles = ['CLIENT', 'RESELLER']
    if (role && !validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be CLIENT or RESELLER' },
        { status: 400 }
      )
    }

    // Validate phone number if provided
    if (phone && !validateKenyanPhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid Kenyan phone number format' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Prepare user data
    const userData: any = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || null,
      role: role || 'CLIENT',
    }

    // Add reseller-specific fields
    if (role === 'RESELLER') {
      userData.commission = 10 // Default 10% commission
      userData.referralCode = generateReferralCode(name)
    }

    // Create user
    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        commission: true,
        referralCode: true,
      },
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      success: true,
      token,
      user,
    }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}
