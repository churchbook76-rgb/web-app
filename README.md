# E-Commerce Web Application

A modern, beautiful, and user-friendly e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. This application supports order placement and tracking with dedicated dashboards for Admin, Reseller, and Client roles.

## 🚀 Quick Start

**Just want to see the app?**

```bash
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser!

> **Note**: The homepage works without database setup. For full features (authentication, orders, etc.), see the [Getting Started](#getting-started) section below.

## Features

### Public Storefront
- 🏪 Beautiful homepage with hero section
- 🛍️ Product browsing and filtering
- 🔍 Advanced search functionality
- 🛒 Shopping cart management
- 💳 Secure checkout with M-Pesa integration

### Multi-Role System
- 👤 **Client Dashboard**: Order tracking, wishlist, payment history
- 🏢 **Reseller Dashboard**: Bulk ordering, sales tracking, commission reports
- 👨‍💼 **Admin Dashboard**: Order management, inventory control, user management

### Modern UX Features
- 📱 Mobile-first responsive design
- ⚡ Fast page loads with Next.js App Router
- 🎨 Beautiful UI with Tailwind CSS
- 🔐 Secure authentication with JWT
- 📊 Real-time order tracking
- 🌍 M-Pesa payment integration (Kenya)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM (planned)
- **Authentication**: JWT-based auth (planned)
- **Payment**: M-Pesa integration (planned)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/churchbook76-rgb/web-app.git
cd web-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your database URL and other configuration.

4. Generate Prisma client:
```bash
npm run db:generate
```

5. Push database schema (for development):
```bash
npm run db:push
```

6. (Optional) Seed the database with sample data:
```bash
npm run db:seed
```

This creates test users:
- **Admin**: admin@shophub.com / admin123
- **Reseller**: reseller@shophub.com / reseller123
- **Client**: client@shophub.com / client123

7. Run the development server:
```bash
npm run dev
```

8. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
web-app/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes (login, register)
│   ├── dashboard/         # Role-based dashboards
│   │   ├── admin/        # Admin dashboard
│   │   ├── reseller/     # Reseller dashboard
│   │   └── client/       # Client dashboard
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   ├── products/         # Product-related components
│   ├── cart/             # Cart components
│   └── dashboard/        # Dashboard components
├── lib/                   # Utility functions and helpers
├── prisma/               # Database schema and migrations
└── public/               # Static assets

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Implementation Roadmap

### ✅ Phase 1: Project Setup (Completed)
- [x] Initialize Next.js with TypeScript
- [x] Configure Tailwind CSS
- [x] Set up project structure
- [x] Create homepage with modern UI

### ✅ Phase 2: Database Schema & Models (Completed)
- [x] Design database schema for users (admin, reseller, client)
- [x] Design database schema for products with variants
- [x] Design database schema for orders and order items
- [x] Design database schema for payments (M-Pesa ready)
- [x] Set up Prisma ORM with PostgreSQL
- [x] Create utility functions for database operations
- [x] Create authentication utilities (JWT, password hashing)
- [x] Add database seeding script for development

### 📋 Phase 3: Core Features (Planned)
- [ ] Product catalog and filtering
- [ ] Shopping cart functionality
- [ ] Checkout flow
- [ ] Payment integration (M-Pesa)

### 📋 Phase 4: Dashboards (Planned)
- [ ] Client dashboard
- [ ] Reseller dashboard
- [ ] Admin dashboard

### 📋 Phase 5: Advanced Features (Planned)
- [ ] Order tracking
- [ ] Notifications (SMS/Email)
- [ ] Analytics and reporting
- [ ] PWA support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

For support, please contact the development team.
