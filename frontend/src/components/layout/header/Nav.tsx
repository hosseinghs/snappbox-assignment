import Link from 'next/link'
import AuthContext from '@/context/auth-context'

import { Button } from '@mui/material'
import { useContext } from 'react'
import { removeAccessToken } from '@/cookie'

export default function Nav() {
    const ctx = useContext(AuthContext);
    
    const logout = () => {
        removeAccessToken()
        ctx.setIsLoggedIn(false)
    }

    const loggedInComponent = () => <Link className='header__link' href="#" onClick={() => logout()}>Logout</Link>
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