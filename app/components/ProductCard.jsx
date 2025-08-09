// app/components/ProductCard.jsx - Product Card Component
'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
    Heart,
    Star,
    ShoppingCart,
    Eye,
    Package,
    MapPin
} from 'lucide-react'
import toast from 'react-hot-toast'

// Auth checker utility
const checkAuthentication = () => {
    const cookies = document.cookie.split(';')
    const sessionToken = cookies.find(cookie =>
        cookie.trim().startsWith('next-auth.session-token=') ||
        cookie.trim().startsWith('__Secure-next-auth.session-token=')
    )
    return !!sessionToken
}

const ProductCard = ({ product, viewMode = 'grid' }) => {
    const router = useRouter()
    const { status } = useSession()

    const handleOrderClick = () => {
        // Check stock availability
        if (product.stock_quantity === 0) {
            toast.error('Maaf, produk ini sedang habis')
            return
        }

        // Check authentication sebelum allow order
        if (status === 'authenticated' || checkAuthentication()) {
            // User sudah login, proceed to cart/order
            router.push(`/products/${product.id}?action=order`)
        } else {
            // User belum login, redirect ke login dengan callback
            toast.error('Silakan login terlebih dahulu untuk melakukan pemesanan')
            router.push(`/login?callbackUrl=${encodeURIComponent(`/products/${product.id}?action=order`)}`)
        }
    }

    const handleViewProduct = () => {
        router.push(`/products/${product.id}`)
    }

    const handleWishlistClick = () => {
        if (status === 'authenticated' || checkAuthentication()) {
            // Add to wishlist logic here
            toast.success('Produk ditambahkan ke wishlist')
        } else {
            toast.error('Silakan login terlebih dahulu')
            router.push('/login')
        }
    }

    // Format price display
    const originalPrice = product.price || 0
    const discountPrice = product.discount_price
    const finalPrice = discountPrice || originalPrice
    const hasDiscount = discountPrice && discountPrice < originalPrice
    const discountPercentage = hasDiscount ? Math.round((1 - finalPrice / originalPrice) * 100) : 0

    // Product image dengan fallback
    const productImage = product.image_url ||
        (product.gallery_images && product.gallery_images[0]) ||
        'https://via.placeholder.com/400x300?text=Islamic+Fashion'

    // Stock status configuration
    const getStockStatus = () => {
        if (product.stock_quantity === 0) {
            return { text: 'Habis', color: 'text-red-600', bgColor: 'bg-red-50' }
        } else if (product.stock_quantity <= 5) {
            return { text: 'Stock Terbatas', color: 'text-orange-600', bgColor: 'bg-orange-50' }
        } else {
            return { text: 'Tersedia', color: 'text-green-600', bgColor: 'bg-green-50' }
        }
    }

    const stockStatus = getStockStatus()

    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="relative md:w-80 flex-shrink-0">
                        <div className="relative overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-t-none h-64 md:h-full">
                            <img
                                src={productImage}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />

                            {/* Badges */}
                            <div className="absolute top-4 left-4 space-y-2">
                                {product.is_featured && (
                                    <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        Featured
                                    </div>
                                )}
                                {hasDiscount && (
                                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        {discountPercentage}% OFF
                                    </div>
                                )}
                            </div>

                            {/* Wishlist Button */}
                            {(status === 'authenticated' || checkAuthentication()) && (
                                <button
                                    onClick={handleWishlistClick}
                                    className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                                >
                                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                        <div className="flex flex-col h-full">
                            {/* Product Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-xl text-gray-900 mb-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center space-x-1 ml-4">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-600">4.8</span>
                                    </div>
                                </div>

                                {/* Islamic Product Details */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {product.material && (
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Package className="h-4 w-4 mr-2" />
                                            <span>{product.material}</span>
                                        </div>
                                    )}
                                    {product.origin_country && (
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            <span>{product.origin_country}</span>
                                        </div>
                                    )}
                                    {product.color && (
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium">Warna:</span> {product.color}
                                        </div>
                                    )}
                                    {product.size && (
                                        <div className="text-sm text-gray-500">
                                            <span className="font-medium">Ukuran:</span> {product.size}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Section */}
                            <div className="space-y-4">
                                {/* Price & Stock */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold text-emerald-600">
                                            Rp {finalPrice.toLocaleString('id-ID')}
                                        </div>
                                        {hasDiscount && (
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-sm text-gray-500 line-through">
                                                    Rp {originalPrice.toLocaleString('id-ID')}
                                                </span>
                                                <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded">
                                                    Hemat Rp {(originalPrice - finalPrice).toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.bgColor} ${stockStatus.color}`}>
                                        {stockStatus.text}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleViewProduct}
                                        className="flex-1 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        Lihat Detail
                                    </button>
                                    <button
                                        onClick={handleOrderClick}
                                        disabled={product.stock_quantity === 0}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${product.stock_quantity === 0
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                            }`}
                                    >
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        {product.stock_quantity === 0 ? 'Habis' : 'Pesan Sekarang'}
                                    </button>
                                </div>

                                {/* SKU */}
                                {product.sku && (
                                    <div className="pt-2 border-t border-gray-100">
                                        <span className="text-xs text-gray-400">SKU: {product.sku}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Grid view (default)
    return (
        <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 group product-card">
            <div className="relative overflow-hidden rounded-t-xl">
                <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />

                {/* Product Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                    {product.is_featured && (
                        <div className="badge-featured">
                            Featured
                        </div>
                    )}
                    {hasDiscount && (
                        <div className="badge-sale">
                            {discountPercentage}% OFF
                        </div>
                    )}
                    {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                        <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Stock Terbatas
                        </div>
                    )}
                    {product.stock_quantity === 0 && (
                        <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Habis
                        </div>
                    )}
                </div>

                {/* Wishlist Button - Hanya muncul jika sudah login */}
                {(status === 'authenticated' || checkAuthentication()) && (
                    <button
                        onClick={handleWishlistClick}
                        className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    >
                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                    </button>
                )}

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                        onClick={handleViewProduct}
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        <Eye className="h-4 w-4 inline mr-2" />
                        Quick View
                    </button>
                </div>
            </div>

            <div className="p-6">
                {/* Product Info */}
                <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {product.description}
                    </p>
                </div>

                {/* Islamic Product Details */}
                {(product.material || product.color || product.size) && (
                    <div className="mb-4 space-y-1">
                        {product.material && (
                            <div className="flex items-center text-xs text-gray-500">
                                <span className="font-medium w-16">Bahan:</span>
                                <span>{product.material}</span>
                            </div>
                        )}
                        {product.color && (
                            <div className="flex items-center text-xs text-gray-500">
                                <span className="font-medium w-16">Warna:</span>
                                <span>{product.color}</span>
                            </div>
                        )}
                        {product.size && (
                            <div className="flex items-center text-xs text-gray-500">
                                <span className="font-medium w-16">Ukuran:</span>
                                <span>{product.size}</span>
                            </div>
                        )}
                        {product.origin_country && (
                            <div className="flex items-center text-xs text-gray-500">
                                <span className="font-medium w-16">Asal:</span>
                                <span>{product.origin_country}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Price & Rating */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="price-current">
                            Rp {finalPrice.toLocaleString('id-ID')}
                        </span>
                        {hasDiscount && (
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="price-original">
                                    Rp {originalPrice.toLocaleString('id-ID')}
                                </span>
                                <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded">
                                    Hemat Rp {(originalPrice - finalPrice).toLocaleString('id-ID')}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="star-rating">
                        <Star className="h-4 w-4 star-filled" />
                        <span className="text-sm text-gray-600">4.8</span>
                    </div>
                </div>

                {/* Stock Info */}
                <div className="mb-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Stok:</span>
                        <span className={`font-medium ${stockStatus.color}`}>
                            {product.stock_quantity > 0 ? `${product.stock_quantity} pcs` : 'Habis'}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                    <button
                        onClick={handleViewProduct}
                        className="flex-1 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Lihat Detail
                    </button>
                    <button
                        onClick={handleOrderClick}
                        disabled={product.stock_quantity === 0}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${product.stock_quantity === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.stock_quantity === 0 ? 'Habis' : 'Pesan'}
                    </button>
                </div>

                {/* SKU */}
                {product.sku && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400">SKU: {product.sku}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductCard