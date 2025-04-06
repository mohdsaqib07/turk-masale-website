import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { orderId, status, phone } = await req.json();

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    // If completed, send WhatsApp message!
    if (status === "Completed") {
      const message = encodeURIComponent(
        `Hello! 👋%0A%0AYour order #${orderId} has been marked as *Completed*. Thank you for shopping with Turk Masale! 🌶️%0A%0AIf you have any questions, feel free to reply here.%0A%0ARegards,%0ATurk Masale Team`
      );

      await fetch(`https://wa.me/91${phone}?text=${message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
