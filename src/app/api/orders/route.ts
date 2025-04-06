import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const order = await prisma.order.create({
      data: {
        fullName: body.fullName,
        phone: body.phone,
        alternatePhone: body.alternatePhone,
        pincode: body.pincode,
        city: body.city,
        landmark: body.landmark,
        fullAddress: body.fullAddress,
        addressType: body.addressType,
        orderSummary: JSON.stringify(body.cart),
      },
    });
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
