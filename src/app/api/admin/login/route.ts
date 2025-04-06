import { NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; time: number }>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
  const now = Date.now();

  const rateLimit = rateLimitMap.get(ip);

  if (rateLimit) {
    // If within 1 minute and attempts > 5
    if (now - rateLimit.time < 60 * 1000 && rateLimit.count >= 5) {
      console.log(`[RATE LIMITED] IP: ${ip} at ${new Date().toLocaleString()}`);
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Try again later." },
        { status: 429 }
      );
    }

    // Update count
    if (now - rateLimit.time < 60 * 1000) {
      rateLimit.count += 1;
    } else {
      // Reset if time passed
      rateLimitMap.set(ip, { count: 1, time: now });
    }
  } else {
    // First attempt
    rateLimitMap.set(ip, { count: 1, time: now });
  }

  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin-token", process.env.ADMIN_SECRET_TOKEN!, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    console.log(`[LOGIN SUCCESS] IP: ${ip} at ${new Date().toLocaleString()}`);
    return response;
  } else {
    console.log(
      `[LOGIN FAILED] Username: ${username}, IP: ${ip}, Time: ${new Date().toLocaleString()}`
    );
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  }
}
