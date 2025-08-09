// app/components/ui/Button.jsx - Reusable Button Component
'use client'

import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    icon: Icon,
    ...props
}, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500',
        outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
        success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
        islamic: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 transform hover:scale-105 shadow-md hover:shadow-lg'
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-4 py-2 text-sm rounded-lg',
        lg: 'px-6 py-3 text-base rounded-lg',
        xl: 'px-8 py-4 text-lg rounded-xl'
    }

    const isDisabled = disabled || loading

    return (
        <button
            ref={ref}
            disabled={isDisabled}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : Icon ? (
                <Icon className="h-4 w-4 mr-2" />
            ) : null}
            {children}
        </button>
    )
})

Button.displayName = 'Button'

// app/components/ui/Input.jsx - Reusable Input Component
export const Input = forwardRef(({
    label,
    error,
    helper,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative">
                {LeftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LeftIcon className="h-5 w-5 text-gray-400" />
                    </div>
                )}

                <input
                    ref={ref}
                    className={`input-islamic ${LeftIcon ? 'pl-10' : ''} ${RightIcon ? 'pr-10' : ''} ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                        } ${className}`}
                    {...props}
                />

                {RightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <RightIcon className="h-5 w-5 text-gray-400" />
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {helper && !error && (
                <p className="text-sm text-gray-500">{helper}</p>
            )}
        </div>
    )
})

Input.displayName = 'Input'

// app/components/ui/LoadingSpinner.jsx - Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12'
    }

    return (
        <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-emerald-600 ${sizes[size]} ${className}`} />
    )
}

// app/components/ui/Badge.jsx - Badge Component
export const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full'

    const variants = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-emerald-100 text-emerald-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        featured: 'bg-emerald-600 text-white',
        sale: 'bg-red-600 text-white',
        new: 'bg-blue-600 text-white'
    }

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base'
    }

    return (
        <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </span>
    )
}

// app/components/ui/Modal.jsx - Modal Component
export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    if (!isOpen) return null

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl'
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className={`relative bg-white rounded-xl shadow-xl w-full ${sizes[size]} transform transition-all`}>
                    {/* Header */}
                    {title && (
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Button