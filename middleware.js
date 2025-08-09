// middleware.js - Unified Routes with Permission-based Access
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    const { pathname } = request.nextUrl
    const url = request.nextUrl.clone()

    // Clean route mappings - Semua unified routes
    const routeMap = {
        // Public routes - tetap sama
        '/shop': '/products',
        '/categories': '/categories',
        '/about': '/about',
        '/contact': '/contact',
        '/help': '/help',

        // Auth routes  
        '/login': '/auth/login',
        '/register': '/auth/register',
        '/logout': '/auth/logout',

        // ===== UNIFIED ROUTES - Semua role bisa akses =====
        // Dashboard
        '/dashboard': '/dashboard',

        // User Management (permission-based CRUD)
        '/users': '/users',
        '/profile': '/users/profile',

        // Product Management (permission-based CRUD)
        '/products': '/products',
        '/categories': '/categories',

        // Order Management (permission-based CRUD) 
        '/orders': '/orders',
        '/cart': '/cart',
        '/checkout': '/checkout',
        '/wishlist': '/wishlist',

        // Content Management (permission-based CRUD)
        '/reports': '/reports',
        '/analytics': '/analytics',
        '/settings': '/settings',

        // Customer Service (permission-based CRUD)
        '/support': '/support',
        '/customers': '/customers',

        // Address Management
        '/addresses': '/addresses'
    }

    // Public routes - tidak memerlukan authentication
    const publicRoutes = [
        '/',
        '/shop',
        '/categories',
        '/about',
        '/contact',
        '/help',
        '/shipping',
        '/returns',
        '/login',
        '/register'
    ]

    // Routes yang memerlukan authentication (semua unified routes)
    const protectedRoutes = [
        '/dashboard',
        '/users',
        '/profile',
        '/products',
        '/orders',
        '/cart',
        '/checkout',
        '/wishlist',
        '/reports',
        '/analytics',
        '/settings',
        '/support',
        '/customers',
        '/addresses'
    ]

    // API routes yang perlu authentication
    const protectedApiRoutes = [
        '/api/users',
        '/api/products',
        '/api/orders',
        '/api/cart',
        '/api/reports',
        '/api/settings',
        '/api/support'
    ]

    // Handle clean URL rewriting
    if (routeMap[pathname]) {
        url.pathname = routeMap[pathname]
        return NextResponse.rewrite(url)
    }

    // Check if it's a public route
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    // Skip middleware for NextJS internal routes and static files
    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/api/auth/') ||
        pathname.includes('.') ||
        isPublicRoute
    ) {
        return NextResponse.next()
    }

    // Handle API routes
    if (pathname.startsWith('/api/')) {
        const isProtectedApi = protectedApiRoutes.some(route =>
            pathname.startsWith(route)
        )

        if (isProtectedApi && !token) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: 'Authentication required',
                    code: 'AUTH_REQUIRED'
                }),
                {
                    status: 401,
                    headers: { 'content-type': 'application/json' }
                }
            )
        }
        return NextResponse.next()
    }

    // Check if route requires authentication
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    // If protected route and no token, redirect to login
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Semua authenticated user bisa akses semua route
    // Permission-based CRUD akan di-handle di component level

    // Add user info to headers for easy access in components
    const response = NextResponse.next()

    if (token) {
        response.headers.set('X-User-Role', token.role || 'user')
        response.headers.set('X-User-ID', token.sub || '')
        response.headers.set('X-User-Email', token.email || '')
    }

    // Islamic blessing and security headers
    // Fix: Encode Arabic text to base64 or use ASCII transliteration
    const islamicBlessing = 'Bismillahir Rahmanir Rahim' // ASCII transliteration
    // Alternative: Base64 encoded Arabic
    // const islamicBlessing = Buffer.from('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم').toString('base64')

    response.headers.set('X-Islamic-Blessing', islamicBlessing)
    response.headers.set('X-Company', 'Nayea.id - Islamic Fashion')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('X-Robots-Tag', 'index, follow')

    // CSP for Islamic content safety
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
    )

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public/|.*\\..*$).*)',
    ],
}