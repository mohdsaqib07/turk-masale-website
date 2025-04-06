import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.includes(process.env.ADMIN_SECRET_TOKEN!);

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  try {
    await prisma.product.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        imageFront: body.imageFront,
        imageBack: body.imageBack,
        category: body.category,
        sizes: body.sizes, // ✅ string
        prices: body.prices, // ✅ string
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
