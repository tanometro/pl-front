import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token: any = await getToken({ req: request })
  
  if (!token) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  const userRole = token?.user?.role
  const urlPath = request.nextUrl.pathname

  // Verificar si el usuario tiene acceso a su dashboard correspondiente
  if (
    (userRole === 'ADMIN' && urlPath.startsWith('/adminDashboard')) ||
    (userRole === 'CLIENT' && urlPath.startsWith('/clientDashboard')) ||
    (userRole === 'SELLER' && urlPath.startsWith('/sellerDashboard'))
  ) {
    return NextResponse.next() // Permitir el acceso
  }

  // Redirigir al dashboard correcto según el rol del usuario
  let redirectPath = '/home'
  if (userRole === 'ADMIN') redirectPath = '/adminDashboard'
  else if (userRole === 'CLIENT') redirectPath = '/clientDashboard'
  else if (userRole === 'SELLER') redirectPath = '/sellerDashboard'

  return NextResponse.redirect(new URL(redirectPath, request.url))
}

export const config = {
  matcher: ['/adminDashboard/:path*', '/clientDashboard/:path*', '/sellerDashboard/:path*']
}
