import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const loggedInUser = request.cookies.get('token')
  if (!loggedInUser) {
    return NextResponse.redirect(new URL('/app/auth', request.url))
  }
}

export const config = {
  matcher: ['/app', '/app/events/:path*', '/app/profile/:path*'],
}
