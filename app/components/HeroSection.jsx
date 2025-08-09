// app/components/HeroSection.jsx - Hero Section Component
'use client'

import { useState, useEffect } from 'react'
import {
    ShoppingBag,
    ChevronRight,
    Shield,
    Truck,
    Star,
    Heart,
    Gift,
    Play,
    ArrowRight,
    Sparkles
} from 'lucide-react'

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Hero slides data
    const heroSlides = [
        {
            id: 1,
            title: "Discover Islamic Fashion",
            subtitle: "Authentic halal fashion that combines modesty with modern style",
            description: "Find your perfect Islamic attire that reflects your faith and personality",
            ctaText: "Shop Now",
            ctaLink: "/shop",
            backgroundImage: "https://images.unsplash.com/photo-1583846962245-7bcd48d3e3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bgColor: "from-emerald-50 to-teal-50"
        },
        {
            id: 2,
            title: "Koleksi Ramadan",
            subtitle: "Sambut bulan suci dengan koleksi fashion Islamic terbaru",
            description: "Mukena, gamis, dan hijab special edition untuk ibadah yang khusyuk",
            ctaText: "Lihat Koleksi",
            ctaLink: "/shop?category=ramadan",
            backgroundImage: "https://images.unsplash.com/photo-1594736797933-d0200ba8b086?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bgColor: "from-purple-50 to-pink-50"
        },
        {
            id: 3,
            title: "Premium Quality",
            subtitle: "Kualitas terbaik dengan harga yang terjangkau",
            description: "Setiap produk dipilih dengan standar kualitas tinggi untuk kenyamanan Anda",
            ctaText: "Jelajahi",
            ctaLink: "/about",
            backgroundImage: "https://images.unsplash.com/photo-1596061404091-2a44be048b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bgColor: "from-blue-50 to-indigo-50"
        }
    ]

    // Auto slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        }, 5000) // Change slide every 5 seconds

        return () => clearInterval(timer)
    }, [heroSlides.length])

    const currentHero = heroSlides[currentSlide]

    const features = [
        { icon: Shield, title: "Halal Certified", description: "Produk halal bersertifikat" },
        { icon: Truck, title: "Free Shipping", description: "Gratis ongkir se-Indonesia" },
        { icon: Star, title: "Premium Quality", description: "Kualitas premium terjamin" },
    ]

    return (
        <section className={`bg-gradient-to-br ${currentHero.bgColor} py-16 lg:py-20 relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 islamic-pattern opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-fade-in-up">
                        {/* Islamic Blessing */}
                        <div className="text-center lg:text-left">
                            <p className="text-2xl font-arabic text-emerald-700 mb-2">
                                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                            </p>
                            <p className="text-sm text-gray-600 italic">
                                "In the name of Allah, the Most Gracious, the Most Merciful"
                            </p>
                        </div>

                        {/* Main Content */}
                        <div>
                            {/* Badge */}
                            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <Sparkles className="h-4 w-4 mr-2" />
                                New Collection 2025
                            </div>

                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                {currentHero.title.split(' ').map((word, index) => (
                                    <span key={index}>
                                        {word === 'Islamic' ? (
                                            <span className="text-emerald-600">{word}</span>
                                        ) : word === 'Ramadan' ? (
                                            <span className="text-purple-600">{word}</span>
                                        ) : word === 'Premium' ? (
                                            <span className="text-blue-600">{word}</span>
                                        ) : (
                                            word
                                        )}
                                        {index < currentHero.title.split(' ').length - 1 && ' '}
                                    </span>
                                ))}
                            </h1>

                            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                                {currentHero.subtitle}
                            </p>

                            <p className="text-lg text-gray-500 mb-8">
                                {currentHero.description}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => window.location.href = currentHero.ctaLink}
                                className="btn-islamic flex items-center justify-center group"
                            >
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                {currentHero.ctaText}
                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => window.location.href = '/about'}
                                className="btn-islamic-outline flex items-center justify-center group"
                            >
                                <Play className="h-4 w-4 mr-2" />
                                Watch Story
                                <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/70 transition-all duration-300 group"
                                >
                                    <feature.icon className="h-8 w-8 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-sm font-medium text-gray-900">{feature.title}</p>
                                    <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center space-x-6 pt-4">
                            <div className="flex items-center space-x-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">{i}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900">2000+ Happy Customers</p>
                                    <p className="text-gray-600">Join our Islamic fashion community</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Hero Image */}
                    <div className="relative animate-fade-in-up">
                        <div className={`bg-gradient-to-br ${currentHero.bgColor} rounded-3xl p-8 lg:p-12 relative overflow-hidden`}>
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -translate-y-20 translate-x-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>

                            <img
                                src={currentHero.backgroundImage}
                                alt="Islamic Fashion Model"
                                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg relative z-10 transition-all duration-700"
                                loading="eager"
                            />
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce-gentle">
                            <Heart className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-emerald-600 rounded-full p-4 shadow-lg animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                            <Gift className="h-6 w-6 text-white" />
                        </div>

                        {/* Stats overlay */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                            <div className="flex items-center space-x-2">
                                <Star className="h-5 w-5 text-yellow-500" />
                                <div>
                                    <p className="font-bold text-sm">4.9/5</p>
                                    <p className="text-xs text-gray-600">Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center mt-12 space-x-3">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-emerald-600 w-8'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection