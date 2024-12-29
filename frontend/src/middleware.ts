import { getAccessToken } from '@/auth';
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('sadasd');
    
  const token = getAccessToken()
  
  if (!token) return NextResponse.redirect(new URL('/auth/register', request.url))
  else return NextResponse.next()
}
 
export const config = {
    matcher: '/dashboard/:path*',
}