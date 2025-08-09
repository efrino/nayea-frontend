// app/not-found.jsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-islamic-green-50 via-white to-islamic-blue-50 flex items-center justify-center p-4">
            <div className="islamic-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    {/* 404 Illustration */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="mb-8"
                    >
                        <div className="text-8xl md:text-9xl font-bold text-islamic-green-200 mb-4">
                            404
                        </div>
                        <div className="w-24 h-24 mx-auto bg-islamic-green-100 rounded-full flex items-center justify-center">
                            <Search className="w-12 h-12 text-islamic-green-600" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Halaman Tidak Ditemukan
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-600 mb-8"
                    >
                        Maaf, halaman yang Anda cari tidak dapat ditemukan.
                        Mungkin halaman telah dipindahkan atau URL yang Anda masukkan salah.
                    </motion.p>

                    {/* Islamic Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-islamic-green-50 p-6 rounded-islamic mb-8 border border-islamic-green-200"
                    >
                        <p className="arabic-text text-lg mb-2 text-islamic-green-700">
                            وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
                        </p>
                        <p className="text-sm text-islamic-green-600 italic">
                            "Dan barangsiapa bertakwa kepada Allah niscaya Dia akan mengadakan baginya jalan keluar"
                            <br />
                            (QS. At-Talaq: 2)
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/"
                            className="btn-islamic-primary inline-flex items-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Kembali ke Beranda
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="btn-islamic-secondary inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Kembali
                        </button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {[
                            { name: 'Kerudung', href: '/categories/kerudung', icon: '🧕' },
                            { name: 'Mukena', href: '/categories/mukena', icon: '🤲' },
                            { name: 'Sajadah', href: '/categories/sajadah', icon: '🕌' },
                            { name: 'Gamis', href: '/categories/gamis', icon: '👗' },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="p-4 bg-white rounded-islamic shadow-islamic hover:shadow-islamic-lg transition-all duration-300 text-center"
                            >
                                <div className="text-2xl mb-2">{link.icon}</div>
                                <span className="text-sm font-medium text-gray-700">{link.name}</span>
                            </Link>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}