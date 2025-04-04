"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [localCart, setLocalCart] = useState(cart);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const updateQuantity = (slug: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    const updatedCart = localCart.map((item) => {
      if (item.slug === slug && item.size === size) {
        return { ...item, quantity };
      }
      return item;
    });
    setLocalCart(updatedCart);
  };

  const totalPrice = localCart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  // ✅ Prepare WhatsApp message
  const generateWhatsAppMessage = () => {
    let message = "Hello! I would like to place an order:%0A%0A";
    localCart.forEach((item) => {
      message += `• ${item.title} (${item.size}) x ${item.quantity} - ₹${
        parseFloat(item.price) * item.quantity
      }%0A`;
    });
    message += `%0ATotal: ₹${totalPrice}%0A%0AThank you!`;
    return message;
  };

  if (cart.length === 0) {
    return (
      <main className="py-20 px-4 bg-white min-h-screen text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Your Cart is Empty
        </h1>
        <Link
          href="/products"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="py-20 px-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Your Cart
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">
        {localCart.map((item) => (
          <div
            key={`${item.slug}-${item.size}`}
            className="flex flex-col md:flex-row items-center bg-[#FDF4EB] rounded-lg shadow-md p-4 space-y-4 md:space-y-0 md:space-x-6"
          >
            {/* Product Image */}
            <div className="relative w-32 h-32">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain rounded-md"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-1">Size: {item.size}</p>
              <p className="text-gray-600 mb-3">Price: ₹{item.price}</p>

              {/* Quantity Control */}
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <button
                  onClick={() =>
                    updateQuantity(item.slug, item.size, item.quantity - 1)
                  }
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="text-gray-800 font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.slug, item.size, item.quantity + 1)
                  }
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-semibold text-gray-800 text-center md:text-left">
                Subtotal: ₹{parseFloat(item.price) * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.slug, item.size)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}

        {/* Summary */}
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Total: ₹{totalPrice}
          </h2>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Clear Cart
            </button>
            <Link
              href="/contact"
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
            >
              Proceed to Checkout
            </Link>
            <a
              href={`https://wa.me/919634749230?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Are you sure?</h2>
            <p className="text-gray-600">
              This will remove all items from your cart.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  clearCart();
                  setShowConfirm(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Yes, Clear
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
