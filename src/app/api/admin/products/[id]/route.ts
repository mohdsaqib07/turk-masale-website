import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (product) {
      return NextResponse.json({ success: true, product });
    } else {
    }
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({
      error: "Something Went Wrong",
      success: false,
    });
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = process.env.ADMIN_SECRET_TOKEN!;
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader || !cookieHeader.includes(token)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product." },
      { status: 500 }
    );
  }
}
// ✅ Optional, if you're using admin check

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Optional: protect admin routes

    const { id } = await params;
    const body = await req.json();

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        category: body.category,
        sizes: body.sizes,
        prices: body.prices,
        imageFront: body.imageFront,
        imageBack: body.imageBack,
      },
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}
