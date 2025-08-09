// app/components/Navbar.jsx - Navigation Component
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
    Heart,
    ShoppingCart,
    Menu,
    X,
    Gift,
    Search,
    Bell
} from 'lucide-react'
import ProfileDropdown from './ProfileDropdown'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const { data: session, status } = useSession()
    const router = useRouter()

    const navItems = [
        { name: 'Home', href: '/', active: true },
        { name: 'Shop', href: '/shop' },
        { name: 'Categories', href: '/categories' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ]

    const handleSearch = (e) => {
        e.preventDefault()
        const searchQuery = e.target.search.value
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`)
            setIsSearchOpen(false)
        }
    }

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        <div className="bg-emerald-600 p-2 rounded-lg">
                            <Gift className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-emerald-600">Nayea.id</h1>
                            <p className="text-xs text-gray-500">Islamic Fashion</p>
                        </div>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:flex flex-1 max-w-md mx-8">
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Cari produk Islamic fashion..."
                                />
                            </div>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`nav-link ${item.active
                                        ? 'text-emerald-600 font-semibold'
                                        : 'text-gray-700 hover:text-emerald-600'
                                    } px-3 py-2 text-sm font-medium transition-colors`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-3">
                        {/* Search Icon - Mobile */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        {status === 'authenticated' ? (
                            <>
                                {/* Notifications */}
                                <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors relative">
                                    <Bell className="h-5 w-5" />
                                    {/* Notification badge */}
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        3
                                    </span>
                                </button>

                                {/* Wishlist */}
                                <button
                                    onClick={() => router.push('/wishlist')}
                                    className="p-2 text-gray-600 hover:text-emerald-600 transition-colors relative"
                                >
                                    <Heart className="h-5 w-5" />
                                    {/* Wishlist count */}
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                                        2
                                    </span>
                                </button>

                                {/* Shopping Cart */}
                                <button
                                    onClick={() => router.push('/cart')}
                                    className="p-2 text-gray-600 hover:text-emerald-600 transition-colors relative"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    {/* Cart count */}
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                                        5
                                    </span>
                                </button>

                                {/* Profile Dropdown */}
                                <ProfileDropdown />
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => router.push('/register')}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Register
                                </button>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div className="lg:hidden border-t py-3">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Cari produk Islamic fashion..."
                                    autoFocus
                                />
                            </div>
                        </form>
                    </div>
                )}

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t py-4">
                        <div className="space-y-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`block px-3 py-2 transition-colors ${item.active
                                            ? 'text-emerald-600 font-semibold bg-emerald-50'
                                            : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                                        } rounded-md`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}

                            {/* Mobile Auth Buttons */}
                            {status !== 'authenticated' && (
                                <div className="pt-4 space-y-2">
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false)
                                            router.push('/login')
                                        }}
                                        className="w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false)
                                            router.push('/register')
                                        }}
                                        className="w-full text-left px-3 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md transition-colors"
                                    >
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Islamic Blessing (hidden but present for blessing) */}
            <div className="sr-only" aria-hidden="true">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم - In the name of Allah, the Most Gracious, the Most Merciful
            </div>
        </nav>
    )
}

export default Navbar