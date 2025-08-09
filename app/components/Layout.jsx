// app/components/Layout.jsx - Main Layout Component
'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import IslamicBlessings from './islamic/IslamicBlessings'

const Layout = ({ children }) => {
    const pathname = usePathname()

    // Routes yang tidak memerlukan navbar/footer (seperti login, admin panel tertentu)
    const noLayoutRoutes = ['/login', '/register', '/admin/login']
    const shouldShowLayout = !noLayoutRoutes.includes(pathname)

    // Routes yang hanya memerlukan navbar tanpa footer
    const navbarOnlyRoutes = ['/dashboard', '/admin', '/staff']
    const shouldShowFooter = !navbarOnlyRoutes.some(route => pathname.startsWith(route))

    if (!shouldShowLayout) {
        return (
            <div className="min-h-screen">
                <IslamicBlessings />
                {children}
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Islamic Blessings */}
            <IslamicBlessings />

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            {shouldShowFooter && <Footer />}
        </div>
    )
}

export default Layout