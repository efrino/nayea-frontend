// app/components/Footer.jsx - Footer Component
'use client'

import {
    Gift,
    Phone,
    Mail,
    Instagram,
    MessageCircle,
    MapPin,
    Clock,
    Facebook,
    Twitter,
    Youtube,
    CreditCard,
    Truck,
    Shield,
    Award
} from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { name: 'Shop', href: '/shop' },
        { name: 'Categories', href: '/categories' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
    ]

    const customerService = [
        { name: 'Help Center', href: '/help' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns & Exchanges', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Track Order', href: '/track-order' },
        { name: 'Support', href: '/support' },
    ]

    const policies = [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Refund Policy', href: '/refund' },
        { name: 'Islamic Guidelines', href: '/islamic-guidelines' },
    ]

    const features = [
        { icon: Truck, title: 'Free Shipping', description: 'Gratis ongkir min. Rp 100k' },
        { icon: Shield, title: 'Secure Payment', description: 'Pembayaran aman & terpercaya' },
        { icon: Award, title: 'Quality Guarantee', description: 'Garansi kualitas produk' },
        { icon: CreditCard, title: 'Easy Payment', description: 'Berbagai metode pembayaran' },
    ]

    return (
        <footer className="bg-gray-900 text-white">
            {/* Features Section */}
            <div className="border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div className="bg-emerald-600 p-2 rounded-lg flex-shrink-0">
                                    <feature.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">{feature.title}</h4>
                                    <p className="text-xs text-gray-400">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="bg-emerald-600 p-2 rounded-lg">
                                <Gift className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Nayea.id</h3>
                                <p className="text-sm text-gray-400">Islamic Fashion</p>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed">
                            Authentic Islamic fashion yang menggabungkan kesopanan dengan gaya modern untuk muslimah kontemporer. Temukan koleksi fashion halal terbaik di Indonesia.
                        </p>

                        {/* Islamic Blessing */}
                        <div className="bg-emerald-900/30 rounded-lg p-4 text-center">
                            <p className="text-emerald-400 font-arabic text-lg mb-2">
                                جَزَاكُمُ اللهُ خَيْرًا
                            </p>
                            <p className="text-xs text-gray-400">
                                Jazakumullahu khairan - May Allah reward you with good
                            </p>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h4 className="font-semibold mb-3">Follow Us</h4>
                            <div className="flex space-x-3">
                                <a href="https://instagram.com/nayea.id" className="bg-gray-800 hover:bg-emerald-600 p-2 rounded-lg transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="https://facebook.com/nayea.id" className="bg-gray-800 hover:bg-emerald-600 p-2 rounded-lg transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="https://twitter.com/nayea_id" className="bg-gray-800 hover:bg-emerald-600 p-2 rounded-lg transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="https://youtube.com/nayea.id" className="bg-gray-800 hover:bg-emerald-600 p-2 rounded-lg transition-colors">
                                    <Youtube className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-3">
                            {customerService.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href={service.href}
                                        className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                                    >
                                        {service.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <div className="space-y-4">
                            {/* Address */}
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Head Office</p>
                                    <p className="text-gray-400 text-sm">
                                        Jl. Islamic Fashion No. 123<br />
                                        Jakarta Selatan 12345, Indonesia
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <a href="tel:+6282243135401" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                                        +62 822 4313 5401
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <a href="mailto:hello@nayea.id" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                                        hello@nayea.id
                                    </a>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="flex items-center space-x-3">
                                <MessageCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">WhatsApp</p>
                                    <a
                                        href="https://wa.me/6282243135401"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                                    >
                                        Customer Support
                                    </a>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="flex items-start space-x-3">
                                <Clock className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Business Hours</p>
                                    <div className="text-gray-400 text-sm">
                                        <p>Senin - Jumat: 08:00 - 17:00</p>
                                        <p>Sabtu: 08:00 - 15:00</p>
                                        <p>Minggu & Hari Besar: Tutup</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <h4 className="font-semibold text-lg mb-2">Subscribe Newsletter</h4>
                            <p className="text-gray-400 text-sm">
                                Dapatkan update produk terbaru & penawaran khusus Islamic fashion
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <form className="flex space-x-3">
                                <input
                                    type="email"
                                    placeholder="Masukkan email Anda"
                                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <p className="text-gray-400 text-sm">
                                © {currentYear} Nayea.id. All rights reserved. Made with ❤️ for the Muslim community.
                            </p>
                        </div>

                        <div className="flex justify-center md:justify-end space-x-6">
                            {policies.map((policy, index) => (
                                <a
                                    key={index}
                                    href={policy.href}
                                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                                >
                                    {policy.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Islamic Closing */}
                    <div className="text-center mt-6 pt-6 border-t border-gray-800">
                        <p className="text-emerald-400 font-arabic text-sm mb-1">
                            رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
                        </p>
                        <p className="text-gray-500 text-xs">
                            "Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire." - QS. Al-Baqarah: 201
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer