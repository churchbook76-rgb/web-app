# Quick Start Guide

## 🚀 Getting the Application Running

The "ERR_CONNECTION_REFUSED" error means the development server isn't running yet. Follow these steps to start the application:

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages.

### Step 2: Start the Development Server

```bash
npm run dev
```

The server will start on **http://localhost:3000**

You should see output like:
```
▲ Next.js 16.1.1
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.3s
```

### Step 3: Open in Browser

Navigate to **http://localhost:3000** in your browser to see the homepage.

---

## 📝 Optional: Set Up Database (For Full Features)

If you want to test the full application with database functionality:

### 1. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your PostgreSQL database URL:
```
DATABASE_URL="postgresql://username:password@localhost:5432/shophub"
JWT_SECRET="your-secure-random-secret-key-here"
```

### 2. Generate Prisma client:
```bash
npm run db:generate
```

### 3. Push database schema:
```bash
npm run db:push
```

### 4. Seed with test data:
```bash
npm run db:seed
```

This creates test users:
- **Admin**: admin@shophub.com / admin123
- **Reseller**: reseller@shophub.com / reseller123
- **Client**: client@shophub.com / client123

---

## 🛠️ Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can:
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found
If you get module errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Issues
- Make sure PostgreSQL is running
- Check your DATABASE_URL in `.env`
- Ensure the database exists

---

## 📚 Available Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint

# Database commands (requires PostgreSQL)
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with test data
npm run db:studio    # Open Prisma Studio (database GUI)
```

---

## ✨ What You'll See

When you visit http://localhost:3000, you'll see:
- ✅ Modern, responsive homepage
- ✅ Hero section with "Welcome to ShopHub"
- ✅ 6 feature cards (Easy Shopping, Order Tracking, etc.)
- ✅ Trust badges (M-Pesa, Secure Checkout, Fast Delivery)
- ✅ Professional navigation and footer

The homepage works **without database setup** - it's a static page to showcase the UI!

---

## 🎯 Next Steps

1. Start the dev server: `npm run dev`
2. View the homepage at http://localhost:3000
3. (Optional) Set up database for full features
4. (Optional) Run `npm run db:seed` for test data
5. Explore the codebase in `app/`, `lib/`, and `prisma/`
