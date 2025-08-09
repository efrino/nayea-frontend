// app/api/auth/register/route.js
import { NextResponse } from 'next/server'
import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api'

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, password } = body

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, message: 'Semua field harus diisi' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: 'Password minimal 6 karakter' },
                { status: 400 }
            )
        }

        // Send registration data to backend
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            name,
            email,
            password,
            role: 'customer' // Default role
        })

        if (response.data.success) {
            return NextResponse.json({
                success: true,
                message: 'Pendaftaran berhasil',
                user: response.data.user
            })
        } else {
            return NextResponse.json(
                { success: false, message: response.data.message || 'Gagal mendaftar' },
                { status: 400 }
            )
        }
    } catch (error) {
        console.error('Registration error:', error)

        if (error.response?.data?.message) {
            return NextResponse.json(
                { success: false, message: error.response.data.message },
                { status: error.response.status || 400 }
            )
        }

        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}
