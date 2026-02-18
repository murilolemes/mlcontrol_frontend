import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;

  const publicRoutes = ["/login"];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // const isPublicRoute = request.nextUrl.pathname.startsWith("/login");

  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*", "/dashboard/:path"],
}