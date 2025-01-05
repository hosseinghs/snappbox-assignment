'use client';
import { useState, useEffect } from 'react';
import { getAccessToken } from '@/cookie';

import Header from '@/components/layout/header';
import AuthContext from '@/context/auth-context';
import { ThemeProvider } from '@emotion/react';
import theme from '@/app/theme';
import RTL from '@/app/utils/rtlCache';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();
    setIsLoggedIn(!!accessToken);
  }, []);

  return (
    <AuthContext value={{ isLoggedIn, setIsLoggedIn }}>
      <RTL>
        <ThemeProvider theme={theme}>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </RTL>
    </AuthContext>
  );
}
