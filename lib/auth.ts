import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserRole } from '@prisma/client'

const getJWTSecret = (): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set. Please configure it in your .env file.')
  }
  return secret
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
  role: UserRole
}

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

/**
 * Verify password against hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

/**
 * Generate JWT token
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, getJWTSecret(), {
    expiresIn: JWT_EXPIRES_IN,
  } as any)
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, getJWTSecret()) as JWTPayload
  } catch (error) {
    return null
  }
}

/**
 * Generate a random referral code
 */
export function generateReferralCode(name: string): string {
  const sanitized = name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${sanitized.substring(0, 4)}${random}`
}
