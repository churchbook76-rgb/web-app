import { UserRole, OrderStatus, PaymentStatus } from '@prisma/client'

// User types
export interface UserProfile {
  id: string
  email: string
  name: string
  phone?: string | null
  role: UserRole
  referralCode?: string | null
}

// Product types
export interface ProductWithDetails {
  id: string
  name: string
  description: string
  price: number
  comparePrice?: number | null
  images: string[]
  category: string
  brand?: string | null
  stock: number
  slug: string
}

// Cart types
export interface CartItem {
  productId: string
  quantity: number
  price: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
}

// Order types
export interface OrderSummary {
  id: string
  orderNumber: string
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  createdAt: Date
  itemCount: number
}

// Dashboard types
export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  completedOrders: number
}

export interface ResellerStats extends DashboardStats {
  totalCommission: number
  referrals: number
}

export interface AdminStats extends DashboardStats {
  totalUsers: number
  totalProducts: number
  lowStockProducts: number
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Filter and pagination types
export interface PaginationParams {
  page: number
  perPage: number
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular'
}
