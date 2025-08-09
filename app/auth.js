// app/auth.js - Updated for Direct Selling Model
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api'

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                        email: credentials.email,
                        password: credentials.password
                    })

                    if (response.data.success && response.data.user) {
                        return {
                            id: response.data.user.id,
                            email: response.data.user.email,
                            name: response.data.user.name,
                            role: response.data.user.role, // 'admin', 'staff', or 'user'
                            avatar: response.data.user.avatar,
                            accessToken: response.data.accessToken,
                            refreshToken: response.data.refreshToken,
                            employeeId: response.data.user.employeeId, // For staff
                            department: response.data.user.department, // For staff
                        }
                    }
                    return null
                } catch (error) {
                    console.error('Auth error:', error)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
        signUp: '/auth/register',
        error: '/auth/error',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // Jika login via Google, kirim id_token atau access_token ke backend untuk verifikasi + create/login
            if (account?.provider === 'google') {
                try {
                    const tokenToSend = account.id_token || account.access_token;
                    if (!tokenToSend) {
                        console.error('No id_token or access_token from Google account object', account);
                        return false;
                    }

                    const response = await axios.post(`${API_BASE_URL}/auth/google/verify`, {
                        token: tokenToSend
                    });

                    if (response.data && response.data.success) {
                        // Tambahkan data backend (id, role, dsb) ke user/session
                        user.id = response.data.data.user.id;
                        user.role = response.data.data.user.role || 'user';
                        // Optional: jika backend mengembalikan jwt token, simpan di account/user
                        user.accessToken = response.data.data.token || null;
                        return true;
                    } else {
                        console.error('Backend rejected Google token', response.data);
                        return false;
                    }
                } catch (err) {
                    console.error('Google auth error (frontend->backend):', err.response?.data || err.message);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            // Initial sign in
            if (account && user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    employeeId: user.employeeId,
                    department: user.department,
                }
            }

            // Return previous token if the access token has not expired yet
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    employeeId: token.employeeId,
                    department: token.department,
                },
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            }
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
})
