import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}
