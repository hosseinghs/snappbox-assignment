import LoginForm from "@/components/auth/login/LoginForm"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { loginAPI } from '@/services/auth';
import { setAccessToken } from '@/cookie';
import type { ILoginForm } from '@/services/auth/register-request'

export default function Login() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    async function login(payload: ILoginForm) {
        try {
            setLoading(true)
            const { data } = await loginAPI(payload)
            setAccessToken(data.access_token)
            router.push('/dashboard/commission')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <LoginForm loading={loading} submit={login} />
        </div>
    )
}