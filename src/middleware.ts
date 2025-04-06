import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminRoutes = ["/admin"];

  const isAdminRoute = adminRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isAdminRoute && request.nextUrl.pathname !== "/admin/login") {
    const token = request.cookies.get("admin-token")?.value;

    if (token !== process.env.ADMIN_SECRET_TOKEN) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
