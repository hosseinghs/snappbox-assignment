import { NextResponse, NextRequest } from 'next/server';
import { TOKEN_NAME } from '@/cookie/index'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)
  if (!token) return NextResponse.redirect(new URL('/auth/login', request.url))
  else return NextResponse.next()
}
 
export const config = {
    matcher: '/dashboard/:path*',
}