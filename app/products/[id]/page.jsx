// app/products/[id]/page.jsx - Product Detail Page
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
    ArrowLeft,
    Heart,
    Share2,
    Star,
    Plus,
    Minus,
    ShoppingCart,
    Truck,
    Shield,
    Package,
    MapPin,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    ZoomIn      // ✅ Fixed: Using ZoomIn instead of Zoom
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Layout, Button, Badge, LoadingSpinner } from '../../components'

const ProductDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { data: session } = useSession()
    const productId = params.id

    // State management
    const [product, setProduct] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const [addingToCart, setAddingToCart] = useState(false)
    const [isInWishlist, setIsInWishlist] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [relatedProducts, setRelatedProducts] = useState([])

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/products/${productId}`)

                if (!response.ok) {
                    throw new Error('Product not found')
                }

                const data = await response.json()
                setProduct(data.data)

                // Set default variant if available
                if (data.data.variants && data.data.variants.length > 0) {
                    setSelectedVariant(data.data.variants[0])
                }

                // Fetch related products
                fetchRelatedProducts(data.data.category_id)

            } catch (error) {
                console.error('Error fetching product:', error)
                // Fallback product data
                setProduct({
                    id: parseInt(productId),
                    name: 'Hijab Segi Empat Premium Katun',
                    description: 'Hijab segi empat dari bahan katun premium yang lembut dan nyaman digunakan sehari-hari. Terbuat dari bahan berkualitas tinggi yang breathable dan tidak mudah kusut. Cocok untuk berbagai aktivitas sehari-hari maupun acara formal.',
                    price: 45000,
                    discount_price: 39000,
                    sku: 'HJB-001',
                    stock_quantity: 50,
                    material: 'Katun Premium',
                    color: 'Hitam',
                    size: '110x110 cm',
                    pattern: 'Polos',
                    origin_country: 'Indonesia',
                    weight: 100,
                    image_url: 'https://images.unsplash.com/photo-1583846962245-7bcd48d3e3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    gallery_images: [
                        'https://images.unsplash.com/photo-1583846962245-7bcd48d3e3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1596061404091-2a44be048b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1594736797933-d0200ba8b086?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    ],
                    is_featured: true,
                    status: 'active',
                    category: {
                        id: 1,
                        name: 'Kerudung & Hijab',
                        slug: 'kerudung-hijab'
                    },
                    variants: [
                        {
                            id: 1,
                            variant_name: 'Hitam - 110x110',
                            sku: 'HJB-001-BLK',
                            price: 45000,
                            stock_quantity: 20,
                            color: 'Hitam',
                            size: '110x110 cm'
                        },
                        {
                            id: 2,
                            variant_name: 'Navy - 110x110',
                            sku: 'HJB-001-NVY',
                            price: 45000,
                            stock_quantity: 15,
                            color: 'Navy',
                            size: '110x110 cm'
                        },
                        {
                            id: 3,
                            variant_name: 'Cream - 110x110',
                            sku: 'HJB-001-CRM',
                            price: 45000,
                            stock_quantity: 15,
                            color: 'Cream',
                            size: '110x110 cm'
                        }
                    ]
                })
                setSelectedVariant({
                    id: 1,
                    variant_name: 'Hitam - 110x110',
                    sku: 'HJB-001-BLK',
                    price: 45000,
                    stock_quantity: 20,
                    color: 'Hitam',
                    size: '110x110 cm'
                })
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [productId])

    const fetchRelatedProducts = async (categoryId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/products?category_id=${categoryId}&limit=4`)
            const data = await response.json()
            setRelatedProducts(data.data?.filter(p => p.id !== parseInt(productId)) || [])
        } catch (error) {
            console.error('Error fetching related products:', error)
        }
    }

    // Handle add to cart
    const handleAddToCart = async () => {
        if (!session) {
            toast.error('Silakan login terlebih dahulu')
            router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`)
            return
        }

        if (!selectedVariant || selectedVariant.stock_quantity === 0) {
            toast.error('Produk sedang habis')
            return
        }

        setAddingToCart(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            toast.success('Produk berhasil ditambahkan ke keranjang!')

            // Redirect to cart if action=order
            if (searchParams.get('action') === 'order') {
                router.push('/cart')
            }
        } catch (error) {
            toast.error('Gagal menambahkan produk ke keranjang')
        } finally {
            setAddingToCart(false)
        }
    }

    // Handle wishlist toggle
    const handleWishlistToggle = async () => {
        if (!session) {
            toast.error('Silakan login terlebih dahulu')
            return
        }

        try {
            setIsInWishlist(!isInWishlist)
            toast.success(isInWishlist ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist')
        } catch (error) {
            toast.error('Gagal mengupdate wishlist')
        }
    }

    // Handle share
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href
                })
            } catch (error) {
                console.log('Error sharing:', error)
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href)
            toast.success('Link produk disalin ke clipboard')
        }
    }

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <LoadingSpinner size="xl" />
                        <p className="mt-4 text-gray-600">Memuat detail produk...</p>
                    </div>
                </div>
            </Layout>
        )
    }

    if (!product) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h1>
                        <p className="text-gray-600 mb-6">Produk yang Anda cari tidak tersedia</p>
                        <Button onClick={() => router.push('/shop')}>
                            Kembali ke Shop
                        </Button>
                    </div>
                </div>
            </Layout>
        )
    }

    const finalPrice = selectedVariant?.price || product.discount_price || product.price
    const originalPrice = product.price
    const hasDiscount = product.discount_price && product.discount_price < product.price
    const currentStock = selectedVariant?.stock_quantity || product.stock_quantity

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                    <button onClick={() => router.push('/')} className="hover:text-emerald-600">
                        Home
                    </button>
                    <span>/</span>
                    <button onClick={() => router.push('/shop')} className="hover:text-emerald-600">
                        Shop
                    </button>
                    <span>/</span>
                    <button onClick={() => router.push(`/categories/${product.category.slug}`)} className="hover:text-emerald-600">
                        {product.category.name}
                    </button>
                    <span>/</span>
                    <span className="text-gray-900">{product.name}</span>
                </nav>

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-emerald-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative group">
                            <img
                                src={product.gallery_images?.[selectedImage] || product.image_url}
                                alt={product.name}
                                className="w-full h-96 lg:h-[500px] object-cover rounded-xl cursor-zoom-in"
                                onClick={() => setShowImageModal(true)}
                            />
                            <button
                                onClick={() => setShowImageModal(true)}
                                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ZoomIn className="h-4 w-4" />
                            </button>

                            {/* Navigation Arrows */}
                            {product.gallery_images && product.gallery_images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.gallery_images.length - 1)}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setSelectedImage(selectedImage < product.gallery_images.length - 1 ? selectedImage + 1 : 0)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {product.gallery_images && product.gallery_images.length > 1 && (
                            <div className="flex space-x-3 overflow-x-auto">
                                {product.gallery_images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-emerald-500' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    {product.is_featured && (
                                        <Badge variant="featured">Featured Product</Badge>
                                    )}
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {product.name}
                                    </h1>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={handleWishlistToggle}
                                        className={`p-2 rounded-full transition-colors ${isInWishlist ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                                    >
                                        <Share2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">(4.8) • 156 reviews</span>
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <span className="text-3xl font-bold text-emerald-600">
                                        Rp {finalPrice.toLocaleString('id-ID')}
                                    </span>
                                    {hasDiscount && (
                                        <span className="text-xl text-gray-500 line-through">
                                            Rp {originalPrice.toLocaleString('id-ID')}
                                        </span>
                                    )}
                                </div>
                                {hasDiscount && (
                                    <div className="inline-flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Hemat Rp {(originalPrice - finalPrice).toLocaleString('id-ID')}
                                        ({Math.round((1 - finalPrice / originalPrice) * 100)}%)
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">Detail Produk</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">SKU:</span>
                                        <span className="font-medium">{selectedVariant?.sku || product.sku}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Bahan:</span>
                                        <span className="font-medium">{product.material}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Ukuran:</span>
                                        <span className="font-medium">{product.size}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Asal:</span>
                                        <span className="font-medium">{product.origin_country}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Berat:</span>
                                        <span className="font-medium">{product.weight}g</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Motif:</span>
                                        <span className="font-medium">{product.pattern}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Variants */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900">Pilihan Warna</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`p-3 border rounded-lg text-sm font-medium transition-colors ${selectedVariant?.id === variant.id
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="font-medium">{variant.color}</div>
                                            <div className="text-xs text-gray-500">
                                                Stok: {variant.stock_quantity}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity & Add to Cart */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-700">Jumlah:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 hover:bg-gray-50 transition-colors"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                                            className="p-2 hover:bg-gray-50 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                    {currentStock > 0 ? `${currentStock} tersedia` : 'Habis'}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={currentStock === 0 || addingToCart}
                                    className="flex-1"
                                    variant="islamic"
                                    size="lg"
                                >
                                    {addingToCart ? (
                                        <LoadingSpinner size="sm" className="mr-2" />
                                    ) : (
                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                    )}
                                    {currentStock === 0 ? 'Habis' : addingToCart ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                                </Button>

                                <Button
                                    onClick={() => {
                                        handleAddToCart()
                                        router.push('/checkout')
                                    }}
                                    disabled={currentStock === 0}
                                    variant="outline"
                                    size="lg"
                                >
                                    Beli Sekarang
                                </Button>
                            </div>
                        </div>

                        {/* Shipping & Service Info */}
                        <div className="space-y-3 border-t pt-6">
                            <div className="flex items-center space-x-3">
                                <Truck className="h-5 w-5 text-emerald-600" />
                                <div>
                                    <div className="font-medium text-sm">Gratis Ongkir</div>
                                    <div className="text-xs text-gray-600">Minimal pembelian Rp 100.000</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Shield className="h-5 w-5 text-emerald-600" />
                                <div>
                                    <div className="font-medium text-sm">Garansi Halal</div>
                                    <div className="text-xs text-gray-600">Produk bersertifikat halal</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="h-5 w-5 text-emerald-600" />
                                <div>
                                    <div className="font-medium text-sm">Estimasi Kirim</div>
                                    <div className="text-xs text-gray-600">2-4 hari kerja</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="mt-16 space-y-8">
                    <div className="border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 pb-4">Deskripsi Produk</h2>
                    </div>
                    <div className="prose max-w-none text-gray-700">
                        <p>{product.description}</p>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Produk Terkait</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <div
                                    key={relatedProduct.id}
                                    onClick={() => router.push(`/products/${relatedProduct.id}`)}
                                    className="cursor-pointer group"
                                >
                                    <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300">
                                        <img
                                            src={relatedProduct.image_url}
                                            alt={relatedProduct.name}
                                            className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {relatedProduct.name}
                                            </h3>
                                            <div className="text-emerald-600 font-bold">
                                                Rp {(relatedProduct.discount_price || relatedProduct.price).toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={() => setShowImageModal(false)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 text-lg"
                        >
                            ✕ Tutup
                        </button>
                        <img
                            src={product.gallery_images?.[selectedImage] || product.image_url}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default ProductDetailPage