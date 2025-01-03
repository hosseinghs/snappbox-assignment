'use client'
import { useState, useEffect } from "react";
import { getAccessToken } from "@/cookie";

import Header from "@/components/layout/header";
import AuthContext from "@/context/auth-context";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      const accessToken = getAccessToken()
      setIsLoggedIn(!!accessToken)
    }, [])

    return (
        <AuthContext value={{ isLoggedIn, setIsLoggedIn }}>
            <Header />
            <main>
              {children}
            </main>
          </AuthContext>
    )
 }