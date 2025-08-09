// components/layout/Footer.jsx
'use client'

import Link from 'next/link'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { name: 'Tentang Kami', href: '/about' },
        { name: 'Kontak', href: '/contact' },
        { name: 'Karir', href: '/career' },
        { name: 'Blog', href: '/blog' },
    ]

    const categories = [
        { name: 'Kerudung', href: '/categories/kerudung' },
        { name: 'Mukena', href: '/categories/mukena' },
        { name: 'Sajadah', href: '/categories/sajadah' },
        { name: 'Gamis', href: '/categories/gamis' },
    ]

    const customerService = [
        { name: 'Pusat Bantuan', href: '/help' },
        { name: 'Cara Belanja', href: '/how-to-shop' },
        { name: 'Pengiriman', href: '/shipping' },
        { name: 'Pengembalian', href: '/returns' },
    ]

    const paymentMethods = [
        { name: 'BCA', logo: '/images/payment/bca.png' },
        { name: 'BNI', logo: '/images/payment/bni.png' },
        { name: 'Mandiri', logo: '/images/payment/mandiri.png' },
        { name: 'OVO', logo: '/images/payment/ovo.png' },
        { name: 'GoPay', logo: '/images/payment/gopay.png' },
        { name: 'Dana', logo: '/images/payment/dana.png' },
    ]

    return (
        <footer className="bg-gray-900 text-white">
            <div className="islamic-container py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-islamic rounded-islamic flex items-center justify-center text-white text-2xl font-bold">
                                🕌
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gradient-islamic">Nayea.id</h1>
                                <p className="text-sm text-gray-400">Islamic Fashion</p>
                            </div>
                        </Link>

                        <p className="text-gray-400 leading-relaxed">
                            Toko online Islamic fashion terpercaya dengan produk berkualitas tinggi,
                            halal, dan syariah compliant untuk muslimah Indonesia.
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-islamic-green-600 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-islamic-blue-600 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-islamic-green-400">Link Cepat</h4>
                        <div className="space-y-2">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block text-gray-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold mb-4 text-islamic-blue-400">Kategori</h4>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className="block text-gray-400 hover:text-white transition-colors"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4 text-islamic-gold-400">Hubungi Kami</h4>
                        <div className="space-y-3 text-gray-400">
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5" />
                                <span>+62 812-3456-7890</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5" />
                                <span>info@nayea.id</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 mt-1" />
                                <span>Jl. Islamic Fashion No. 123<br />Jakarta Pusat, Indonesia</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="w-5 h-5" />
                                <span>Senin - Jumat: 08:00 - 17:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Service */}
                <div className="border-t border-gray-800 pt-8 mb-8">
                    <h4 className="font-semibold mb-4">Layanan Pelanggan</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {customerService.map((service) => (
                            <Link
                                key={service.name}
                                href={service.href}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                {service.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="border-t border-gray-800 pt-8 mb-8">
                    <h4 className="font-semibold mb-4">Metode Pembayaran</h4>
                    <div className="flex flex-wrap gap-4">
                        {paymentMethods.map((method) => (
                            <div
                                key={method.name}
                                className="bg-white p-2 rounded-lg w-16 h-10 flex items-center justify-center"
                            >
                                <span className="text-xs text-gray-600 font-semibold">{method.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 pt-8">
                    {/* Islamic Quote */}
                    <div className="text-center mb-6">
                        <div className="arabic-text text-xl mb-2 text-islamic-green-400">
                            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                        </div>
                        <p className="text-gray-400 italic">
                            "Dan Allah telah menghalalkan jual beli dan mengharamkan riba"
                        </p>
                        <p className="text-sm text-gray-500">(QS. Al-Baqarah: 275)</p>
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                        <p>&copy; {currentYear} Nayea.id. All rights reserved. Built with ❤️ for Muslimah Indonesia</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Kebijakan Privasi
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Syarat & Ketentuan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
