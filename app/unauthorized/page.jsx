// app/unauthorized/page.jsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldX, ArrowLeft, Home } from 'lucide-react'

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
            <div className="islamic-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="mb-8"
                    >
                        <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                            <ShieldX className="w-12 h-12 text-red-600" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Akses Ditolak
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-600 mb-8"
                    >
                        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
                        Silakan hubungi administrator jika Anda merasa ini adalah kesalahan.
                    </motion.p>

                    {/* Islamic Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-islamic-green-50 p-6 rounded-islamic mb-8 border border-islamic-green-200"
                    >
                        <p className="arabic-text text-lg mb-2 text-islamic-green-700">
                            وَاتَّقُوا اللَّهَ وَيُعَلِّمُكُمُ اللَّهُ
                        </p>
                        <p className="text-sm text-islamic-green-600 italic">
                            "Dan bertakwalah kepada Allah, maka Allah akan memberikan pengajaran kepadamu"
                            <br />
                            (QS. Al-Baqarah: 282)
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

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-12 p-4 bg-gray-50 rounded-islamic"
                    >
                        <h3 className="font-semibold text-gray-900 mb-2">Butuh Bantuan?</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Jika Anda merasa memerlukan akses ke halaman ini, silakan hubungi tim support kami.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                            <a href="mailto:support@nayea.id" className="text-islamic-green-600 hover:text-islamic-green-700">
                                📧 support@nayea.id
                            </a>
                            <a href="https://wa.me/6281234567890" className="text-islamic-green-600 hover:text-islamic-green-700">
                                📱 WhatsApp Support
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}