'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react'
import 'react-lazy-load-image-component/src/effects/blur.css'

export default function Testimonials() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const testimonials = [
        {
            id: 1,
            name: 'Siti Aisyah Rahman',
            location: 'Jakarta Selatan',
            rating: 5,
            comment: 'Alhamdulillah, kerudungnya bagus banget dan sesuai syariah. Kualitas premium dengan harga yang terjangkau. Pelayanannya juga ramah dan pengiriman cepat. Recommended untuk para muslimah!',
            product: 'Kerudung Premium Voal Syari',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ab?w=100&h=100&fit=crop&crop=face&q=80',
            date: '2 minggu yang lalu',
            verified: true,
            role: 'Ibu Rumah Tangga'
        },
        {
            id: 2,
            name: 'Fatimah Zahra',
            location: 'Bandung',
            rating: 5,
            comment: 'Mukena katunnya lembut dan nyaman untuk shalat. Packaging rapih, pengiriman cepat. Motif bordir nya indah sekali. Barokallahu fiiki Nayea.id! Insya Allah akan repeat order.',
            product: 'Mukena Katun Premium Bordir',
            avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=face&q=80',
            date: '1 minggu yang lalu',
            verified: true,
            role: 'Mahasiswa'
        },
        {
            id: 3,
            name: 'Khadijah Muslimah',
            location: 'Surabaya',
            rating: 5,
            comment: 'Sajadahnya berkualitas tinggi, motif islaminya indah banget. Tebal dan empuk, cocok untuk shalat. Recommended banget untuk muslimah yang ingin produk halal dan berkualitas.',
            product: 'Sajadah Import Turkey Premium',
            avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face&q=80',
            date: '3 hari yang lalu',
            verified: true,
            role: 'Karyawan Swasta'
        },
        {
            id: 4,
            name: 'Maryam Salsabila',
            location: 'Yogyakarta',
            rating: 5,
            comment: 'Gamis syarinya bagus, bahan adem dan cutting nya pas. Cocok untuk acara formal maupun sehari-hari. Tim CS nya juga sangat membantu dalam memilih ukuran. Jazakillahu khairan!',
            product: 'Gamis Syari Modern Casual',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face&q=80',
            date: '5 hari yang lalu',
            verified: true,
            role: 'Guru'
        },
        {
            id: 5,
            name: 'Aminah Putri',
            location: 'Medan',
            rating: 5,
            comment: 'Khimar pet antem nya kualitas juara! Bahan premium, jahitan rapi, dan model nya syar\'i banget. Harga terjangkau untuk kualitas sekelas ini. Alhamdulillah sangat puas!',
            product: 'Khimar Pet Antem Premium',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&q=80',
            date: '1 minggu yang lalu',
            verified: true,
            role: 'Entrepreneur'
        }
    ]

    // Auto slide functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 4000)

        return () => clearInterval(timer)
    }, [testimonials.length, isAutoPlaying])

    const handleTestimonialChange = (index) => {
        setCurrentTestimonial(index)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 8000)
    }

    const nextTestimonial = () => {
        handleTestimonialChange((currentTestimonial + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        handleTestimonialChange((currentTestimonial - 1 + testimonials.length) % testimonials.length)
    }

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
            />
        ))
    }

    return (
        <div className="relative">
            {/* Main Testimonial Display */}
            <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                    >
                        {/* Testimonial Content */}
                        <div className="space-y-6">
                            {/* Quote Icon */}
                            <div className="text-islamic-green-500">
                                <Quote className="w-12 h-12" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-1">
                                {renderStars(testimonials[currentTestimonial].rating)}
                            </div>

                            {/* Comment */}
                            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                                "{testimonials[currentTestimonial].comment}"
                            </blockquote>

                            {/* Product */}
                            <div className="bg-islamic-green-50 p-4 rounded-islamic border-l-4 border-islamic-green-500">
                                <p className="text-sm text-islamic-green-700 font-medium">
                                    Produk: {testimonials[currentTestimonial].product}
                                </p>
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <LazyLoadImage
                                        src={testimonials[currentTestimonial].avatar}
                                        alt={testimonials[currentTestimonial].name}
                                        width={60}
                                        height={60}
                                        effect="blur"
                                        className="w-15 h-15 rounded-full object-cover"
                                        placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    />
                                    {testimonials[currentTestimonial].verified && (
                                        <div className="absolute -bottom-1 -right-1 bg-islamic-green-500 text-white rounded-full p-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                        {testimonials[currentTestimonial].name}
                                        {testimonials[currentTestimonial].verified && (
                                            <span className="text-islamic-green-500 text-sm">✓ Verified</span>
                                        )}
                                    </h4>
                                    <p className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {testimonials[currentTestimonial].location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {testimonials[currentTestimonial].date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Section */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                {/* Decorative background */}
                                <div className="absolute inset-0 bg-gradient-islamic rounded-2xl transform rotate-6 opacity-20"></div>

                                {/* Main image container */}
                                <div className="relative bg-white p-6 rounded-2xl shadow-islamic-lg">
                                    <div className="w-64 h-64 mx-auto">
                                        <LazyLoadImage
                                            src={testimonials[currentTestimonial].avatar}
                                            alt={testimonials[currentTestimonial].name}
                                            width={256}
                                            height={256}
                                            effect="blur"
                                            className="w-full h-full rounded-xl object-cover"
                                            placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                        />
                                    </div>

                                    {/* Floating badges */}
                                    <div className="absolute -top-2 -right-2 halal-badge">
                                        🌟 Halal
                                    </div>
                                    <div className="absolute -bottom-2 -left-2 syari-badge">
                                        📿 Syar'i
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
                {/* Previous Button */}
                <motion.button
                    onClick={prevTestimonial}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white rounded-full shadow-islamic hover:shadow-islamic-lg transition-all duration-300 border border-gray-200 hover:border-islamic-green-300"
                >
                    <ChevronLeft className="w-6 h-6 text-islamic-green-600" />
                </motion.button>

                {/* Dots Indicator */}
                <div className="flex space-x-3">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleTestimonialChange(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                                    ? 'bg-islamic-green-500 scale-125'
                                    : 'bg-gray-300 hover:bg-islamic-green-300'
                                }`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <motion.button
                    onClick={nextTestimonial}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white rounded-full shadow-islamic hover:shadow-islamic-lg transition-all duration-300 border border-gray-200 hover:border-islamic-green-300"
                >
                    <ChevronRight className="w-6 h-6 text-islamic-green-600" />
                </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-gradient-to-r from-islamic-green-50 to-islamic-blue-50 rounded-islamic">
                <div className="text-center">
                    <div className="text-2xl font-bold text-islamic-green-600">4.9/5</div>
                    <div className="text-sm text-gray-600">Rating Rata-rata</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-islamic-green-600">50K+</div>
                    <div className="text-sm text-gray-600">Happy Customer</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-islamic-green-600">99.5%</div>
                    <div className="text-sm text-gray-600">Kepuasan</div>
                </div>
            </div>
        </div>
    )
}