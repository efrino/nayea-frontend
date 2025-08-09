// app/components/index.js - Export semua components (FIXED)
// Hanya export components yang sudah ada

// Main Components
export { default as Navbar } from './Navbar'
export { default as Footer } from './Footer'
export { default as HeroSection } from './HeroSection'
export { default as FeaturedProducts } from './FeaturedProducts'
export { default as ProductCard } from './ProductCard'
export { default as ProfileDropdown } from './ProfileDropdown'

// Layout Components
export { default as Layout } from './Layout'
export { default as DashboardLayout } from './DashboardLayout'

// UI Components (Named exports, bukan default)
export { default as Button } from './ui/Button'
export { Input } from './ui/Button'  // Input di-export dari Button.jsx
export { LoadingSpinner } from './ui/Button'  // LoadingSpinner di-export dari Button.jsx
export { Badge } from './ui/Button'  // Badge di-export dari Button.jsx
export { Modal } from './ui/Button'  // Modal di-export dari Button.jsx

// Islamic Components
export { default as IslamicBlessings } from './islamic/IslamicBlessings'

// Note: Components berikut belum dibuat, comment dulu
// export { default as PrayerTimes } from './islamic/PrayerTimes'
// export { default as SearchBar } from './features/SearchBar'
// export { default as CategoryFilter } from './features/CategoryFilter'
// export { default as ShoppingCart } from './features/ShoppingCart'
// export { default as Wishlist } from './features/Wishlist'