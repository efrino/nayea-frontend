// app/components/FeaturedProducts.jsx - Featured Products Component
'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Filter, Grid, List } from 'lucide-react'
import ProductCard from './ProductCard'

// API Service untuk fetch products - Sesuai Database Schema
const apiService = {
    async getFeaturedProducts() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/products?is_featured=true&status=active&limit=6`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            })

            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }

            const data = await response.json()
            return data.data || data
        } catch (error) {
            console.error('Error fetching featured products:', error)
            // Return fallback data
            return getFallbackProducts()
        }
    }
}

// Fallback data yang sesuai dengan database schema
const getFallbackProducts = () => [
    {
        id: 1,
        name: 'Hijab Segi Empat Premium Katun',
        description: 'Hijab segi empat dari bahan katun premium yang lembut dan nyaman digunakan sehari-hari',
        price: 45000,
        discount_price: 39000,
        sku: 'HJB-001',
        stock_quantity: 50,
        material: 'Katun Premium',
        color: 'Hitam',
        size: '110x110 cm',
        pattern: 'Polos',
        origin_country: 'Indonesia',
        image_url: 'https://images.unsplash.com/photo-1583846962245-7bcd48d3e3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        gallery_images: [
            'https://images.unsplash.com/photo-1583846962245-7bcd48d3e3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ],
        is_featured: true,
        status: 'active',
        weight: 100
    },
    {
        id: 2,
        name: 'Kerudung Instant Ceruti Bordir',
        description: 'Kerudung instant dengan motif bordir elegant, mudah digunakan tanpa jarum pentul',
        price: 75000,
        discount_price: null,
        sku: 'KRD-001',
        stock_quantity: 30,
        material: 'Ceruti',
        color: 'Navy',
        size: 'All Size',
        pattern: 'Bordir Bunga',
        origin_country: 'Indonesia',
        image_url: 'https://images.unsplash.com/photo-1596061404091-2a44be048b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        gallery_images: [
            'https://images.unsplash.com/photo-1596061404091-2a44be048b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ],
        is_featured: true,
        status: 'active',
        weight: 150
    },
    {
        id: 3,
        name: 'Mukena Katun Jepang Dewasa',
        description: 'Mukena dari bahan katun jepang yang adem dan menyerap keringat',
        price: 120000,
        discount_price: 99000,
        sku: 'MKN-001',
        stock_quantity: 25,
        material: 'Katun Jepang',
        color: 'Putih',
        size: 'All Size',
        pattern: 'Polos',
        origin_country: 'Indonesia',
        image_url: 'https://images.unsplash.com/photo-1594736797933-d0200ba8b086?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        gallery_images: [
            'https://images.unsplash.com/photo-1594736797933-d0200ba8b086?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ],
        is_featured: true,
        status: 'active',
        weight: 300
    },
    {
        id: 4,
        name: 'Sajadah Turki Import Premium',
        description: 'Sajadah import dari Turki dengan kualitas terbaik dan motif yang indah',
        price: 150000,
        discount_price: 135000,
        sku: 'SJD-001',
        stock_quantity: 20,
        material: 'Velvet Turki',
        color: 'Maroon',
        size: '70x110 cm',
        pattern: 'Motif Islami',
        origin_country: 'Turki',
        image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        gallery_images: [
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ],
        is_featured: true,
        status: 'active',
        weight: 500
    },
    {
        id: 5,
        name: 'Gamis Syari Set Khimar',
        description: 'Gamis syari lengkap dengan khimar, bahan adem dan nyaman',
        price: 185000,
        discount_price: 165000,
        sku: 'GMS-001',
        stock_quantity: 20,
        material: 'Moscrepe',
        color: 'Navy',
        size: 'M',
        pattern: 'Polos',
        origin_country: 'Indonesia',
        image_url: 'https://images.unsplash.com/photo-1592464491647-b5c8ba6c2eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        gallery_images: [
            'https://images.unsplash.com/photo-1592464491647-b5c8ba6c2eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ],
        is_featured: true,
        status: 'active',
        weight: 400
    },
    {
        id: 6,
        name: 'Khimar Syari Pad Antem',
        description: 'Khimar syari dengan pad antem, memberikan kesan rapi dan elegant',
        price: 125000,
        discount_price: null,
        sku: 'KHM-001',
        stock_quantity: 25,
        material: 'Ceruti Premium',
        color: 'Coklat',
        size: 'All Size',
        pattern: 'Polos',
        origin_country: 'Indonesia',
        image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        gallery_images: [
            'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ],
        is_featured: true,
        status: 'active',
        weight: 200
    }
]

const FeaturedProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('featured') // 'featured', 'price-low', 'price-high', 'newest'

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const data = await apiService.getFeaturedProducts()
                setProducts(data.slice(0, 6)) // Limit to 6 products for homepage
            } catch (err) {
                setError('Failed to load products')
                console.error('Error:', err)

                // Use fallback data
                setProducts(getFallbackProducts())
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Sort products based on selected option
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return (a.discount_price || a.price) - (b.discount_price || b.price)
            case 'price-high':
                return (b.discount_price || b.price) - (a.discount_price || a.price)
            case 'newest':
                return new Date(b.created_at) - new Date(a.created_at)
            case 'featured':
            default:
                return b.is_featured - a.is_featured
        }
    })

    if (loading) {
        return (
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Featured Products
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Produk Unggulan
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Temukan koleksi terbaik fashion muslimah berkualitas premium yang telah dipilih khusus untuk Anda
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                    {/* Sort and Filter */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                                <option value="featured">Unggulan</option>
                                <option value="newest">Terbaru</option>
                                <option value="price-low">Harga Terendah</option>
                                <option value="price-high">Harga Tertinggi</option>
                            </select>
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                    ? 'bg-white text-emerald-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                        <p className="text-red-700 text-center">{error}</p>
                    </div>
                )}

                {/* Products Grid */}
                <div className={`grid gap-8 ${viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                    }`}>
                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            viewMode={viewMode}
                        />
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-12">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Jelajahi Koleksi Lengkap Kami
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Lebih dari 500+ produk Islamic fashion berkualitas menunggu Anda.
                            Temukan style yang sempurna untuk setiap momen istimewa.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.href = '/shop'}
                                className="btn-islamic inline-flex items-center"
                            >
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Lihat Semua Produk
                            </button>

                            <button
                                onClick={() => window.location.href = '/categories'}
                                className="btn-islamic-outline inline-flex items-center"
                            >
                                <Filter className="h-5 w-5 mr-2" />
                                Jelajahi Kategori
                            </button>
                        </div>
                    </div>

                    {/* Product Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600 mb-1">500+</div>
                            <div className="text-sm text-gray-600">Produk Tersedia</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600 mb-1">2000+</div>
                            <div className="text-sm text-gray-600">Customer Puas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600 mb-1">4.9★</div>
                            <div className="text-sm text-gray-600">Rating Produk</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600 mb-1">24/7</div>
                            <div className="text-sm text-gray-600">Customer Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts