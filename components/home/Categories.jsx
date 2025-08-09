'use client'

import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import 'react-lazy-load-image-component/src/effects/blur.css'

export default function Categories() {
    const categories = [
        {
            id: 1,
            name: 'Kerudung & Hijab',
            description: 'Koleksi kerudung syar\'i premium dengan berbagai model dan warna',
            image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=500&h=300&fit=crop&q=80',
            count: '200+ Produk',
            icon: '🧕',
            href: '/categories/kerudung',
            trending: true,
            bgColor: 'from-islamic-green-400 to-islamic-green-600'
        },
        {
            id: 2,
            name: 'Mukena & Telekung',
            description: 'Mukena berkualitas tinggi untuk ibadah yang khusyuk',
            image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=500&h=300&fit=crop&q=80',
            count: '150+ Produk',
            icon: '🤲',
            href: '/categories/mukena',
            trending: false,
            bgColor: 'from-islamic-blue-400 to-islamic-blue-600'
        },
        {
            id: 3,
            name: 'Sajadah Premium',
            description: 'Sajadah import dan lokal dengan kualitas terbaik',
            image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&h=300&fit=crop&q=80',
            count: '100+ Produk',
            icon: '🕌',
            href: '/categories/sajadah',
            trending: true,
            bgColor: 'from-islamic-gold-400 to-islamic-gold-600'
        },
        {
            id: 4,
            name: 'Gamis & Dress',
            description: 'Gamis muslimah modern dengan desain elegan',
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=300&fit=crop&q=80',
            count: '180+ Produk',
            icon: '👗',
            href: '/categories/gamis',
            trending: false,
            bgColor: 'from-purple-400 to-purple-600'
        },
        {
            id: 5,
            name: 'Baju Koko',
            description: 'Koleksi baju koko pria untuk berbagai acara',
            image: 'https://images.unsplash.com/photo-1594736797933-d0ac6020be4e?w=500&h=300&fit=crop&q=80',
            count: '120+ Produk',
            icon: '👔',
            href: '/categories/koko',
            trending: true,
            bgColor: 'from-indigo-400 to-indigo-600'
        },
        {
            id: 6,
            name: 'Aksesoris Islamic',
            description: 'Aksesoris pelengkap gaya hidup islami',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=300&fit=crop&q=80',
            count: '80+ Produk',
            icon: '💎',
            href: '/categories/aksesoris',
            trending: false,
            bgColor: 'from-pink-400 to-pink-600'
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {categories.map((category) => (
                <motion.div
                    key={category.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                >
                    <Link href={category.href}>
                        <div className="relative overflow-hidden rounded-islamic shadow-islamic hover:shadow-islamic-lg transition-all duration-500 cursor-pointer h-80">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <LazyLoadImage
                                    src={category.image}
                                    alt={category.name}
                                    width={500}
                                    height={300}
                                    effect="blur"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${category.bgColor} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                                {/* Top Section */}
                                <div className="flex items-start justify-between">
                                    <div className="text-4xl mb-2 animate-bounce-gentle">
                                        {category.icon}
                                    </div>
                                    {category.trending && (
                                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                                            <TrendingUp className="w-3 h-3" />
                                            Trending
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Section */}
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-islamic-gold-200 transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm opacity-90 leading-relaxed">
                                            {category.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium opacity-75">
                                            {category.count}
                                        </span>

                                        <motion.div
                                            className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium group-hover:bg-white/30 transition-colors"
                                            whileHover={{ x: 5 }}
                                        >
                                            Jelajahi
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-islamic transition-colors duration-300" />
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    )
}