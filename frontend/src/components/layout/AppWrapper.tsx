'use client'
import { useState } from "react";
import Header from "@/components/layout/header";
import AuthContext from "@/context/auth-context";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <AuthContext value={{ isLoggedIn, setIsLoggedIn }}>
            <Header />
            <main>
              {children}
            </main>
          </AuthContext>
    )
 }