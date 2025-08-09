// app/dashboard/page.js - Unified Dashboard dengan Permission System
'use client'

import { useAuth, PermissionGate, ActionButton } from '../auth-guard'
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    BarChart3,
    Settings,
    Heart,
    ShoppingCart,
    Package,
    HeadphonesIcon,
    TrendingUp,
    UserCheck,
    Star,
    Plus,
    Eye,
    Edit
} from 'lucide-react'

// Unified Stats Component - Shows different stats based on permissions
const DashboardStats = () => {
    const { role, canRead } = useAuth()

    const allStats = [
        {
            title: 'Users',
            value: '2,847',
            icon: Users,
            color: 'blue',
            resource: 'users',
            link: '/users'
        },
        {
            title: 'Orders',
            value: '1,234',
            icon: ShoppingBag,
            color: 'green',
            resource: 'orders',
            link: '/orders'
        },
        {
            title: 'Products',
            value: '586',
            icon: Package,
            color: 'purple',
            resource: 'products',
            link: '/products'
        },
        {
            title: 'Revenue',
            value: 'Rp 45.2M',
            icon: TrendingUp,
            color: 'orange',
            resource: 'reports',
            link: '/reports'
        },
        {
            title: 'Support Tickets',
            value: '23',
            icon: HeadphonesIcon,
            color: 'red',
            resource: 'support',
            link: '/support'
        },
        {
            title: 'Wishlist Items',
            value: '15',
            icon: Heart,
            color: 'pink',
            resource: 'wishlist',
            link: '/wishlist'
        }
    ]

    // Filter stats based on permissions
    const visibleStats = allStats.filter(stat => canRead(stat.resource))

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleStats.map((stat) => (
                <a
                    key={stat.title}
                    href={stat.link}
                    className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                            <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                        </div>
                    </div>
                </a>
            ))}
        </div>
    )
}

// Unified Quick Actions - Shows different actions based on permissions
const QuickActions = () => {
    const { role } = useAuth()

    const actions = [
        {
            title: 'Product Management',
            description: 'Manage your Islamic fashion products',
            resource: 'products',
            actions: [
                { label: 'View Products', action: 'read', link: '/products', variant: 'default' },
                { label: 'Add Product', action: 'create', link: '/products/create', variant: 'primary' },
                { label: 'Edit Product', action: 'update', link: '/products', variant: 'default' }
            ]
        },
        {
            title: 'Order Management',
            description: 'Handle customer orders',
            resource: 'orders',
            actions: [
                { label: 'View Orders', action: 'read', link: '/orders', variant: 'default' },
                { label: 'Create Order', action: 'create', link: '/orders/create', variant: 'primary' },
                { label: 'Update Order', action: 'update', link: '/orders', variant: 'default' }
            ]
        },
        {
            title: 'User Management',
            description: 'Manage users and customers',
            resource: 'users',
            actions: [
                { label: 'View Users', action: 'read', link: '/users', variant: 'default' },
                { label: 'Add User', action: 'create', link: '/users/create', variant: 'primary' },
                { label: 'Edit Users', action: 'update', link: '/users', variant: 'default' }
            ]
        },
        {
            title: 'Customer Support',
            description: 'Help customers with their inquiries',
            resource: 'support',
            actions: [
                { label: 'View Tickets', action: 'read', link: '/support', variant: 'default' },
                { label: 'Create Ticket', action: 'create', link: '/support/create', variant: 'primary' },
                { label: 'Update Ticket', action: 'update', link: '/support', variant: 'default' }
            ]
        },
        {
            title: 'Reports & Analytics',
            description: 'View business insights',
            resource: 'reports',
            actions: [
                { label: 'View Reports', action: 'read', link: '/reports', variant: 'default' },
                { label: 'Create Report', action: 'create', link: '/reports/create', variant: 'primary' }
            ]
        },
        {
            title: 'Shopping',
            description: 'Personal shopping experience',
            resource: 'cart',
            actions: [
                { label: 'View Cart', action: 'read', link: '/cart', variant: 'default' },
                { label: 'View Wishlist', action: 'read', link: '/wishlist', variant: 'default' },
                { label: 'Continue Shopping', action: 'read', link: '/shop', variant: 'primary' }
            ]
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map((section) => (
                <PermissionGate key={section.title} resource={section.resource} action="read">
                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-900">{section.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                        </div>

                        <div className="space-y-2">
                            {section.actions.map((actionItem) => (
                                <ActionButton
                                    key={actionItem.label}
                                    resource={section.resource}
                                    action={actionItem.action}
                                    variant={actionItem.variant}
                                    onClick={() => window.location.href = actionItem.link}
                                    className="w-full justify-start text-sm"
                                >
                                    {actionItem.label}
                                </ActionButton>
                            ))}
                        </div>
                    </div>
                </PermissionGate>
            ))}
        </div>
    )
}

// Role-based Welcome Header
const WelcomeHeader = () => {
    const { user, role } = useAuth()

    const roleConfig = {
        admin: {
            title: 'Admin Dashboard',
            subtitle: 'Complete system control',
            blessing: 'بارك الله فيك - May Allah bless you',
            gradient: 'from-blue-600 to-purple-600',
            icon: LayoutDashboard
        },
        staff: {
            title: 'Staff Dashboard',
            subtitle: 'Manage operations efficiently',
            blessing: 'جزاك الله خيرا - May Allah reward you with good',
            gradient: 'from-emerald-600 to-teal-600',
            icon: UserCheck
        },
        user: {
            title: 'My Dashboard',
            subtitle: 'Your Islamic fashion journey',
            blessing: 'أهلا وسهلا - Welcome to Islamic fashion',
            gradient: 'from-pink-500 to-rose-500',
            icon: Heart
        }
    }

    const config = roleConfig[role] || roleConfig.user
    const Icon = config.icon

    return (
        <div className={`bg-gradient-to-r ${config.gradient} rounded-xl p-6 text-white mb-8`}>
            <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                    <Icon className="h-8 w-8" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{config.title}</h1>
                    <p className="text-white/90">
                        Assalamu'alaikum, {user?.name} - {config.subtitle}
                    </p>
                    <p className="text-sm text-white/80 mt-1">{config.blessing}</p>
                </div>
            </div>
        </div>
    )
}

// Recent Activity Component - Shows activities based on permissions
const RecentActivity = () => {
    const { canRead } = useAuth()

    const activities = [
        {
            message: 'New user registered',
            time: '2 min ago',
            resource: 'users'
        },
        {
            message: 'Product updated',
            time: '5 min ago',
            resource: 'products'
        },
        {
            message: 'Order completed',
            time: '10 min ago',
            resource: 'orders'
        },
        {
            message: 'Support ticket resolved',
            time: '15 min ago',
            resource: 'support'
        },
        {
            message: 'New product added to wishlist',
            time: '20 min ago',
            resource: 'wishlist'
        }
    ]

    const visibleActivities = activities.filter(activity =>
        canRead(activity.resource)
    )

    if (visibleActivities.length === 0) {
        return null
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
                {visibleActivities.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">{activity.message}</span>
                        <span className="text-gray-400 text-xs">{activity.time}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Main Unified Dashboard Component
export default function UnifiedDashboard() {
    const { isLoading, isAuthenticated } = useAuth()

    if (isLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Welcome Header - Role based */}
                <WelcomeHeader />

                {/* Dashboard Stats - Permission based */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Overview</h2>
                    <DashboardStats />
                </div>

                {/* Quick Actions Grid - Permission based */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <QuickActions />
                </div>

                {/* Recent Activity - Permission based */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <RecentActivity />
                    </div>

                    {/* Islamic Quote */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border-l-4 border-emerald-500">
                        <div className="text-center">
                            <p className="text-lg font-arabic text-emerald-700 mb-2">
                                وَمَنْ تَوَكَّلَ عَلَى اللَّهِ فَهُوَ حَسْبُهُ
                            </p>
                            <p className="text-sm text-gray-600 italic">
                                "And whoever relies upon Allah - then He is sufficient for him"
                            </p>
                            <p className="text-xs text-gray-500 mt-1">QS. At-Talaq: 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Example: Products Page dengan Permission System
/*
// app/products/page.js
'use client'

import { useAuth, PermissionGate, ActionButton } from '../auth-guard'

export default function ProductsPage() {
    const { canRead, canCreate, canUpdate, canDelete } = useAuth()
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                
                <ActionButton 
                    resource="products" 
                    action="create"
                    variant="primary"
                    onClick={() => window.location.href = '/products/create'}
                >
                    Add New Product
                </ActionButton>
            </div>

            // Product list dengan conditional actions
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow p-6">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        
                        <div className="flex space-x-2 mt-4">
                            <ActionButton 
                                resource="products" 
                                action="read"
                                variant="default"
                                onClick={() => viewProduct(product.id)}
                            >
                                View
                            </ActionButton>
                            
                            <ActionButton 
                                resource="products" 
                                action="update"
                                variant="default"
                                onClick={() => editProduct(product.id)}
                            >
                                Edit
                            </ActionButton>
                            
                            <ActionButton 
                                resource="products" 
                                action="delete"
                                variant="danger"
                                onClick={() => deleteProduct(product.id)}
                            >
                                Delete
                            </ActionButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
*/