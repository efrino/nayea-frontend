// components/ui/LoadingSkeleton.jsx
'use client'

export default function LoadingSkeleton({ type = 'default', count = 1 }) {
    const renderSkeleton = () => {
        switch (type) {
            case 'hero':
                return (
                    <div className="min-h-screen bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="islamic-container">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="skeleton h-8 w-32" />
                                    <div className="skeleton h-16 w-full" />
                                    <div className="skeleton h-6 w-3/4" />
                                    <div className="skeleton h-12 w-40" />
                                </div>
                                <div className="skeleton h-96 w-full rounded-2xl" />
                            </div>
                        </div>
                    </div>
                )

            case 'products':
                return (
                    <div className="product-grid">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="card animate-pulse">
                                <div className="skeleton-image" />
                                <div className="card-body space-y-3">
                                    <div className="skeleton-text" />
                                    <div className="skeleton-text w-3/4" />
                                    <div className="skeleton h-6 w-20" />
                                    <div className="skeleton h-10 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                )

            case 'categories':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="skeleton h-80 rounded-islamic" />
                        ))}
                    </div>
                )

            case 'testimonials':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <div className="skeleton h-12 w-12" />
                            <div className="skeleton-text" />
                            <div className="skeleton-text" />
                            <div className="skeleton-text w-3/4" />
                            <div className="flex items-center space-x-4">
                                <div className="skeleton-avatar" />
                                <div className="space-y-2">
                                    <div className="skeleton h-4 w-32" />
                                    <div className="skeleton h-3 w-24" />
                                </div>
                            </div>
                        </div>
                        <div className="skeleton h-64 w-64 mx-auto rounded-2xl" />
                    </div>
                )

            case 'newsletter':
                return (
                    <div className="bg-gray-200 rounded-2xl p-8 animate-pulse">
                        <div className="max-w-2xl mx-auto text-center space-y-6">
                            <div className="skeleton h-16 w-16 mx-auto rounded-full" />
                            <div className="skeleton h-8 w-64 mx-auto" />
                            <div className="skeleton h-4 w-96 mx-auto" />
                            <div className="skeleton h-12 w-80 mx-auto rounded-islamic" />
                        </div>
                    </div>
                )

            case 'section':
                return (
                    <div className="py-16 bg-gray-200 animate-pulse">
                        <div className="islamic-container">
                            <div className="text-center mb-12">
                                <div className="skeleton h-10 w-64 mx-auto mb-4" />
                                <div className="skeleton h-4 w-96 mx-auto" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="skeleton h-64 rounded-islamic" />
                                ))}
                            </div>
                        </div>
                    </div>
                )

            default:
                return (
                    <div className="animate-pulse">
                        {[...Array(count)].map((_, i) => (
                            <div key={i} className="skeleton h-4 mb-2" />
                        ))}
                    </div>
                )
        }
    }

    return renderSkeleton()
}