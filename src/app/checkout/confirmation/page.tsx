"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [whatsappMessage, setWhatsappMessage] = useState<string | null>(null);
  const hasCopiedRef = useRef(false);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const messageParam = searchParams.get("message");
    if (messageParam && !hasCopiedRef.current) {
      setWhatsappMessage(messageParam);
      navigator.clipboard.writeText(decodeURIComponent(messageParam));
      hasCopiedRef.current = true;
    }
  }, [searchParams]);

  const handleWhatsAppRedirect = () => {
    if (whatsappMessage) {
      clearCart();
      window.location.href = `https://wa.me/919634749230?text=${whatsappMessage}`;
    }
  };

  return (
    <main className="py-20 px-4 bg-white min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-gray-700 mb-4">
        We've copied your order details to your clipboard.
      </p>
      <p className="text-gray-700 mb-8">
        Please click below to send your order on WhatsApp and attach your UPI
        payment screenshot.
      </p>

      <button
        onClick={handleWhatsAppRedirect}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Send Order on WhatsApp
      </button>
    </main>
  );
}
