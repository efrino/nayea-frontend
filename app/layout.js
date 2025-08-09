// app/layout.jsx - Root Layout dengan SessionProvider
import { Inter } from 'next/font/google'
import Providers from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nayea.id - Islamic Fashion & Accessories',
  description: 'Discover authentic Islamic fashion and accessories. Halal, stylish, and modest clothing for the modern Muslim woman.',
  keywords: 'islamic fashion, hijab, abaya, modest clothing, halal fashion, syari, nayea',
  authors: [{ name: 'Nayea.id Team' }],
  creator: 'Nayea.id',
  publisher: 'Nayea.id',
  robots: 'index, follow',
  openGraph: {
    title: 'Nayea.id - Islamic Fashion & Accessories',
    description: 'Discover authentic Islamic fashion and accessories',
    url: 'https://nayea.id',
    siteName: 'Nayea.id',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nayea.id Islamic Fashion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nayea.id - Islamic Fashion & Accessories',
    description: 'Discover authentic Islamic fashion and accessories',
    images: ['/og-image.jpg'],
  },
  // removed viewport & themeColor from metadata — moved to `viewport` export below
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

// Put viewport + themeColor in this export (server-only)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // themeColor belongs here
  themeColor: '#059669',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Islamic Meta Tags */}
        <meta name="blessing" content="بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم" />
        <meta name="islamic-content" content="halal-certified" />

        {/* Performance Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* SEO Enhancement */}
        <link rel="canonical" href="https://nayea.id" />
        <meta name="google-site-verification" content="your-google-verification-code" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {/* Islamic Blessing Header - Invisible but present for blessing */}
          <div className="sr-only" aria-hidden="true">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>

          {/* Main Content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Islamic Footer Blessing */}
          <div className="sr-only" aria-hidden="true">
            رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
          </div>
        </Providers>

        {/* Analytics - Add your tracking codes here */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
