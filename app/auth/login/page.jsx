// app/auth/login/page.jsx
import LoginClient from './LoginClient'

export default function Page({ searchParams }) {
    // searchParams di App Router adalah plain object: access like searchParams.callbackUrl
    const callbackUrl = (searchParams && searchParams.callbackUrl) || '/'

    return <LoginClient initialCallbackUrl={callbackUrl} />
}
