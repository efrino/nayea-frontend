// app/auth-guard.js - Permission-based CRUD System
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2, Shield, AlertTriangle, Lock, Eye, Edit, Plus, Trash2 } from 'lucide-react'

// ===== PERMISSION MATRIX SYSTEM =====
const PERMISSIONS = {
    // Dashboard permissions
    dashboard: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read', 'update'],
        user: ['read']
    },

    // User management permissions
    users: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read'], // Staff hanya bisa lihat list user
        user: [] // User tidak bisa akses user management
    },

    // Product management permissions
    products: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read', 'create', 'update'], // Staff tidak bisa delete
        user: ['read'] // User hanya bisa lihat produk
    },

    // Order management permissions
    orders: {
        admin: ['read', 'create', 'update', 'delete'], // Admin bisa manage semua order
        staff: ['read', 'update'], // Staff bisa lihat dan update order
        user: ['read', 'create'] // User bisa lihat order mereka dan create new order
    },

    // Category management permissions  
    categories: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read', 'create', 'update'],
        user: ['read']
    },

    // Reports & Analytics permissions
    reports: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read'], // Staff hanya bisa lihat report
        user: [] // User tidak bisa akses reports
    },

    analytics: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read'],
        user: []
    },

    // Settings permissions
    settings: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read'], // Staff hanya bisa lihat settings
        user: ['read'] // User bisa lihat beberapa settings (profil, dll)
    },

    // Customer service permissions
    support: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read', 'create', 'update'], // Staff handle customer support
        user: ['read', 'create'] // User bisa create ticket dan lihat ticket mereka
    },

    customers: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read', 'update'], // Staff bisa lihat dan update customer info
        user: [] // User tidak bisa akses customer management
    },

    // Personal data permissions
    profile: {
        admin: ['read', 'update'], // Admin bisa edit profile mereka
        staff: ['read', 'update'], // Staff bisa edit profile mereka  
        user: ['read', 'update'] // User bisa edit profile mereka
    },

    addresses: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read', 'create', 'update', 'delete'],
        user: ['read', 'create', 'update', 'delete'] // Semua bisa manage address mereka
    },

    // Shopping permissions
    cart: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read', 'create', 'update', 'delete'],
        user: ['read', 'create', 'update', 'delete']
    },

    wishlist: {
        admin: ['read', 'create', 'update', 'delete'],
        staff: ['read', 'create', 'update', 'delete'],
        user: ['read', 'create', 'update', 'delete']
    },

    checkout: {
        admin: ['read', 'create', 'update'],
        staff: ['read', 'create', 'update'],
        user: ['read', 'create', 'update']
    }
}

// Islamic Loading Component
const IslamicLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center space-y-6">
            <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-6 w-6 bg-emerald-600 rounded-full animate-pulse" />
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-2xl font-arabic text-emerald-700">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                </p>
                <p className="text-sm text-gray-600">Loading your Islamic fashion experience...</p>
            </div>
        </div>
    </div>
)

// Permission Denied Component
const PermissionDenied = ({ action, resource, userRole }) => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-md mx-auto text-center space-y-6 p-8">
            <div className="relative">
                <Lock className="h-16 w-16 text-red-500 mx-auto" />
                <Shield className="h-8 w-8 text-red-600 absolute -top-2 -right-2" />
            </div>

            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-red-700">Akses Ditolak</h1>
                <p className="text-gray-600">
                    Anda tidak memiliki izin untuk melakukan aksi ini.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
                    <div className="space-y-2">
                        <p><span className="font-semibold">Role Anda:</span> {userRole || 'Guest'}</p>
                        <p><span className="font-semibold">Aksi:</span> {action}</p>
                        <p><span className="font-semibold">Resource:</span> {resource}</p>
                    </div>
                </div>

                <div className="text-sm text-gray-500 italic">
                    "Dan Allah lebih mengetahui apa yang tersembunyi" - QS. An-Nur: 19
                </div>
            </div>

            <div className="flex flex-col space-y-3">
                <button
                    onClick={() => window.history.back()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                    Kembali
                </button>
                <a
                    href="/dashboard"
                    className="text-emerald-600 hover:text-emerald-700 text-sm underline"
                >
                    Ke Dashboard
                </a>
            </div>
        </div>
    </div>
)

// Main Auth Guard Component (Simplified - hanya cek authentication)
export default function AuthGuard({
    children,
    requireAuth = true,
    fallbackUrl = '/login'
}) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            if (!requireAuth) {
                setIsLoading(false)
                return
            }

            if (status === 'loading') {
                return
            }

            if (status === 'unauthenticated' && requireAuth) {
                const callbackUrl = window.location.pathname
                router.push(`${fallbackUrl}?callbackUrl=${encodeURIComponent(callbackUrl)}`)
                return
            }

            setIsLoading(false)
        }

        checkAuth()
    }, [session, status, requireAuth, router, fallbackUrl])

    if (isLoading || status === 'loading') {
        return <IslamicLoader />
    }

    if (requireAuth && status === 'unauthenticated') {
        return <IslamicLoader />
    }

    return children
}

// ===== PERMISSION HOOKS & COMPONENTS =====

// Hook untuk checking permissions
export const usePermissions = () => {
    const { data: session } = useSession()
    const role = session?.user?.role || 'user'

    const hasPermission = (resource, action) => {
        const resourcePermissions = PERMISSIONS[resource]
        if (!resourcePermissions) return false

        const rolePermissions = resourcePermissions[role]
        if (!rolePermissions) return false

        return rolePermissions.includes(action)
    }

    const canRead = (resource) => hasPermission(resource, 'read')
    const canCreate = (resource) => hasPermission(resource, 'create')
    const canUpdate = (resource) => hasPermission(resource, 'update')
    const canDelete = (resource) => hasPermission(resource, 'delete')

    const getPermissions = (resource) => {
        const resourcePermissions = PERMISSIONS[resource]
        if (!resourcePermissions) return []

        return resourcePermissions[role] || []
    }

    return {
        role,
        hasPermission,
        canRead,
        canCreate,
        canUpdate,
        canDelete,
        getPermissions
    }
}

// Component untuk conditional rendering berdasarkan permission
export const PermissionGate = ({
    resource,
    action,
    children,
    fallback = null,
    showDenied = false
}) => {
    const { hasPermission, role } = usePermissions()

    if (hasPermission(resource, action)) {
        return children
    }

    if (showDenied) {
        return <PermissionDenied action={action} resource={resource} userRole={role} />
    }

    return fallback
}

// Action Button Components dengan built-in permission check
export const ActionButton = ({
    resource,
    action,
    onClick,
    children,
    className = "",
    variant = "default",
    ...props
}) => {
    const { hasPermission } = usePermissions()

    if (!hasPermission(resource, action)) {
        return null
    }

    const baseClass = "inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors"
    const variants = {
        default: "bg-gray-100 hover:bg-gray-200 text-gray-700",
        primary: "bg-emerald-600 hover:bg-emerald-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white"
    }

    const actionIcons = {
        read: Eye,
        create: Plus,
        update: Edit,
        delete: Trash2
    }

    const Icon = actionIcons[action]

    return (
        <button
            onClick={onClick}
            className={`${baseClass} ${variants[variant]} ${className}`}
            {...props}
        >
            {Icon && <Icon className="h-4 w-4 mr-2" />}
            {children}
        </button>
    )
}

// HOC untuk protect components based on permissions
export const withPermission = (WrappedComponent, resource, action) => {
    return function PermissionProtectedComponent(props) {
        return (
            <PermissionGate resource={resource} action={action} showDenied={true}>
                <WrappedComponent {...props} />
            </PermissionGate>
        )
    }
}

// Auth hook dengan permission info
export const useAuth = () => {
    const { data: session, status } = useSession()
    const permissions = usePermissions()

    const isAuthenticated = status === 'authenticated'
    const isLoading = status === 'loading'
    const user = session?.user

    return {
        user,
        isAuthenticated,
        isLoading,
        ...permissions
    }
}

// ===== USAGE EXAMPLES =====
/*
// 1. Basic permission check in component
import { usePermissions, PermissionGate, ActionButton } from './auth-guard'

function ProductsPage() {
    const { canCreate, canUpdate, canDelete } = usePermissions()
    
    return (
        <div>
            <h1>Products</h1>
            
            // Conditional rendering
            {canCreate('products') && (
                <button>Add New Product</button>
            )}
            
            // Using PermissionGate
            <PermissionGate resource="products" action="create">
                <button>Add Product</button>
            </PermissionGate>
            
            // Using ActionButton (dengan built-in permission check)
            <ActionButton 
                resource="products" 
                action="create" 
                variant="primary"
                onClick={() => console.log('Create product')}
            >
                Add Product
            </ActionButton>
            
            <ActionButton 
                resource="products" 
                action="delete" 
                variant="danger"
                onClick={() => console.log('Delete product')}
            >
                Delete
            </ActionButton>
        </div>
    )
}

// 2. Protect entire component
const AdminOnlyComponent = withPermission(MyComponent, 'users', 'delete')

// 3. Check multiple permissions
function OrdersPage() {
    const { getPermissions } = usePermissions()
    const orderPermissions = getPermissions('orders')
    
    return (
        <div>
            <h1>Orders</h1>
            {orderPermissions.includes('create') && <button>New Order</button>}
            {orderPermissions.includes('update') && <button>Edit Order</button>}
        </div>
    )
}
*/