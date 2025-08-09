// app/components/ProfileDropdown.jsx - Profile Dropdown Component
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useAuth } from '../auth-guard'
import {
    User,
    ChevronDown,
    Settings,
    ShoppingBag,
    Heart,
    MapPin,
    FileText,
    BarChart3,
    Users,
    Package,
    HeadphonesIcon,
    Shield,
    LogOut,
    Crown,
    UserCog,
    Plus
} from 'lucide-react'
import toast from 'react-hot-toast'

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const { user, role, isAuthenticated } = useAuth()
    const router = useRouter()

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Don't render if not authenticated
    if (!isAuthenticated) return null

    const handleLogout = async () => {
        try {
            await signOut({
                callbackUrl: '/',
                redirect: true
            })
            toast.success('Berhasil logout. Barakallahu fiik!')
        } catch (error) {
            console.error('Logout error:', error)
            toast.error('Gagal logout. Silakan coba lagi.')
        }
    }

    const handleMenuClick = (path) => {
        setIsOpen(false)
        router.push(path)
    }

    // Role-based menu items
    const getMenuItems = () => {
        const commonItems = [
            {
                group: 'Account',
                items: [
                    { icon: User, label: 'Profile Saya', path: '/profile', description: 'Kelola informasi akun' },
                    { icon: Settings, label: 'Pengaturan', path: '/settings', description: 'Atur preferensi akun' },
                ]
            }
        ]

        if (role === 'admin') {
            return [
                {
                    group: 'Admin Dashboard',
                    items: [
                        { icon: BarChart3, label: 'Dashboard Admin', path: '/dashboard', description: 'Panel kontrol utama' },
                        { icon: Users, label: 'Kelola User', path: '/users', description: 'Manajemen pengguna' },
                        { icon: Package, label: 'Kelola Produk', path: '/products', description: 'Manajemen produk' },
                        { icon: ShoppingBag, label: 'Kelola Order', path: '/orders', description: 'Manajemen pesanan' },
                        { icon: BarChart3, label: 'Laporan', path: '/reports', description: 'Laporan & analitik' },
                    ]
                },
                ...commonItems,
                {
                    group: 'Shopping',
                    items: [
                        { icon: ShoppingBag, label: 'Pesanan Saya', path: '/orders', description: 'Riwayat belanja' },
                        { icon: Heart, label: 'Wishlist', path: '/wishlist', description: 'Produk favorit' },
                        { icon: MapPin, label: 'Alamat', path: '/addresses', description: 'Kelola alamat pengiriman' },
                    ]
                }
            ]
        } else if (role === 'staff') {
            return [
                {
                    group: 'Staff Dashboard',
                    items: [
                        { icon: UserCog, label: 'Dashboard Staff', path: '/dashboard', description: 'Panel kerja staff' },
                        { icon: ShoppingBag, label: 'Handle Order', path: '/orders', description: 'Proses pesanan' },
                        { icon: Users, label: 'Data Customer', path: '/customers', description: 'Informasi pelanggan' },
                        { icon: HeadphonesIcon, label: 'Customer Support', path: '/support', description: 'Bantuan pelanggan' },
                        { icon: FileText, label: 'Laporan Staff', path: '/staff-reports', description: 'Laporan kerja' },
                    ]
                },
                ...commonItems,
                {
                    group: 'Shopping',
                    items: [
                        { icon: ShoppingBag, label: 'Pesanan Saya', path: '/orders', description: 'Riwayat belanja' },
                        { icon: Heart, label: 'Wishlist', path: '/wishlist', description: 'Produk favorit' },
                        { icon: MapPin, label: 'Alamat', path: '/addresses', description: 'Kelola alamat pengiriman' },
                    ]
                }
            ]
        } else {
            return [
                {
                    group: 'Dashboard',
                    items: [
                        { icon: User, label: 'Dashboard Saya', path: '/dashboard', description: 'Panel pengguna' },
                    ]
                },
                {
                    group: 'Shopping',
                    items: [
                        { icon: ShoppingBag, label: 'Pesanan Saya', path: '/orders', description: 'Riwayat & status pesanan' },
                        { icon: Heart, label: 'Wishlist', path: '/wishlist', description: 'Produk favorit saya' },
                        { icon: MapPin, label: 'Alamat Saya', path: '/addresses', description: 'Kelola alamat pengiriman' },
                        { icon: Plus, label: 'Buat Pesanan', path: '/shop', description: 'Belanja produk Islamic' },
                    ]
                },
                ...commonItems
            ]
        }
    }

    const menuItems = getMenuItems()

    // Role badge configuration
    const getRoleBadge = () => {
        switch (role) {
            case 'admin':
                return { icon: Crown, label: 'Admin', color: 'bg-purple-100 text-purple-700' }
            case 'staff':
                return { icon: Shield, label: 'Staff', color: 'bg-blue-100 text-blue-700' }
            default:
                return { icon: User, label: 'User', color: 'bg-green-100 text-green-700' }
        }
    }

    const roleBadge = getRoleBadge()
    const RoleIcon = roleBadge.icon

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
            >
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-24">
                        {user?.name || 'User'}
                    </p>
                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${roleBadge.color}`}>
                        <RoleIcon className="h-3 w-3 mr-1" />
                        {roleBadge.label}
                    </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {user?.name || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email || 'user@example.com'}
                                </p>
                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${roleBadge.color}`}>
                                    <RoleIcon className="h-3 w-3 mr-1" />
                                    {roleBadge.label}
                                </div>
                            </div>
                        </div>

                        {/* Islamic Greeting */}
                        <div className="mt-3 text-center">
                            <p className="text-emerald-600 font-arabic text-sm">
                                السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Assalamu'alaikum wa rahmatullahi wa barakatuh
                            </p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        {menuItems.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                {/* Group Header */}
                                <div className="px-4 py-2">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        {group.group}
                                    </h3>
                                </div>

                                {/* Group Items */}
                                {group.items.map((item, itemIndex) => (
                                    <button
                                        key={itemIndex}
                                        onClick={() => handleMenuClick(item.path)}
                                        className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="flex-shrink-0">
                                            <item.icon className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                                        </div>
                                        <div className="ml-3 flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                                                {item.label}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {item.description}
                                            </p>
                                        </div>
                                    </button>
                                ))}

                                {/* Divider between groups */}
                                {groupIndex < menuItems.length - 1 && (
                                    <div className="border-b border-gray-100 my-2"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Logout Section */}
                    <div className="border-t border-gray-100 py-2">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 text-left hover:bg-red-50 transition-colors group"
                        >
                            <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                    Logout
                                </p>
                                <p className="text-xs text-gray-500">
                                    Keluar dari akun Anda
                                </p>
                            </div>
                        </button>
                    </div>

                    {/* Islamic Footer */}
                    <div className="border-t border-gray-100 px-4 py-3">
                        <div className="text-center">
                            <p className="text-emerald-600 font-arabic text-xs">
                                بارك الله فيك
                            </p>
                            <p className="text-xs text-gray-500">
                                Barakallahu fiik - May Allah bless you
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown