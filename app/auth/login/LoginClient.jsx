// app/auth/login/LoginClient.jsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginClient({ initialCallbackUrl = '/' }) {
    const router = useRouter()
    const callbackUrl = initialCallbackUrl

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.email) newErrors.email = 'Email tidak boleh kosong'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid'

        if (!formData.password) newErrors.password = 'Password tidak boleh kosong'
        else if (formData.password.length < 6) newErrors.password = 'Password minimal 6 karakter'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)
        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false
            })

            if (result?.error) {
                toast.error('Email atau password salah')
            } else {
                toast.success('Login berhasil! Selamat datang di Nayea.id')
                router.push(callbackUrl)
            }
        } catch (error) {
            toast.error('Terjadi kesalahan, silakan coba lagi')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            // next-auth will handle redirect; pass callbackUrl
            await signIn('google', { callbackUrl })
        } catch (error) {
            toast.error('Gagal login dengan Google')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-islamic-green-50 via-white to-islamic-blue-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 islamic-pattern-overlay opacity-5" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white rounded-2xl shadow-prayer border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-islamic p-6 text-white text-center">
                        <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">🕌</div>
                            <span className="text-xl font-bold">Nayea.id</span>
                        </Link>
                        <h1 className="text-2xl font-bold mb-2">Selamat Datang Kembali</h1>
                        <p className="opacity-90">Masuk ke akun Nayea.id Anda</p>
                    </div>

                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`form-input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="Masukkan email Anda"
                                    />
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {errors.email && <p className="form-error">{errors.email}</p>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`form-input pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                                        placeholder="Masukkan password Anda"
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="form-error">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded border-gray-300 text-islamic-green-600 focus:ring-islamic-green-500" />
                                    <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                                </label>
                                <Link href="/auth/forgot-password" className="text-sm text-islamic-green-600 hover:text-islamic-green-700">
                                    Lupa password?
                                </Link>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full btn-islamic-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Masuk...
                                    </>
                                ) : (
                                    'Masuk'
                                )}
                            </motion.button>
                        </form>

                        <div className="my-6 flex items-center">
                            <div className="flex-1 border-t border-gray-200"></div>
                            <span className="px-4 text-sm text-gray-500">atau</span>
                            <div className="flex-1 border-t border-gray-200"></div>
                        </div>

                        <motion.button
                            onClick={handleGoogleLogin}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-islamic hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Masuk dengan Google
                        </motion.button>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Belum punya akun?{' '}
                            <Link href="/register" className="text-islamic-green-600 hover:text-islamic-green-700 font-semibold">
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center mt-6 text-gray-600">
                    <p className="arabic-text text-lg mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                    <p className="text-sm italic">"Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang"</p>
                </motion.div>
            </motion.div>
        </div>
    )
}
