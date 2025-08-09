// app/admin/staff/page.jsx - Staff Management for Admin
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Users,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    UserCheck,
    UserX,
    Mail,
    Phone,
    Calendar,
    Award,
    AlertCircle,
    CheckCircle
} from 'lucide-react'

export default function StaffManagementPage() {
    const [staff, setStaff] = useState([])
    const [filteredStaff, setFilteredStaff] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [showAddModal, setShowAddModal] = useState(false)

    // Mock staff data
    const mockStaff = [
        {
            id: 'STF001',
            name: 'Ahmad Fauzi Hidayat',
            email: 'ahmad.fauzi@nayea.id',
            phone: '+62 812-3456-7891',
            department: 'Customer Service',
            position: 'Senior CS',
            joinDate: '2023-01-15',
            status: 'active',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            performance: 92,
            ordersHandled: 156,
            responseTime: 2.3
        },
        {
            id: 'STF002',
            name: 'Siti Nurhaliza Putri',
            email: 'siti.nurhaliza@nayea.id',
            phone: '+62 812-3456-7892',
            department: 'Product Management',
            position: 'Product Specialist',
            joinDate: '2023-03-10',
            status: 'active',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ab?w=100&h=100&fit=crop&crop=face',
            performance: 88,
            ordersHandled: 89,
            responseTime: 1.8
        },
        {
            id: 'STF003',
            name: 'Muhammad Rizki Rahman',
            email: 'muhammad.rizki@nayea.id',
            phone: '+62 812-3456-7893',
            department: 'Logistics',
            position: 'Logistics Coordinator',
            joinDate: '2022-11-20',
            status: 'active',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            performance: 95,
            ordersHandled: 234,
            responseTime: 3.1
        },
        {
            id: 'STF004',
            name: 'Fatma Wati Sari',
            email: 'fatma.wati@nayea.id',
            phone: '+62 812-3456-7894',
            department: 'Customer Service',
            position: 'Junior CS',
            joinDate: '2024-01-08',
            status: 'active',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            performance: 78,
            ordersHandled: 67,
            responseTime: 4.2
        },
        {
            id: 'STF005',
            name: 'Dedi Hermawan',
            email: 'dedi.hermawan@nayea.id',
            phone: '+62 812-3456-7895',
            department: 'Logistics',
            position: 'Warehouse Staff',
            joinDate: '2023-06-15',
            status: 'inactive',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
            performance: 0,
            ordersHandled: 0,
            responseTime: 0
        }
    ]

    const departments = ['Customer Service', 'Product Management', 'Logistics', 'Marketing', 'Finance']

    useEffect(() => {
        setStaff(mockStaff)
        setFilteredStaff(mockStaff)
    }, [])

    useEffect(() => {
        let filtered = staff

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(s =>
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.id.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Filter by department
        if (selectedDepartment !== 'all') {
            filtered = filtered.filter(s => s.department === selectedDepartment)
        }

        // Filter by status
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(s => s.status === selectedStatus)
        }

        setFilteredStaff(filtered)
    }, [searchQuery, selectedDepartment, selectedStatus, staff])

    const getPerformanceColor = (performance) => {
        if (performance >= 90) return 'text-green-600 bg-green-100'
        if (performance >= 80) return 'text-blue-600 bg-blue-100'
        if (performance >= 70) return 'text-yellow-600 bg-yellow-100'
        return 'text-red-600 bg-red-100'
    }

    const getStatusColor = (status) => {
        return status === 'active'
            ? 'text-green-600 bg-green-100'
            : 'text-red-600 bg-red-100'
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="islamic-container py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Manajemen Staff Nayea.id</h1>
                            <p className="text-gray-600 mt-1">
                                Kelola karyawan dan tim internal Nayea.id
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn-islamic-primary inline-flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Staff
                        </button>
                    </div>
                </div>
            </div>

            <div className="islamic-container py-8">
                {/* Islamic Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-islamic p-6 rounded-islamic text-white mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="arabic-text text-xl mb-2">وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى</p>
                            <p className="opacity-90">Dan tolong-menolonglah dalam kebaikan dan takwa. Mari bekerja sama membangun tim yang solid</p>
                        </div>
                        <div className="text-4xl">👥</div>
                    </div>
                </motion.div>

                {/* Filters */}
                <div className="bg-white rounded-islamic shadow-islamic p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari staff..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-islamic-green-400 focus:outline-none"
                            />
                        </div>

                        {/* Department Filter */}
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-islamic-green-400 focus:outline-none"
                        >
                            <option value="all">Semua Departemen</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-islamic-green-400 focus:outline-none"
                        >
                            <option value="all">Semua Status</option>
                            <option value="active">Aktif</option>
                            <option value="inactive">Tidak Aktif</option>
                        </select>

                        {/* Stats */}
                        <div className="flex items-center justify-center bg-islamic-green-50 rounded-lg p-2">
                            <Users className="w-5 h-5 text-islamic-green-600 mr-2" />
                            <span className="text-sm font-medium text-islamic-green-700">
                                {filteredStaff.length} Staff
                            </span>
                        </div>
                    </div>
                </div>

                {/* Staff Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStaff.map((staffMember, index) => (
                        <motion.div
                            key={staffMember.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-islamic shadow-islamic hover:shadow-islamic-lg transition-all duration-300"
                        >
                            {/* Card Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={staffMember.avatar}
                                        alt={staffMember.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{staffMember.name}</h3>
                                        <p className="text-sm text-gray-600">{staffMember.position}</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-xs font-medium text-islamic-blue-600 bg-islamic-blue-100 px-2 py-1 rounded-full">
                                                {staffMember.id}
                                            </span>
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ml-2 ${getStatusColor(staffMember.status)}`}>
                                                {staffMember.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    {/* Department */}
                                    <div className="flex items-center text-sm">
                                        <UserCheck className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-gray-600">Departemen:</span>
                                        <span className="font-medium text-gray-900 ml-1">{staffMember.department}</span>
                                    </div>

                                    {/* Contact */}
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm">
                                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-gray-600 truncate">{staffMember.email}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-gray-600">{staffMember.phone}</span>
                                        </div>
                                    </div>

                                    {/* Performance Metrics */}
                                    {staffMember.status === 'active' && (
                                        <div className="space-y-3 pt-3 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Performance</span>
                                                <span className={`text-sm font-medium px-2 py-1 rounded-full ${getPerformanceColor(staffMember.performance)}`}>
                                                    {staffMember.performance}%
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <span className="text-gray-500 block">Orders</span>
                                                    <span className="font-medium text-gray-900">{staffMember.ordersHandled}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 block">Response</span>
                                                    <span className="font-medium text-gray-900">{staffMember.responseTime}m</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Join Date */}
                                    <div className="flex items-center text-sm pt-2 border-t border-gray-100">
                                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-gray-600">Bergabung:</span>
                                        <span className="font-medium text-gray-900 ml-1">
                                            {new Date(staffMember.joinDate).toLocaleDateString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Actions */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex space-x-2">
                                    <button className="p-2 text-gray-600 hover:text-islamic-blue-600 hover:bg-islamic-blue-50 rounded-lg transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-600 hover:text-islamic-green-600 hover:bg-islamic-green-50 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <button className="text-sm text-islamic-green-600 hover:text-islamic-green-700 font-medium">
                                    Detail
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredStaff.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada staff ditemukan</h3>
                        <p className="text-gray-600 mb-6">Coba ubah filter atau tambah staff baru</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn-islamic-primary"
                        >
                            Tambah Staff Pertama
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

// app/staff/orders/page.jsx - Order Processing for Staff
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Package,
    Clock,
    CheckCircle,
    AlertCircle,
    Truck,
    User,
    Phone,
    Mail,
    MapPin,
    Eye,
    Edit,
    MessageCircle,
    Filter,
    Search,
    Calendar
} from 'lucide-react'

export default function StaffOrdersPage() {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [selectedPriority, setSelectedPriority] = useState('all')

    // Mock orders data
    const mockOrders = [
        {
            id: '#NYA-12345',
            customer: {
                name: 'Siti Aisyah Rahman',
                email: 'siti.aisyah@gmail.com',
                phone: '+62 812-9876-5432',
                address: 'Jl. Kebon Sirih No. 123, Jakarta Pusat'
            },
            items: [
                { name: 'Kerudung Premium Voal Syari', qty: 2, price: 89000 },
                { name: 'Mukena Katun Premium', qty: 1, price: 195000 }
            ],
            total: 373000,
            status: 'pending',
            priority: 'high',
            orderDate: '2024-01-15T10:30:00Z',
            deadline: '2024-01-16T15:00:00Z',
            notes: 'Customer urgent request - wedding event',
            assignedTo: 'STF001',
            paymentStatus: 'paid',
            shippingMethod: 'express'
        },
        {
            id: '#NYA-12346',
            customer: {
                name: 'Fatimah Zahra',
                email: 'fatimah.z@yahoo.com',
                phone: '+62 811-2345-6789',
                address: 'Jl. Sudirman No. 456, Bandung'
            },
            items: [
                { name: 'Sajadah Import Turkey Premium', qty: 1, price: 275000 }
            ],
            total: 275000,
            status: 'processing',
            priority: 'medium',
            orderDate: '2024-01-14T14:20:00Z',
            deadline: '2024-01-17T12:00:00Z',
            notes: 'Gift wrapping requested',
            assignedTo: 'STF002',
            paymentStatus: 'paid',
            shippingMethod: 'regular'
        },
        {
            id: '#NYA-12347',
            customer: {
                name: 'Khadijah Muslimah',
                email: 'khadijah.m@hotmail.com',
                phone: '+62 813-4567-8901',
                address: 'Jl. Diponegoro No. 789, Surabaya'
            },
            items: [
                { name: 'Gamis Syari Modern Casual', qty: 2, price: 165000 },
                { name: 'Khimar Pet Antem Premium', qty: 1, price: 125000 }
            ],
            total: 455000,
            status: 'shipped',
            priority: 'low',
            orderDate: '2024-01-13T09:15:00Z',
            deadline: '2024-01-18T10:00:00Z',
            notes: '',
            assignedTo: 'STF001',
            paymentStatus: 'paid',
            shippingMethod: 'regular',
            trackingNumber: 'JP1234567890'
        },
        {
            id: '#NYA-12348',
            customer: {
                name: 'Maryam Salsabila',
                email: 'maryam.s@gmail.com',
                phone: '+62 814-5678-9012',
                address: 'Jl. Malioboro No. 321, Yogyakarta'
            },
            items: [
                { name: 'Jilbab Instan Ceruti Premium', qty: 3, price: 75000 }
            ],
            total: 225000,
            status: 'delivered',
            priority: 'low',
            orderDate: '2024-01-12T16:45:00Z',
            deadline: '2024-01-19T14:00:00Z',
            notes: 'Customer very satisfied',
            assignedTo: 'STF003',
            paymentStatus: 'paid',
            shippingMethod: 'express',
            trackingNumber: 'JP0987654321',
            deliveredAt: '2024-01-15T11:30:00Z'
        }
    ]

    useEffect(() => {
        setOrders(mockOrders)
        setFilteredOrders(mockOrders)
    }, [])

    useEffect(() => {
        let filtered = orders

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(order =>
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Filter by status
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(order => order.status === selectedStatus)
        }

        // Filter by priority
        if (selectedPriority !== 'all') {
            filtered = filtered.filter(order => order.priority === selectedPriority)
        }

        setFilteredOrders(filtered)
    }, [searchQuery, selectedStatus, selectedPriority, orders])

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
            case 'processing': return 'text-blue-600 bg-blue-100 border-blue-200'
            case 'shipped': return 'text-purple-600 bg-purple-100 border-purple-200'
            case 'delivered': return 'text-green-600 bg-green-100 border-green-200'
            default: return 'text-gray-600 bg-gray-100 border-gray-200'
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-100 border-red-200'
            case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
            case 'low': return 'text-green-600 bg-green-100 border-green-200'
            default: return 'text-gray-600 bg-gray-100 border-gray-200'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />
            case 'processing': return <Package className="w-4 h-4" />
            case 'shipped': return <Truck className="w-4 h-4" />
            case 'delivered': return <CheckCircle className="w-4 h-4" />
            default: return <AlertCircle className="w-4 h-4" />
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="islamic-container py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Kelola Pesanan</h1>
                            <p className="text-gray-600 mt-1">
                                Proses dan pantau pesanan customer Nayea.id
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">{filteredOrders.length}</span> pesanan
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="islamic-container py-8">
                {/* Islamic Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-islamic-blue-500 to-islamic-green-500 p-6 rounded-islamic text-white mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="arabic-text text-xl mb-2">إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَن يُتْقِنَهُ</p>
                            <p className="opacity-90">Sesungguhnya Allah menyukai apabila seseorang melakukan pekerjaan dengan itqan (tekun, teliti, dan sempurna)</p>
                        </div>
                        <div className="text-4xl">📦</div>
                    </div>
                </motion.div>

                {/* Filters */}
                <div className="bg-white rounded-islamic shadow-islamic p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari pesanan atau customer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-islamic-green-400 focus:outline-none"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-islamic-green-400 focus:outline-none"
                        >
                            <option value="all">Semua Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Diproses</option>
                            <option value="shipped">Dikirim</option>
                            <option value="delivered">Selesai</option>
                        </select>

                        {/* Priority Filter */}
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-islamic-green-400 focus:outline-none"
                        >
                            <option value="all">Semua Prioritas</option>
                            <option value="high">Prioritas Tinggi</option>
                            <option value="medium">Prioritas Sedang</option>
                            <option value="low">Prioritas Rendah</option>
                        </select>

                        {/* Quick Stats */}
                        <div className="flex items-center justify-center bg-islamic-green-50 rounded-lg p-2">
                            <Package className="w-5 h-5 text-islamic-green-600 mr-2" />
                            <span className="text-sm font-medium text-islamic-green-700">
                                {filteredOrders.filter(o => o.status === 'pending').length} Pending
                            </span>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {filteredOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-islamic shadow-islamic hover:shadow-islamic-lg transition-all duration-300"
                        >
                            {/* Order Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                                        <div className="flex items-center space-x-2">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span className="ml-1 capitalize">{order.status}</span>
                                            </span>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                                                {order.priority === 'high' ? 'Tinggi' :
                                                    order.priority === 'medium' ? 'Sedang' : 'Rendah'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-islamic-green-600">{formatCurrency(order.total)}</p>
                                        <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Content */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Customer Info */}
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                                            <User className="w-4 h-4 mr-2 text-gray-400" />
                                            Informasi Customer
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <p className="font-medium text-gray-900">{order.customer.name}</p>
                                            <div className="flex items-center text-gray-600">
                                                <Mail className="w-4 h-4 mr-2" />
                                                {order.customer.email}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Phone className="w-4 h-4 mr-2" />
                                                {order.customer.phone}
                                            </div>
                                            <div className="flex items-start text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>{order.customer.address}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                                            <Package className="w-4 h-4 mr-2 text-gray-400" />
                                            Item Pesanan
                                        </h4>
                                        <div className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-sm">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-gray-500">Qty: {item.qty}</p>
                                                    </div>
                                                    <p className="font-medium text-gray-900">{formatCurrency(item.price)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Notes */}
                                {order.notes && (
                                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Catatan:</strong> {order.notes}
                                        </p>
                                    </div>
                                )}

                                {/* Tracking Info */}
                                {order.trackingNumber && (
                                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            <strong>Nomor Resi:</strong> {order.trackingNumber}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Order Actions */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Deadline: {formatDate(order.deadline)}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="btn-islamic-secondary text-sm px-3 py-1 inline-flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4" />
                                        Chat Customer
                                    </button>
                                    <button className="btn-islamic-primary text-sm px-3 py-1 inline-flex items-center gap-1">
                                        <Edit className="w-4 h-4" />
                                        Update Status
                                    </button>
                                    <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded-lg inline-flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        Detail
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada pesanan ditemukan</h3>
                        <p className="text-gray-600">Coba ubah filter atau tunggu pesanan baru masuk</p>
                    </div>
                )}
            </div>
        </div>
    )
}