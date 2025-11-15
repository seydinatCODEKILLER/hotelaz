import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard']
const authRoutes = ['/auth/login', '/auth/register']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-storage')?.value

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  // Vérifier si la route d'authentification
  const isAuthRoute = authRoutes.some(route =>
    pathname.startsWith(route)
  )

  // Si non connecté → redirect vers login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Si connecté → redirect routes auth vers dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard/analytics', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}
