import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL!)
  );
  response.cookies.set("admin-token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
}
