/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,mdx}',
        './components/**/*.{js,jsx,mdx}',
    ],
    theme: {
        extend: {
            // Islamic Color Palette
            colors: {
                // Primary Islamic Colors
                islamic: {
                    green: {
                        50: '#f0fdf4',
                        100: '#dcfce7',
                        200: '#bbf7d0',
                        300: '#86efac',
                        400: '#4ade80',
                        500: '#22c55e',
                        600: '#16a34a',
                        700: '#15803d',
                        800: '#166534',
                        900: '#14532d',
                    },
                    gold: {
                        50: '#fffbeb',
                        100: '#fef3c7',
                        200: '#fde68a',
                        300: '#fcd34d',
                        400: '#fbbf24',
                        500: '#f59e0b',
                        600: '#d97706',
                        700: '#b45309',
                        800: '#92400e',
                        900: '#78350f',
                    },
                    blue: {
                        50: '#eff6ff',
                        100: '#dbeafe',
                        200: '#bfdbfe',
                        300: '#93c5fd',
                        400: '#60a5fa',
                        500: '#3b82f6',
                        600: '#2563eb',
                        700: '#1d4ed8',
                        800: '#1e40af',
                        900: '#1e3a8a',
                    },
                    neutral: {
                        50: '#fafafa',
                        100: '#f5f5f5',
                        200: '#e5e5e5',
                        300: '#d4d4d4',
                        400: '#a3a3a3',
                        500: '#737373',
                        600: '#525252',
                        700: '#404040',
                        800: '#262626',
                        900: '#171717',
                    }
                },
                // Role-based colors
                admin: '#dc2626',
                seller: '#7c3aed',
                customer: '#059669',
            },

            // Islamic Typography
            fontFamily: {
                arabic: ['Amiri', 'serif'],
                quran: ['Scheherazade New', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },

            // Islamic Layout
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },

            // Islamic Animations
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'slide-down': 'slideDown 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'bounce-gentle': 'bounceGentle 2s infinite',
                'prayer-pulse': 'prayerPulse 3s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                prayerPulse: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                    '50%': { transform: 'scale(1.05)', opacity: '0.8' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
            },

            // Islamic Box Shadows
            boxShadow: {
                'islamic': '0 4px 20px rgba(34, 197, 94, 0.15)',
                'islamic-lg': '0 10px 40px rgba(34, 197, 94, 0.2)',
                'gold': '0 4px 20px rgba(245, 158, 11, 0.15)',
                'prayer': '0 8px 32px rgba(0, 0, 0, 0.1)',
            },

            // Islamic Border Radius
            borderRadius: {
                'islamic': '12px',
                'mosque': '20px',
            },

            // Islamic Gradients
            backgroundImage: {
                'gradient-islamic': 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)',
                'gradient-gold': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                'gradient-prayer': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'islamic-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zM0 30c0-16.569 13.431-30 30-30v60C13.431 60 0 46.569 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            },

            // Container
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    'sm': '640px',
                    'md': '768px',
                    'lg': '1024px',
                    'xl': '1280px',
                    '2xl': '1400px',
                }
            }
        },
    },
    plugins: [
        // Custom Islamic utilities
        function ({ addUtilities, addComponents }) {
            const newUtilities = {
                '.text-arabic': {
                    fontFamily: 'Amiri, serif',
                    direction: 'rtl',
                },
                '.text-quran': {
                    fontFamily: 'Scheherazade New, serif',
                    direction: 'rtl',
                    fontSize: '1.25rem',
                    lineHeight: '2',
                },
                '.islamic-pattern-overlay': {
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zM0 30c0-16.569 13.431-30 30-30v60C13.431 60 0 46.569 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                },
            }

            const newComponents = {
                '.islamic-container': {
                    maxWidth: '1280px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    '@screen sm': {
                        paddingLeft: '1.5rem',
                        paddingRight: '1.5rem',
                    },
                    '@screen lg': {
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                    },
                },
                '.islamic-card': {
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.1)',
                },
                '.text-gradient-islamic': {
                    background: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)',
                    '-webkit-background-clip': 'text',
                    'background-clip': 'text',
                    '-webkit-text-fill-color': 'transparent',
                },
                '.btn-islamic-primary': {
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: '#ffffff',
                    fontWeight: '600',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)',
                    boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(34, 197, 94, 0.4)',
                    },
                },
                '.btn-islamic-secondary': {
                    border: '2px solid #22c55e',
                    color: '#22c55e',
                    backgroundColor: 'transparent',
                    fontWeight: '600',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#22c55e',
                        color: '#ffffff',
                    },
                },
                '.halal-badge': {
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    border: '1px solid #bbf7d0',
                },
                '.syari-badge': {
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: '#dbeafe',
                    color: '#1d4ed8',
                    border: '1px solid #bfdbfe',
                },
                '.role-admin': {
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                },
                '.role-seller': {
                    backgroundColor: '#faf5ff',
                    color: '#7c3aed',
                    border: '1px solid #e9d5ff',
                },
                '.role-customer': {
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    border: '1px solid #a7f3d0',
                },
            }

            addUtilities(newUtilities)
            addComponents(newComponents)
        },
    ],
}