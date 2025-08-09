// middleware.js - Updated for Direct Selling Roles
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    const { pathname } = request.nextUrl

    // Public routes that don't require authentication
    const publicRoutes = [
        '/',
        '/auth/login',
        '/auth/register',
        '/products',
        '/categories',
        '/about',
        '/contact',
        '/help',
        '/shipping',
        '/returns',
    ]

    // Admin only routes
    const adminRoutes = [
        '/admin',
        '/admin/dashboard',
        '/admin/users',
        '/admin/staff',
        '/admin/products',
        '/admin/orders',
        '/admin/categories',
        '/admin/reports',
        '/admin/settings',
        '/admin/analytics',
    ]

    // Staff routes (Admin + Staff can access)
    const staffRoutes = [
        '/staff',
        '/staff/dashboard',
        '/staff/orders',
        '/staff/customers',
        '/staff/products',
        '/staff/support',
        '/staff/reports',
    ]

    // User/Customer routes (All authenticated users can access)
    const userRoutes = [
        '/user',
        '/user/dashboard',
        '/user/profile',
        '/user/orders',
        '/user/addresses',
        '/cart',
        '/checkout',
        '/wishlist',
        '/account',
    ]

    // API routes that need authentication
    const protectedApiRoutes = [
        '/api/user',
        '/api/admin',
        '/api/staff',
        '/api/orders',
        '/api/cart',
    ]

    // Check if it's a public route
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    // Check if it's an API route
    const isApiRoute = pathname.startsWith('/api/')

    // Check if it's a protected API route
    const isProtectedApiRoute = protectedApiRoutes.some(route =>
        pathname.startsWith(route)
    )

    // Allow public routes and NextAuth routes
    if (isPublicRoute || pathname.startsWith('/auth/') || pathname.startsWith('/_next/')) {
        return NextResponse.next()
    }

    // Handle API routes
    if (isApiRoute) {
        // If it's a protected API route and no token, return 401
        if (isProtectedApiRoute && !token) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: 'Authentication required'
                }),
                {
                    status: 401,
                    headers: { 'content-type': 'application/json' }
                }
            )
        }
        return NextResponse.next()
    }

    // If no token and not a public route, redirect to login
    if (!token) {
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('callbackUrl', request.url)
        return NextResponse.redirect(loginUrl)
    }

    // Role-based access control for Direct Selling Company
    const userRole = token.role

    // Check admin routes (Admin only)
    if (adminRoutes.some(route => pathname.startsWith(route))) {
        if (userRole !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // Check staff routes (Admin + Staff can access)
    if (staffRoutes.some(route => pathname.startsWith(route))) {
        if (!['admin', 'staff'].includes(userRole)) {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // Check user routes (All authenticated users can access)
    if (userRoutes.some(route => pathname.startsWith(route))) {
        if (!['admin', 'staff', 'user'].includes(userRole)) {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // Add security headers for Nayea.id
    const response = NextResponse.next()

    // Islamic blessing header
    response.headers.set('X-Islamic-Blessing', 'Bismillahirrahmanirrahim')
    response.headers.set('X-Company', 'Nayea.id Direct Selling')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
} 