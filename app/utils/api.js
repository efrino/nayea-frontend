// app/utils/api.js - API Service Functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'

// Base API client
class ApiClient {
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        }

        // Add authentication token if available
        const token = this.getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        try {
            const response = await fetch(url, config)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'API request failed')
            }

            return data
        } catch (error) {
            console.error('API Error:', error)
            throw error
        }
    }

    getToken() {
        // Get token from cookies or localStorage
        const cookies = document.cookie.split(';')
        const tokenCookie = cookies.find(cookie =>
            cookie.trim().startsWith('next-auth.session-token=') ||
            cookie.trim().startsWith('__Secure-next-auth.session-token=')
        )
        return tokenCookie ? tokenCookie.split('=')[1] : null
    }

    // HTTP Methods
    get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString()
        const url = queryString ? `${endpoint}?${queryString}` : endpoint
        return this.request(url, { method: 'GET' })
    }

    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' })
    }
}

// Create API client instance
const apiClient = new ApiClient()

// Products API
export const productsApi = {
    getAll: (params = {}) => apiClient.get('/products', params),
    getFeatured: (limit = 6) => apiClient.get('/products', { is_featured: true, status: 'active', limit }),
    getById: (id) => apiClient.get(`/products/${id}`),
    getByCategory: (categoryId, params = {}) => apiClient.get('/products', { category_id: categoryId, ...params }),
    search: (query, params = {}) => apiClient.get('/products', { search: query, ...params }),
}

// Categories API
export const categoriesApi = {
    getAll: (params = {}) => apiClient.get('/categories', params),
    getById: (id) => apiClient.get(`/categories/${id}`),
    getProducts: (slug, params = {}) => apiClient.get(`/categories/${slug}/products`, params),
}

// Cart API
export const cartApi = {
    getItems: () => apiClient.get('/cart'),
    addItem: (data) => apiClient.post('/cart', data),
    updateItem: (id, data) => apiClient.put(`/cart/${id}`, data),
    removeItem: (id) => apiClient.delete(`/cart/${id}`),
    clear: () => apiClient.delete('/cart'),
}

// Orders API
export const ordersApi = {
    getAll: (params = {}) => apiClient.get('/orders', params),
    getById: (id) => apiClient.get(`/orders/${id}`),
    create: (data) => apiClient.post('/orders', data),
    update: (id, data) => apiClient.put(`/orders/${id}`, data),
    cancel: (id) => apiClient.delete(`/orders/${id}`),
}

// Users API
export const usersApi = {
    getProfile: () => apiClient.get('/users/profile'),
    updateProfile: (data) => apiClient.put('/users/profile', data),
    getAddresses: () => apiClient.get('/users/addresses'),
    addAddress: (data) => apiClient.post('/users/addresses', data),
    updateAddress: (id, data) => apiClient.put(`/users/addresses/${id}`, data),
    deleteAddress: (id) => apiClient.delete(`/users/addresses/${id}`),
}

// Wishlist API
export const wishlistApi = {
    getItems: () => apiClient.get('/wishlist'),
    addItem: (productId) => apiClient.post('/wishlist', { product_id: productId }),
    removeItem: (productId) => apiClient.delete(`/wishlist/${productId}`),
}

// app/utils/helpers.js - Helper Functions
export const formatPrice = (price, currency = 'IDR') => {
    if (typeof price !== 'number') {
        price = parseFloat(price) || 0
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price)
}

export const formatNumber = (number) => {
    if (typeof number !== 'number') {
        number = parseFloat(number) || 0
    }

    return new Intl.NumberFormat('id-ID').format(number)
}

export const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    }

    return new Intl.DateTimeFormat('id-ID', defaultOptions).format(new Date(date))
}

export const calculateDiscount = (originalPrice, discountPrice) => {
    if (!discountPrice || discountPrice >= originalPrice) return 0
    return Math.round((1 - discountPrice / originalPrice) * 100)
}

export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

export const generateSlug = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export const getImageUrl = (imagePath, fallback = '/images/placeholder.jpg') => {
    if (!imagePath) return fallback
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}${imagePath}`
}

export const debounce = (func, wait, immediate) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            timeout = null
            if (!immediate) func(...args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func(...args)
    }
}

export const throttle = (func, limit) => {
    let inThrottle
    return function () {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

// app/utils/islamic.js - Islamic Utilities
export const islamicGreetings = {
    assalamualaikum: 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم',
    alhamdulillah: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِين',
    subhanallah: 'سُبْحَانَ اللَّهِ',
    mashaallah: 'مَا شَاءَ اللَّهُ',
    barakallahu: 'بَارَكَ اللَّهُ فِيكَ',
    jazakallahu: 'جَزَاكُمُ اللهُ خَيْرًا'
}

export const islamicTranslations = {
    'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ': 'Peace be upon you and Allah\'s mercy and blessings',
    'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم': 'In the name of Allah, the Most Gracious, the Most Merciful',
    'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِين': 'Praise be to Allah, Lord of the worlds',
    'جَزَاكُمُ اللهُ خَيْرًا': 'May Allah reward you with good',
    'بَارَكَ اللَّهُ فِيكَ': 'May Allah bless you'
}

export const getRandomIslamicBlessing = () => {
    const blessings = Object.keys(islamicGreetings)
    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)]
    return {
        arabic: islamicGreetings[randomBlessing],
        translation: islamicTranslations[islamicGreetings[randomBlessing]] || randomBlessing
    }
}

// app/utils/storage.js - Storage Utilities
export const localStorage = {
    get: (key, defaultValue = null) => {
        if (typeof window === 'undefined') return defaultValue
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : defaultValue
        } catch (error) {
            console.error('Error reading from localStorage:', error)
            return defaultValue
        }
    },

    set: (key, value) => {
        if (typeof window === 'undefined') return
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error('Error writing to localStorage:', error)
        }
    },

    remove: (key) => {
        if (typeof window === 'undefined') return
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.error('Error removing from localStorage:', error)
        }
    },

    clear: () => {
        if (typeof window === 'undefined') return
        try {
            window.localStorage.clear()
        } catch (error) {
            console.error('Error clearing localStorage:', error)
        }
    }
}

// app/utils/validation.js - Validation Utilities
export const validators = {
    email: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    },

    phone: (phone) => {
        const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
        return phoneRegex.test(phone.replace(/\s/g, ''))
    },

    password: (password) => {
        return password.length >= 8
    },

    required: (value) => {
        return value !== null && value !== undefined && value.toString().trim() !== ''
    },

    minLength: (value, min) => {
        return value && value.length >= min
    },

    maxLength: (value, max) => {
        return !value || value.length <= max
    },

    numeric: (value) => {
        return !isNaN(value) && !isNaN(parseFloat(value))
    }
}

export default apiClient