import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({
    title: product.title,
    description: product.description,
    imageFront: product.imageFront,
    imageBack: product.imageBack,
    sizes: product.sizes.split(","),
    prices: product.prices.split(","),
  });
}
