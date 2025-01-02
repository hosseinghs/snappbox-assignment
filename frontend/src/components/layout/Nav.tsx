import Link from 'next/link'
import AuthContext from '@/context/auth-context'
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
            <Link className='header__link' href="/auth/login">Login</Link>
            <Link className='header__link' href="/auth/register">Register</Link>
            </>
        )
    } 

    return (
        <nav>
            {ctx.isLoggedIn ? loggedInComponent() : notLoggedInComponent()}
        </nav>
    )
}