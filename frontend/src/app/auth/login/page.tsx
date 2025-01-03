'use client'
import LoginForm from "@/components/auth/login/LoginForm"
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import AuthContext from "@/context/auth-context";
import { loginAPI } from '@/services/auth';
import { setAccessToken } from '@/cookie';
import type { ILoginForm } from '@/services/auth/register-request'

export default function Login() {
    const ctx = useContext(AuthContext);
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    async function login(payload: ILoginForm) {
        try {
            setLoading(true)
            const { data } = await loginAPI(payload)
            setAccessToken(data.access_token)
            ctx.setIsLoggedIn(true)
            router.push('/dashboard/commission')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="text-center">
            <div>Login Form</div>
            <div className="flex items-start justify-center">
                <LoginForm loading={loading} submit={login} />
            </div>
        </div>
    )
}