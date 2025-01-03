import Link from 'next/link'
import AuthContext from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

import { Button } from '@mui/material'
import { removeAccessToken } from '@/cookie'

export default function Nav() {
    const router = useRouter()
    const ctx = useContext(AuthContext)
    
    const logout = () => {
        removeAccessToken()
        ctx.setIsLoggedIn(false)
        router.push('/auth/login')
    }

    const loggedInComponent = () => <Button className='w-auto' variant="text" color='warning' onClick={() => logout()}>Logout</Button>
    const notLoggedInComponent = () => {
        return (
            <>
            <Button variant='contained' color='primary' className='w-auto'>
                <Link href="/auth/login">Login</Link>
            </Button>
            <Button variant='outlined' color='primary' className='w-auto ml-4'>
                <Link href="/auth/register">Register</Link>
            </Button>
            </>
        )
    } 

    return (
        <nav>
            {ctx.isLoggedIn ? loggedInComponent() : notLoggedInComponent()}
        </nav>
    )
}