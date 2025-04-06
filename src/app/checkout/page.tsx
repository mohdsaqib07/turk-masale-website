"use client";

import { useCart } from "@/context/CartContext";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/");
    }
  }, [cart]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    pincode: "",
    city: "",
    landmark: "",
    fullAddress: "",
    addressType: "Home",
  });

  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const { fullName, phone, pincode, city, fullAddress } = form;
    if (!fullName || !phone || !pincode || !city || !fullAddress) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (phone.length !== 10) {
      toast.error("Phone number should be 10 digits");
      return false;
    }
    if (form.alternatePhone && form.alternatePhone.length !== 10) {
      toast.error("Alternate phone number should be 10 digits");
      return false;
    }
    if (pincode.length !== 6) {
      toast.error("Pincode should be 6 digits");
      return false;
    }
    return true;
  };

  // ✅ WhatsApp message builder
  const generateWhatsAppMessage = () => {
    let message = `*🧂 Turk Masale - New Order 🧂*%0A%0A`;

    message += `*Order Summary:*%0A`;
    cart.forEach((item) => {
      message += `• ${item.title} (${item.size}) x ${item.quantity} — ₹${
        parseFloat(item.price) * item.quantity
      }%0A`;
    });
    message += `%0A*Total Amount:* ₹${totalPrice}%0A%0A`;

    message += `*Customer Details:*%0A`;
    message += `👤 Name: ${form.fullName}%0A`;
    message += `📞 Phone: ${form.phone}%0A`;
    if (form.alternatePhone)
      message += `📞 Alternate Phone: ${form.alternatePhone}%0A`;
    message += `📮 Pincode: ${form.pincode}%0A`;
    message += `🏙️ City: ${form.city}%0A`;
    if (form.landmark) message += `📍 Landmark: ${form.landmark}%0A`;
    message += `🏡 Address: ${form.fullAddress}%0A`;
    message += `🏷️ Address Type: ${form.addressType}%0A%0A`;

    message += `💡 *Note:* Please attach your UPI screenshot after completing the payment. %0A%0A`;

    message += `Thank you for choosing *Turk Masale*! 🌶️`;

    return encodeURI(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cart }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Order placed successfully!");

        const message = generateWhatsAppMessage();

        // ✅ Copy message to clipboard

        // ✅ Redirect to order confirmation page instead of WhatsApp directly
        router.push(`/checkout/confirmation?message=${message}`);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while placing the order.");
    }
  };

  return (
    <main className="py-20 px-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Checkout
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* ✅ Order Summary */}
        <div className="bg-[#FDF4EB] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={`${item.slug}-${item.size}`}
                  className="flex items-center space-x-4"
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.title} ({item.size})
                    </p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-gray-700">
                      ₹ {parseFloat(item.price) * item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-lg font-semibold text-gray-800">
            Total: ₹{totalPrice}
          </p>
        </div>

        {/* ✅ Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          {[
            {
              label: "Full Name",
              name: "fullName",
              type: "text",
              required: true,
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "tel",
              required: true,
            },
            {
              label: "Alternate Phone Number (Optional)",
              name: "alternatePhone",
              type: "tel",
              required: false,
            },
            { label: "Pincode", name: "pincode", type: "text", required: true },
            { label: "City", name: "city", type: "text", required: true },
            {
              label: "Landmark",
              name: "landmark",
              type: "text",
              required: false,
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                required={field.required}
              />
            </div>
          ))}

          {/* Full Address */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Full Address
            </label>
            <textarea
              name="fullAddress"
              value={form.fullAddress}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            ></textarea>
          </div>

          {/* Address Type */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Type of Address
            </label>
            <div className="flex space-x-4">
              {["Home", "Work", "Other"].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="addressType"
                    value={type}
                    checked={form.addressType === type}
                    onChange={handleChange}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </main>
  );
}
