// app/user/dashboard/page.jsx - Updated for Direct Selling Customer
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
    ShoppingBag,
    Heart,
    Package,
    Clock,
    Star,
    MapPin,
    CreditCard,
    Gift,
    Truck,
    Eye,
    Download
} from 'lucide-react'

export default function UserDashboard() {
    const { data: session } = useSession()
    const [stats, setStats] = useState({
        totalOrders: 0,
        wishlistItems: 0,
        totalSpent: 0,
        loyaltyPoints: 0,
        savedMoney: 0
    })

    useEffect(() => {
        // Simulate fetching customer dashboard data
        setStats({
            totalOrders: 12,
            wishlistItems: 8,
            totalSpent: 2450000,
            loyaltyPoints: 2450,
            savedMoney: 340000
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
            title: 'Total Pesanan',
            value: stats.totalOrders.toString(),
            icon: ShoppingBag,
            color: 'from-green-500 to-green-600',
            detail: '3 pesanan aktif'
        },
        {
            title: 'Wishlist',
            value: stats.wishlistItems.toString(),
            icon: Heart,
            color: 'from-pink-500 to-pink-600',
            detail: 'produk favorit'
        },
        {
            title: 'Total Belanja',
            value: formatCurrency(stats.totalSpent),
            icon: CreditCard,
            color: 'from-blue-500 to-blue-600',
            detail: 'di Nayea.id'
        },
        {
            title: 'Poin Loyalty',
            value: stats.loyaltyPoints.toLocaleString(),
            icon: Gift,
            color: 'from-purple-500 to-purple-600',
            detail: 'poin tersedia'
        },
        {
            title: 'Hemat Berbelanja',
            value: formatCurrency(stats.savedMoney),
            icon: Star,
            color: 'from-islamic-gold-500 to-islamic-gold-600',
            detail: 'dari promo & diskon'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="islamic-container py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard Saya</h1>
                            <p className="text-gray-600 mt-1">
                                Selamat datang kembali di Nayea.id, {session?.user?.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="btn-islamic-primary">
                                Belanja Sekarang
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
                            <p className="arabic-text text-xl mb-2">بَارَكَ اللهُ لَكِ فِي مَالِكِ</p>
                            <p className="opacity-90">Semoga Allah memberkahi harta dan setiap pembelian Anda dengan kebaikan</p>
                        </div>
                        <div className="text-4xl">🛍️</div>
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
                                <div className="mt-4">
                                    <span className="text-gray-500 text-sm">{stat.detail}</span>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Recent Orders & Recommendations */}
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
                            <Package className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { id: '#NYA-12345', product: 'Kerudung Premium Voal Syari', amount: 89000, status: 'shipped', date: '2 hari lalu', tracking: 'JP1234567890' },
                                { id: '#NYA-12344', product: 'Mukena Katun Premium Bordir', amount: 195000, status: 'processing', date: '5 hari lalu', tracking: '-' },
                                { id: '#NYA-12343', product: 'Sajadah Import Turkey Premium', amount: 275000, status: 'delivered', date: '1 minggu lalu', tracking: 'JP0987654321' },
                            ].map((order, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-islamic-green-300 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium text-gray-900">{order.id}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                            }`}>
                                            {order.status === 'processing' ? 'Diproses' :
                                                order.status === 'shipped' ? 'Dikirim' : 'Selesai'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{order.product}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-islamic-green-600">{formatCurrency(order.amount)}</p>
                                        <div className="flex items-center gap-2">
                                            {order.tracking !== '-' && (
                                                <button className="text-xs bg-islamic-blue-100 text-islamic-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                                                    <Truck className="w-3 h-3" />
                                                    Lacak
                                                </button>
                                            )}
                                            <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                                                <Eye className="w-3 h-3" />
                                                Detail
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">{order.date}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-islamic shadow-islamic p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Aksi Cepat</h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {[
                                { label: 'Lihat Pesanan', icon: Package, color: 'bg-blue-500 hover:bg-blue-600' },
                                { label: 'Wishlist', icon: Heart, color: 'bg-pink-500 hover:bg-pink-600' },
                                { label: 'Alamat Saya', icon: MapPin, color: 'bg-green-500 hover:bg-green-600' },
                                { label: 'Riwayat Belanja', icon: Clock, color: 'bg-purple-500 hover:bg-purple-600' },
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

                        {/* Loyalty Program */}
                        <div className="bg-gradient-to-r from-islamic-gold-400 to-islamic-gold-500 p-4 rounded-lg text-white">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">Program Loyalty Nayea.id</h4>
                                <Gift className="w-5 h-5" />
                            </div>
                            <p className="text-sm opacity-90 mb-3">
                                Anda memiliki {stats.loyaltyPoints.toLocaleString()} poin
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">550 poin lagi untuk voucher Rp 50.000</span>
                                <button className="bg-white/20 text-xs px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                                    Tukar Poin
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Recommendations from Nayea.id */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-islamic shadow-islamic p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Rekomendasi Produk Nayea.id Untuk Anda</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Gamis Syari Modern Casual', price: 165000, originalPrice: 200000, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop', rating: 4.6, discount: 18 },
                            { name: 'Khimar Pet Antem Premium', price: 125000, originalPrice: 160000, image: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=200&h=200&fit=crop', rating: 4.8, discount: 22 },
                            { name: 'Jilbab Instan Ceruti Premium', price: 75000, originalPrice: 95000, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop', rating: 4.5, discount: 21 },
                            { name: 'Baju Koko Premium Katun', price: 145000, originalPrice: 180000, image: 'https://images.unsplash.com/photo-1594736797933-d0ac6020be4e?w=200&h=200&fit=crop', rating: 4.7, discount: 19 },
                        ].map((product, index) => (
                            <div key={index} className="border border-gray-200 rounded-islamic p-4 hover:shadow-md transition-shadow group">
                                <div className="relative mb-3">
                                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg" />
                                    {product.discount && (
                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            -{product.discount}%
                                        </span>
                                    )}
                                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                                        <span className="halal-badge text-xs">🌟</span>
                                        <span className="syari-badge text-xs">📿</span>
                                    </div>
                                </div>
                                <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">{product.name}</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-bold text-islamic-green-600">{formatCurrency(product.price)}</span>
                                            {product.originalPrice && (
                                                <span className="text-xs text-gray-500 line-through ml-2">{formatCurrency(product.originalPrice)}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                                        </div>
                                        <button className="bg-islamic-green-500 text-white text-xs px-3 py-1 rounded-full hover:bg-islamic-green-600 transition-colors">
                                            + Keranjang
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}