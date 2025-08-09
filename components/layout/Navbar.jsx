'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
    Search,
    ShoppingCart,
    Heart,
    User,
    Menu,
    X,
    Bell,
    MapPin,
    ChevronDown,
    Settings,
    LogOut,
    Package,
    Users,
    BarChart3,
    HeadphonesIcon,
    Shield,
    Star
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function Navbar() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [cartCount, setCartCount] = useState(0)
    const [wishlistCount, setWishlistCount] = useState(0)

    // Categories for Nayea.id Direct Selling
    const categories = [
        { name: 'Kerudung', icon: '🧕', href: '/categories/kerudung' },
        { name: 'Mukena', icon: '🤲', href: '/categories/mukena' },
        { name: 'Sajadah', icon: '🕌', href: '/categories/sajadah' },
        { name: 'Gamis', icon: '👗', href: '/categories/gamis' },
        { name: 'Khimar', icon: '🥻', href: '/categories/khimar' },
        { name: 'Baju Koko', icon: '👔', href: '/categories/koko' },
        { name: 'Aksesoris', icon: '💎', href: '/categories/aksesoris' },
    ]

    // Role-based navigation for Direct Selling Company
    const getRoleBasedNav = () => {
        if (!session) return []

        switch (session.user.role) {
            case 'admin':
                return [
                    { name: 'Dashboard Admin', href: '/admin/dashboard', icon: BarChart3 },
                    { name: 'Kelola Staff', href: '/admin/staff', icon: Users },
                    { name: 'Kelola Produk', href: '/admin/products', icon: Package },
                    { name: 'Kelola Pesanan', href: '/admin/orders', icon: ShoppingCart },
                    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
                    { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
                ]
            case 'staff':
                return [
                    { name: 'Dashboard Staff', href: '/staff/dashboard', icon: BarChart3 },
                    { name: 'Kelola Pesanan', href: '/staff/orders', icon: Package },
                    { name: 'Customer Service', href: '/staff/support', icon: HeadphonesIcon },
                    { name: 'Data Customer', href: '/staff/customers', icon: Users },
                    { name: 'Laporan', href: '/staff/reports', icon: BarChart3 },
                    { name: 'Profil Staff', href: '/staff/profile', icon: User },
                ]
            case 'user':
            default:
                return [
                    { name: 'Dashboard Saya', href: '/user/dashboard', icon: User },
                    { name: 'Pesanan Saya', href: '/user/orders', icon: Package },
                    { name: 'Wishlist', href: '/wishlist', icon: Heart },
                    { name: 'Alamat', href: '/user/addresses', icon: MapPin },
                    { name: 'Profil Saya', href: '/user/profile', icon: Settings },
                ]
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }

    useEffect(() => {
        // Load cart and wishlist counts from localStorage or API
        const savedCartCount = localStorage.getItem('nayea-cart-count') || 0
        const savedWishlistCount = localStorage.getItem('nayea-wishlist-count') || 0
        setCartCount(parseInt(savedCartCount))
        setWishlistCount(parseInt(savedWishlistCount))
    }, [])

    // Get role display name and badge color
    const getRoleInfo = (role) => {
        switch (role) {
            case 'admin':
                return { label: 'Admin', color: 'bg-red-100 text-red-700 border-red-200' }
            case 'staff':
                return { label: 'Staff', color: 'bg-blue-100 text-blue-700 border-blue-200' }
            case 'user':
            default:
                return { label: 'Customer', color: 'bg-green-100 text-green-700 border-green-200' }
        }
    }

    const roleInfo = session ? getRoleInfo(session.user.role) : null

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-gradient-islamic text-white py-2">
                <div className="islamic-container flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                        <span className="hidden md:block">📱 Download Aplikasi Nayea.id</span>
                        <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            Pengiriman ke seluruh Indonesia
                        </span>
                        <span className="hidden md:flex items-center">
                            <Shield className="w-4 h-4 mr-1" />
                            100% Halal & Syar'i
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/help" className="hover:text-islamic-gold-200 transition-colors">
                            Bantuan
                        </Link>
                        <Link href="/about" className="hover:text-islamic-gold-200 transition-colors">
                            Tentang Nayea.id
                        </Link>
                        {!session && (
                            <>
                                <Link href="/auth/register" className="hover:text-islamic-gold-200 transition-colors">
                                    Daftar
                                </Link>
                                <Link href="/auth/login" className="hover:text-islamic-gold-200 transition-colors">
                                    Masuk
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="islamic-container py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-islamic rounded-islamic flex items-center justify-center text-white text-xl font-bold">
                            🕌
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gradient-islamic">Nayea.id</h1>
                            <p className="text-xs text-gray-500">Islamic Fashion Store</p>
                        </div>
                    </Link>

                    {/* Search Bar - Tokopedia Style */}
                    <div className="flex-1 max-w-2xl mx-8 hidden md:block">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari kerudung, mukena, sajadah, gamis..."
                                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-islamic focus:border-islamic-green-400 focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-islamic-green-500 text-white p-2 rounded-lg hover:bg-islamic-green-600 transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Cart */}
                        <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Wishlist */}
                        <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Heart className="w-6 h-6 text-gray-700" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Notifications (for authenticated users) */}
                        {session && (
                            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Bell className="w-6 h-6 text-gray-700" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-2 h-2"></span>
                            </button>
                        )}

                        {/* User Profile Dropdown */}
                        {session ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden">
                                        {session.user.image ? (
                                            <LazyLoadImage
                                                src={session.user.image}
                                                alt={session.user.name}
                                                width={32}
                                                height={32}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-islamic-green-500 flex items-center justify-center text-white font-semibold">
                                                {session.user.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                                        <div className={`text-xs px-2 py-1 rounded-full inline-block border ${roleInfo?.color}`}>
                                            {roleInfo?.label}
                                            {session.user.role === 'staff' && session.user.department && (
                                                <span className="ml-1">({session.user.department})</span>
                                            )}
                                        </div>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>

                                {/* Profile Dropdown */}
                                <AnimatePresence>
                                    {isProfileDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-64 bg-white rounded-islamic shadow-islamic-lg border border-gray-100 py-2"
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="font-semibold text-gray-900">{session.user.name}</p>
                                                <p className="text-sm text-gray-500">{session.user.email}</p>
                                                <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 border ${roleInfo?.color}`}>
                                                    {roleInfo?.label}
                                                    {session.user.employeeId && (
                                                        <span className="ml-1">ID: {session.user.employeeId}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Role-based navigation */}
                                            <div className="py-2">
                                                {getRoleBasedNav().map((item) => {
                                                    const Icon = item.icon
                                                    return (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                            onClick={() => setIsProfileDropdownOpen(false)}
                                                        >
                                                            <Icon className="w-4 h-4 mr-3" />
                                                            {item.name}
                                                        </Link>
                                                    )
                                                })}
                                            </div>

                                            <div className="border-t border-gray-100 py-2">
                                                <button
                                                    onClick={handleSignOut}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4 mr-3" />
                                                    Keluar
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-2 text-islamic-green-600 hover:bg-islamic-green-50 rounded-lg transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="btn-islamic-primary"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Categories Navigation */}
                <div className="hidden md:flex items-center space-x-8 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-islamic-green-600 font-semibold">
                        <Menu className="w-5 h-5" />
                        <span>Kategori Produk</span>
                    </div>
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center space-x-2 text-gray-700 hover:text-islamic-green-600 transition-colors"
                        >
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                        </Link>
                    ))}
                    <Link
                        href="/products"
                        className="flex items-center space-x-2 text-gray-700 hover:text-islamic-green-600 transition-colors ml-auto"
                    >
                        <Star className="w-4 h-4" />
                        <span className="font-medium">Lihat Semua Produk</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-200"
                    >
                        <div className="islamic-container py-4 space-y-4">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari produk Islamic fashion..."
                                    className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-islamic focus:border-islamic-green-400 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-islamic-green-500 text-white p-2 rounded-lg"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </form>

                            {/* Mobile Categories */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">Kategori Produk</h3>
                                {categories.map((category) => (
                                    <Link
                                        key={category.name}
                                        href={category.href}
                                        className="flex items-center space-x-3 py-2 text-gray-700"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="text-lg">{category.icon}</span>
                                        <span>{category.name}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile User Menu */}
                            {session && (
                                <div className="space-y-2 pt-4 border-t border-gray-200">
                                    <h3 className="font-semibold text-gray-900">
                                        Menu {roleInfo?.label}
                                        {session.user.employeeId && (
                                            <span className="text-sm text-gray-500 ml-2">ID: {session.user.employeeId}</span>
                                        )}
                                    </h3>
                                    {getRoleBasedNav().map((item) => {
                                        const Icon = item.icon
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center space-x-3 py-2 text-gray-700"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span>{item.name}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}