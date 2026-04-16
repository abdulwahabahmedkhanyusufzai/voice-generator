import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl, cookies } = req
  const isLoggedIn = !!req.auth
  const activeOrgId = cookies.get("activeOrgId")?.value

  const isPublicPage = 
    nextUrl.pathname.startsWith("/sign-in") || 
    nextUrl.pathname.startsWith("/sign-up") ||
    nextUrl.pathname.startsWith("/api/auth") ||
    nextUrl.pathname.startsWith("/api/register")

  const isOrgSelectionPage = nextUrl.pathname.startsWith("/org-selection")

  if (isPublicPage) {
    if (isLoggedIn && !isOrgSelectionPage) {
        // If logged in but on public page, redirect to home (which will then check for org)
        return NextResponse.redirect(new URL("/", nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl))
  }

  if (!activeOrgId && !isOrgSelectionPage) {
    return NextResponse.redirect(new URL("/org-selection", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico).*)"],
}
