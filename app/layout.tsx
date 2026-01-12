import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'E-Commerce Platform - Order & Track',
  description: 'Modern e-commerce platform with order placement and tracking for Admin, Reseller, and Client',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
