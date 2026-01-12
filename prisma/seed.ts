import { PrismaClient, UserRole } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await hashPassword('admin123')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@shophub.com' },
    update: {},
    create: {
      email: 'admin@shophub.com',
      password: adminPassword,
      name: 'Admin User',
      phone: '254712345678',
      role: UserRole.ADMIN,
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // Create reseller user
  const resellerPassword = await hashPassword('reseller123')
  const reseller = await prisma.user.upsert({
    where: { email: 'reseller@shophub.com' },
    update: {},
    create: {
      email: 'reseller@shophub.com',
      password: resellerPassword,
      name: 'Reseller User',
      phone: '254723456789',
      role: UserRole.RESELLER,
      commission: 10,
      referralCode: 'RESE1234',
    },
  })
  console.log('✅ Created reseller user:', reseller.email)

  // Create client user
  const clientPassword = await hashPassword('client123')
  const client = await prisma.user.upsert({
    where: { email: 'client@shophub.com' },
    update: {},
    create: {
      email: 'client@shophub.com',
      password: clientPassword,
      name: 'Client User',
      phone: '254734567890',
      role: UserRole.CLIENT,
    },
  })
  console.log('✅ Created client user:', client.email)

  // Create sample products
  const products = [
    {
      name: 'Wireless Earbuds Pro',
      description: 'Premium wireless earbuds with active noise cancellation and 24-hour battery life.',
      price: 8500,
      comparePrice: 12000,
      images: ['/images/products/earbuds-1.jpg'],
      category: 'Electronics',
      brand: 'AudioMax',
      stock: 50,
      sku: 'EARB-PRO-001',
      slug: 'wireless-earbuds-pro',
      metaTitle: 'Wireless Earbuds Pro - Premium Audio',
      metaDescription: 'Experience crystal-clear audio with our premium wireless earbuds.',
    },
    {
      name: 'Smart Watch Series 5',
      description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and GPS.',
      price: 15000,
      comparePrice: 20000,
      images: ['/images/products/smartwatch-1.jpg'],
      category: 'Electronics',
      brand: 'TechTime',
      stock: 30,
      sku: 'WATCH-S5-001',
      slug: 'smart-watch-series-5',
      metaTitle: 'Smart Watch Series 5 - Fitness Tracker',
      metaDescription: 'Track your fitness goals with our advanced smartwatch.',
    },
    {
      name: 'Laptop Backpack Pro',
      description: 'Durable laptop backpack with anti-theft features and USB charging port.',
      price: 4500,
      images: ['/images/products/backpack-1.jpg'],
      category: 'Accessories',
      brand: 'TravelGear',
      stock: 100,
      sku: 'BAG-PRO-001',
      slug: 'laptop-backpack-pro',
      metaTitle: 'Laptop Backpack Pro - Travel Essentials',
      metaDescription: 'Protect your laptop with our durable and stylish backpack.',
    },
    {
      name: 'Portable Power Bank 20000mAh',
      description: 'High-capacity power bank with fast charging and dual USB ports.',
      price: 2500,
      comparePrice: 3500,
      images: ['/images/products/powerbank-1.jpg'],
      category: 'Electronics',
      brand: 'PowerMax',
      stock: 150,
      sku: 'PWR-20K-001',
      slug: 'portable-power-bank-20000mah',
      metaTitle: 'Portable Power Bank 20000mAh',
      metaDescription: 'Never run out of power with our high-capacity power bank.',
    },
    {
      name: 'Wireless Gaming Mouse',
      description: 'Ergonomic wireless gaming mouse with RGB lighting and programmable buttons.',
      price: 3200,
      images: ['/images/products/mouse-1.jpg'],
      category: 'Electronics',
      brand: 'GameGear',
      stock: 75,
      sku: 'MOUSE-WG-001',
      slug: 'wireless-gaming-mouse',
      metaTitle: 'Wireless Gaming Mouse - Pro Gaming',
      metaDescription: 'Level up your gaming with our wireless gaming mouse.',
    },
    {
      name: 'Phone Case Premium Leather',
      description: 'Genuine leather phone case with card slots and kickstand.',
      price: 1200,
      images: ['/images/products/case-1.jpg'],
      category: 'Accessories',
      brand: 'CaseMaster',
      stock: 200,
      sku: 'CASE-LEAT-001',
      slug: 'phone-case-premium-leather',
      metaTitle: 'Premium Leather Phone Case',
      metaDescription: 'Protect your phone with style using our premium leather case.',
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    })
  }
  console.log(`✅ Created ${products.length} sample products`)

  console.log('🎉 Database seed completed!')
  console.log('\n📝 Test Credentials:')
  console.log('   Admin: admin@shophub.com / admin123')
  console.log('   Reseller: reseller@shophub.com / reseller123')
  console.log('   Client: client@shophub.com / client123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
