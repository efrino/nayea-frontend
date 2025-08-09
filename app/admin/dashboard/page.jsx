// app/admin/dashboard/page.jsx - Updated for Direct Selling
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Eye,
  BarChart3,
  UserCheck,
  Bell,
  Settings,
  AlertTriangle,
  Clock
} from 'lucide-react'

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalStaff: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    activeOrders: 0,
    pendingOrders: 0
  })

  useEffect(() => {
    // Simulate fetching admin dashboard data
    setStats({
      totalCustomers: 15420,
      totalStaff: 45,
      totalProducts: 1250,
      totalOrders: 8934,
      totalRevenue: 856800000,
      monthlyGrowth: 12.5,
      activeOrders: 234,
      pendingOrders: 67
    })
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const statsCards = [
    {
      title: 'Total Customer',
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      growth: '+8.2%',
      detail: 'customer aktif'
    },
    {
      title: 'Total Staff',
      value: stats.totalStaff.toLocaleString(),
      icon: UserCheck,
      color: 'from-purple-500 to-purple-600',
      growth: '+2 orang',
      detail: 'staff aktif'
    },
    {
      title: 'Total Produk',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'from-green-500 to-green-600',
      growth: '+15 produk',
      detail: 'produk aktif'
    },
    {
      title: 'Total Pesanan',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      growth: '+15.3%',
      detail: 'bulan ini'
    },
    {
      title: 'Total Pendapatan',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'from-islamic-green-500 to-islamic-green-600',
      growth: '+22.1%',
      detail: 'bulan ini'
    },
    {
      title: 'Pesanan Aktif',
      value: stats.activeOrders.toLocaleString(),
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      growth: 'sedang diproses',
      detail: 'perlu perhatian'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="islamic-container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin Nayea.id</h1>
              <p className="text-gray-600 mt-1">
                Selamat datang kembali, {session?.user?.name} - Kontrol penuh operasional Nayea.id
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="islamic-container py-8">
        {/* Islamic Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-islamic p-6 rounded-islamic text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="arabic-text text-xl mb-2">رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً</p>
              <p className="opacity-90">Ya Allah, berikan kami kebaikan di dunia dan akhirat. Berkahi usaha Nayea.id</p>
            </div>
            <div className="text-4xl">🤲</div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-islamic shadow-islamic p-6 hover:shadow-islamic-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 text-sm font-medium ml-1">{stat.growth}</span>
                  <span className="text-gray-500 text-sm ml-2">{stat.detail}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Management Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-islamic shadow-islamic p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Pesanan Terbaru</h3>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { id: '#NYA-12345', customer: 'Siti Aisyah Rahman', product: 'Kerudung Premium Voal', amount: 89000, status: 'pending', time: '2 menit lalu' },
                { id: '#NYA-12344', customer: 'Fatimah Zahra', product: 'Mukena Katun Bordir', amount: 195000, status: 'processing', time: '15 menit lalu' },
                { id: '#NYA-12343', customer: 'Khadijah Muslimah', product: 'Sajadah Turkey Premium', amount: 275000, status: 'shipped', time: '1 jam lalu' },
                { id: '#NYA-12342', customer: 'Maryam Salsabila', product: 'Gamis Syari Modern', amount: 165000, status: 'delivered', time: '2 jam lalu' },
              ].map((order, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status === 'pending' ? 'Pending' :
                         order.status === 'processing' ? 'Diproses' :
                         order.status === 'shipped' ? 'Dikirim' : 'Selesai'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.customer} - {order.product}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-semibold text-islamic-green-600">{formatCurrency(order.amount)}</p>
                      <p className="text-xs text-gray-400">{order.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Staff Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-islamic shadow-islamic p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Aktivitas Staff</h3>
              <UserCheck className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { staff: 'Ahmad Fauzi', action: 'Memproses pesanan', detail: '#NYA-12345', time: '5 menit lalu', department: 'Customer Service' },
                { staff: 'Siti Nurhaliza', action: 'Menambah produk', detail: 'Khimar Pet Antem', time: '20 menit lalu', department: 'Product Management' },
                { staff: 'Muhammad Rizki', action: 'Update status pengiriman', detail: '#NYA-12340', time: '45 menit lalu', department: 'Logistics' },
                { staff: 'Fatma Wati', action: 'Merespons pertanyaan customer', detail: 'Live chat', time: '1 jam lalu', department: 'Customer Service' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-islamic-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-islamic-blue-600 font-semibold text-sm">
                      {activity.staff.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.staff}</p>
                    <p className="text-sm text-gray-600">{activity.action} - {activity.detail}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {activity.department}
                      </span>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions for Admin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-islamic shadow-islamic p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Aksi Cepat Admin</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: 'Tambah Produk', icon: Package, href: '/admin/products/create', color: 'bg-green-500 hover:bg-green-600' },
              { label: 'Kelola Staff', icon: UserCheck, href: '/admin/staff', color: 'bg-blue-500 hover:bg-blue-600' },
              { label: 'Lihat Pesanan', icon: ShoppingCart, href: '/admin/orders', color: 'bg-purple-500 hover:bg-purple-600' },
              { label: 'Analytics', icon: BarChart3, href: '/admin/analytics', color: 'bg-orange-500 hover:bg-orange-600' },
              { label: 'Kelola Customer', icon: Users, href: '/admin/customers', color: 'bg-pink-500 hover:bg-pink-600' },
              { label: 'Pengaturan', icon: Settings, href: '/admin/settings', color: 'bg-gray-500 hover:bg-gray-600' },
            ].map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  className={`${action.color} text-white p-4 rounded-islamic transition-all duration-300 flex flex-col items-center space-y-2`}
                >
                  <Icon className="w-8 h-8" />
                  <span className="text-sm font-medium text-center">{action.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Alert Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-yellow-50 border border-yellow-200 rounded-islamic p-6 mt-8"
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
            <h3 className="text-lg font-semibold text-yellow-800">Perhatian Admin</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded-lg">
              <p className="font-medium text-gray-900">Stok Menipis</p>
              <p className="text-gray-600">5 produk perlu restock</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-medium text-gray-900">Pending Orders</p>
              <p className="text-gray-600">{stats.pendingOrders} pesanan menunggu</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-medium text-gray-900">Staff Performance</p>
              <p className="text-gray-600">Review bulanan tersedia</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
