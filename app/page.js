// app/page.jsx - Complete Landing Page menggunakan Semua Components
'use client'

import {
  Layout,
  HeroSection,
  FeaturedProducts,
  IslamicBlessings,
  Button,
  Badge,
  LoadingSpinner
} from './components'
import { useState, useEffect } from 'react'
import { Shield, Truck, Award, Heart, Package } from 'lucide-react'

/**
 * Complete Landing Page - Menggunakan Banyak Components
 * 
 * Contoh penggunaan berbagai components dari index.js
 * untuk membuat landing page yang lebih complete
 */
export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <LoadingSpinner size="xl" className="mx-auto mb-4" />
          <p className="text-emerald-700 font-semibold">Loading Nayea.id Islamic Fashion...</p>
          <p className="text-sm text-gray-600 mt-2 font-arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Islamic Blessings */}
      <IslamicBlessings />

      {/* Main Layout */}
      <Layout>
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section menggunakan Badge components */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-emerald-600">500+</div>
                <Badge variant="primary">Produk Islamic</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-emerald-600">2000+</div>
                <Badge variant="success">Happy Customers</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-emerald-600">4.9★</div>
                <Badge variant="warning">Rating Produk</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-emerald-600">100%</div>
                <Badge variant="featured">Halal Certified</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Benefits Section menggunakan Button components */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="info" className="mb-4">
                <Package className="h-4 w-4 mr-2" />
                Why Choose Us
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Mengapa Memilih Nayea.id?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kami berkomitmen memberikan pengalaman berbelanja Islamic fashion terbaik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <Shield className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Halal Certified</h3>
                <p className="text-gray-600 mb-4">
                  Semua produk telah tersertifikasi halal dan sesuai syariat Islam
                </p>
                <Button variant="outline" size="sm">
                  Pelajari Lebih Lanjut
                </Button>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <Truck className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Free Shipping</h3>
                <p className="text-gray-600 mb-4">
                  Gratis ongkos kirim ke seluruh Indonesia untuk pembelian minimal Rp 100.000
                </p>
                <Button variant="outline" size="sm">
                  Lihat Syarat
                </Button>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <Award className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                <p className="text-gray-600 mb-4">
                  Kualitas terbaik dengan bahan pilihan yang nyaman dan tahan lama
                </p>
                <Button variant="outline" size="sm">
                  Testimoni
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section dengan Button variants */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="text-white">
              <Badge variant="secondary" className="mb-4">
                <Heart className="h-4 w-4 mr-2" />
                Join Our Community
              </Badge>

              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Bergabunglah dengan Komunitas Muslimah
              </h2>
              <p className="text-xl text-emerald-100 mb-8">
                Dapatkan inspirasi fashion Islamic, tips hijab, dan update produk terbaru
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.location.href = '/shop'}
                >
                  Mulai Berbelanja Sekarang
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-emerald-600"
                  onClick={() => window.location.href = '/register'}
                >
                  Daftar Gratis
                </Button>
              </div>

              {/* Islamic Quote */}
              <div className="mt-12 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-xl font-arabic text-emerald-100 mb-2">
                  وَمَنْ تَوَكَّلَ عَلَى اللَّهِ فَهُوَ حَسْبُهُ
                </p>
                <p className="text-sm text-emerald-200">
                  "And whoever relies upon Allah - then He is sufficient for him" - QS. At-Talaq: 3
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}