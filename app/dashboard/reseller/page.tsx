'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResellerDashboard() {
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
    if (parsedUser.role !== 'RESELLER') {
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
              <span className="ml-4 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                Reseller
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
          <h1 className="text-3xl font-bold text-gray-900">Reseller Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user.name}!</p>
          {user.referralCode && (
            <p className="mt-1 text-sm text-gray-500">
              Your referral code: <span className="font-mono font-bold text-primary-600">{user.referralCode}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Commission Rate</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{user.commission || 0}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">--</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Earnings</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">KES --</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
              <h3 className="font-medium text-gray-900">Bulk Order</h3>
              <p className="text-sm text-gray-500 mt-1">Place bulk orders</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
              <h3 className="font-medium text-gray-900">My Orders</h3>
              <p className="text-sm text-gray-500 mt-1">View order history</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition">
              <h3 className="font-medium text-gray-900">Referrals</h3>
              <p className="text-sm text-gray-500 mt-1">Track referrals</p>
            </button>
          </div>
        </div>

        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-purple-800">✨ Reseller Benefits</h3>
          <p className="mt-2 text-sm text-purple-700">
            You earn {user.commission || 0}% commission on all orders. Full features coming in Phase 6!
          </p>
        </div>
      </main>
    </div>
  )
}
