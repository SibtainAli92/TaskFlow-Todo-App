import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const session = request.cookies.get(
    "better-auth.session_token"
  )

  const isDashboard = pathname.startsWith("/dashboard")
  const isAuthPage =
    pathname === "/auth/login" ||
    pathname === "/auth/register"

  if (isDashboard && !session) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    )
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/login",
    "/auth/register",
  ],
}