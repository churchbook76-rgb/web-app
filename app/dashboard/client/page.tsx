'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ClientDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'CLIENT') {
      router.push('/login')
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">ShopHub</Link>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Client
              </span>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">My Orders</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">--</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Wishlist Items</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">--</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">KES --</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link href="/products" className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition block">
              <h3 className="font-medium text-gray-900">Browse Products</h3>
              <p className="text-sm text-gray-500 mt-1">Shop our catalog</p>
            </Link>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-left">
              <h3 className="font-medium text-gray-900">My Orders</h3>
              <p className="text-sm text-gray-500 mt-1">Track deliveries</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition text-left">
              <h3 className="font-medium text-gray-900">Wishlist</h3>
              <p className="text-sm text-gray-500 mt-1">Saved items</p>
            </button>
          </div>
        </div>

        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-green-800">🎉 Welcome to ShopHub!</h3>
          <p className="mt-2 text-sm text-green-700">
            Your account is set up. Start shopping and track your orders here. More features coming soon!
          </p>
        </div>
      </main>
    </div>
  )
}
