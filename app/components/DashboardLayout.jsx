// app/components/DashboardLayout.jsx - Dashboard Layout Component
'use client'

import { useState } from 'react'
import { useAuth } from '../auth-guard'
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingBag,
    BarChart3,
    Settings,
    Heart,
    MapPin,
    FileText,
    HeadphonesIcon,
    Menu,
    X,
    Home,
    Bell,
    Search
} from 'lucide-react'
import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, role } = useAuth()

    // Sidebar menu berdasarkan role
    const getSidebarMenu = () => {
        const commonItems = [
            { icon: Home, label: 'Back to Home', path: '/', divider: true },
        ]

        if (role === 'admin') {
            return [
                ...commonItems,
                { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
                { icon: Users, label: 'Kelola User', path: '/users' },
                { icon: Package, label: 'Kelola Produk', path: '/products' },
                { icon: ShoppingBag, label: 'Kelola Order', path: '/orders' },
                { icon: BarChart3, label: 'Laporan', path: '/reports' },
                { icon: Settings, label: 'Pengaturan', path: '/settings', divider: true },
                { icon: Heart, label: 'Wishlist', path: '/wishlist' },
                { icon: MapPin, label: 'Alamat', path: '/addresses' },
            ]
        } else if (role === 'staff') {
            return [
                ...commonItems,
                { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
                { icon: ShoppingBag, label: 'Handle Order', path: '/orders' },
                { icon: Users, label: 'Data Customer', path: '/customers' },
                { icon: HeadphonesIcon, label: 'Customer Support', path: '/support' },
                { icon: FileText, label: 'Laporan Staff', path: '/staff-reports', divider: true },
                { icon: Heart, label: 'Wishlist', path: '/wishlist' },
                { icon: MapPin, label: 'Alamat', path: '/addresses' },
            ]
        } else {
            return [
                ...commonItems,
                { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
                { icon: ShoppingBag, label: 'Pesanan Saya', path: '/orders' },
                { icon: Heart, label: 'Wishlist', path: '/wishlist' },
                { icon: MapPin, label: 'Alamat Saya', path: '/addresses' },
                { icon: Settings, label: 'Pengaturan', path: '/settings' },
            ]
        }
    }

    const menuItems = getSidebarMenu()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar />

            <div className="flex">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    <div className="flex flex-col h-full pt-16 lg:pt-0">
                        {/* Sidebar Header */}
                        <div className="flex items-center justify-between p-4 border-b lg:hidden">
                            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 rounded-md text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="p-4 border-b bg-gradient-to-r from-emerald-50 to-teal-50">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">
                                        {user?.name?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user?.email || 'user@example.com'}
                                    </p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                            role === 'staff' ? 'bg-blue-100 text-blue-700' :
                                                'bg-green-100 text-green-700'
                                        }`}>
                                        {role?.charAt(0).toUpperCase() + role?.slice(1) || 'User'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                            {menuItems.map((item, index) => (
                                <div key={index}>
                                    <a
                                        href={item.path}
                                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-emerald-600" />
                                        {item.label}
                                    </a>
                                    {item.divider && <hr className="my-3 border-gray-200" />}
                                </div>
                            ))}
                        </nav>

                        {/* Islamic Quote */}
                        <div className="p-4 border-t bg-gradient-to-r from-emerald-50 to-teal-50">
                            <div className="text-center">
                                <p className="text-emerald-600 font-arabic text-sm">
                                    اللَّهُمَّ بَارِكْ لَنَا
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Allahumma barik lana - O Allah, bless us
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-0">
                    {/* Mobile sidebar toggle */}
                    <div className="lg:hidden">
                        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 rounded-md text-gray-400 hover:text-gray-600"
                            >
                                <Menu className="h-6 w-6" />
                            </button>

                            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>

                            <div className="flex items-center space-x-2">
                                <button className="p-2 rounded-md text-gray-400 hover:text-gray-600">
                                    <Search className="h-5 w-5" />
                                </button>
                                <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        3
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Page Content */}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    )
}

export default DashboardLayout