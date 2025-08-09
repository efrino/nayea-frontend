// components/home/Newsletter.jsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Mail, Gift, Bell, Star } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            toast.error('Email tidak boleh kosong!')
            return
        }

        setIsLoading(true)

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

            setIsSubscribed(true)
            toast.success('Alhamdulillah! Berhasil berlangganan newsletter Nayea.id')
            setEmail('')
        } catch (error) {
            toast.error('Terjadi kesalahan, silakan coba lagi')
        } finally {
            setIsLoading(false)
        }
    }

    const benefits = [
        { icon: Gift, text: 'Promo eksklusif khusus subscriber' },
        { icon: Bell, text: 'Update produk terbaru' },
        { icon: Star, text: 'Tips fashion muslimah' },
    ]

    if (isSubscribed) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-islamic rounded-2xl p-8 text-white text-center"
            >
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-islamic-gold-300" />
                <h3 className="text-2xl font-bold mb-2">Barakallahu fiiki!</h3>
                <p className="text-islamic-green-100">
                    Anda telah berlangganan newsletter Nayea.id.
                    Pantau email Anda untuk mendapatkan update terbaru dari kami.
                </p>
            </motion.div>
        )
    }

    return (
        <div className="bg-gradient-islamic rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Mail className="w-16 h-16 mx-auto mb-6 text-islamic-gold-300" />

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        📧 Newsletter Islamic
                    </h2>

                    <p className="text-lg opacity-90 mb-8">
                        Dapatkan update produk terbaru, tips fashion muslimah,
                        dan promo exclusive khusus untuk Anda
                    </p>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm"
                                >
                                    <Icon className="w-5 h-5 text-islamic-gold-300" />
                                    <span className="text-sm">{benefit.text}</span>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Subscribe Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan email Anda..."
                            className="flex-1 px-4 py-3 rounded-islamic text-gray-900 focus:outline-none focus:ring-2 focus:ring-islamic-gold-300 placeholder-gray-500"
                            disabled={isLoading}
                        />
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-islamic-gold-500 hover:bg-islamic-gold-600 text-white font-semibold rounded-islamic transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="loading-spinner w-5 h-5 border-white" />
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Subscribe
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-sm opacity-75 mt-4">
                        🔒 Email Anda aman bersama kami. Tidak ada spam!
                    </p>
                </motion.div>
            </div>
        </div>
    )
}