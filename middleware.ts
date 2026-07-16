import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isLoginPage = request.nextUrl.pathname === "/login";

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employees/:path*",
    "/clients/:path*",
    "/projects/:path*",
    "/materials/:path*",
    "/stock/:path*",
    "/expenses/:path*",
    "/payments/:path*",
    "/attendance/:path*",
    "/payroll/:path*",
    "/boq/:path*",
    "/login",
  ],
};