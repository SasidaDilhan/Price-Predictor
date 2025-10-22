import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/seller")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (token.role !== "seller") {
      // Prevent non-sellers from accessing seller dashboard
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect logged-in users from login/signup pages
  if ((pathname === "/login" || pathname === "/signup") && token) {
    let redirectUrl = "/";
    if (token.role === "admin") redirectUrl = "/admin/dashboard";
    else if (token.role === "seller") redirectUrl = "/seller/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/seller/:path*", // ✅ Protect seller routes too
    "/login",
    "/signup",
  ],
};
