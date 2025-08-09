// app/error.jsx
'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

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
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Ups! Terjadi Kesalahan
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Maaf, terjadi kesalahan tidak terduga. Tim kami telah diberi tahu dan sedang menyelesaikan masalah ini.
          </motion.p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-100 p-4 rounded-islamic mb-8 text-left"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Error Details (Development):</h3>
              <pre className="text-sm text-red-600 overflow-auto">
                {error?.message || 'Unknown error occurred'}
              </pre>
            </motion.div>
          )}

          {/* Islamic Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-islamic-green-50 p-6 rounded-islamic mb-8 border border-islamic-green-200"
          >
            <p className="arabic-text text-lg mb-2 text-islamic-green-700">
              وَمَا أَصَابَكُم مِّن مُّصِيبَةٍ فَبِمَا كَسَبَتْ أَيْدِيكُمْ وَيَعْفُو عَن كَثِيرٍ
            </p>
            <p className="text-sm text-islamic-green-600 italic">
              "Dan apa saja musibah yang menimpa kamu maka adalah disebabkan oleh perbuatan tanganmu sendiri, dan Allah memaafkan sebagian besar (dari kesalahan-kesalahanmu)"
              <br />
              (QS. Ash-Shura: 30)
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={reset}
              className="btn-islamic-primary inline-flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Coba Lagi
            </button>
            
            <a
              href="/"
              className="btn-islamic-secondary inline-flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </a>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 p-4 bg-gray-50 rounded-islamic"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Masih Bermasalah?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Jika error ini terus muncul, silakan hubungi tim support kami dengan menyertakan informasi berikut.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a 
                href="mailto:support@nayea.id?subject=Error Report"
                className="text-islamic-green-600 hover:text-islamic-green-700 inline-flex items-center gap-1"
              >
                <MessageCircle className="w-4 h-4" />
                support@nayea.id
              </a>
              <a 
                href="https://wa.me/6281234567890"
                className="text-islamic-green-600 hover:text-islamic-green-700 inline-flex items-center gap-1"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Support
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

