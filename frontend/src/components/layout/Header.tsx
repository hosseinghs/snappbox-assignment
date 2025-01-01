'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import './style.css'

import { getAccessToken, removeAccessToken } from '@/cookie'

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        const token = getAccessToken()
        setIsLoggedIn(!!token)
    }, [])

    const logout = () => {
        removeAccessToken()
        setIsLoggedIn(false)
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
    
    return(
        <header>
            {isLoggedIn ? loggedInComponent() : notLoggedInComponent()}
        </header>
    )
    
   
}