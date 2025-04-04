"use client";

import { motion } from "framer-motion";

import { useState } from "react";
import { toast } from "react-hot-toast";
export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    toast.success("Message sent successfully! 🚀");

    // Reset the form after submission
    const form = event.target as HTMLFormElement;
    form.reset();

    // event.target.reset();
  };

  return (
    <main className="py-20 px-4 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Have questions or bulk orders? Reach out to us!
        </motion.p>

        {/* Contact Form */}
        <form
          action="https://formsubmit.co/mdsaqib941002@gmail.com"
          method="POST"
          className="space-y-6 text-left"
          onSubmit={(event) => handleSubmit(event)}
        >
          {/* Hidden Inputs */}
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="http://localhost:3000/thank-you"
          />

          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <textarea
            name="message"
            required
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            rows={4}
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg w-full transition ${
              loading ? "cursor-not-allowed bg-red-400" : "hover:bg-red-700"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        <div className="mt-8">
          <a
            href="https://wa.me/919634749230"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.048.514 3.976 1.416 5.688L0 24l6.437-1.656A11.959 11.959 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.42 17.253c-.263.737-1.518 1.367-2.1 1.452-.537.079-1.212.112-3.494-.748a12.626 12.626 0 01-5.293-4.737c-1.018-1.335-1.777-2.833-1.104-3.595.674-.764 1.513-1.209 2.05-1.286.537-.079.85.316 1.174.763.284.393.624.902.847 1.171.28.33.294.495.059.806-.146.188-.442.481-.634.645-.197.166-.404.346-.174.717.231.37 1.026 1.594 2.204 2.242 1.176.646 1.524.57 1.807.479.282-.09.926-.378 1.055-.744.13-.365.13-.677.091-.744-.038-.066-.144-.105-.303-.184-.159-.078-.926-.455-1.073-.506-.146-.052-.254-.079-.363.079-.109.158-.418.505-.513.608-.094.104-.191.117-.354.039-.159-.078-.673-.248-1.281-.79-.608-.542-1.016-1.206-1.135-1.364-.118-.158-.013-.246.066-.324.076-.078.17-.183.256-.274.086-.092.114-.158.17-.263.057-.105.028-.197-.014-.276-.043-.078-.383-.927-.526-1.273-.145-.346-.29-.297-.388-.303-.098-.007-.21-.007-.322-.007-.112 0-.295.04-.45.198-.156.158-.593.579-.593 1.42 0 .84.607 1.652.693 1.768.086.117 1.191 1.812 2.887 2.542 1.696.729 1.696.486 2 .454.305-.032 1.056-.433 1.205-.854.149-.42.149-.781.104-.854-.045-.072-.118-.117-.197-.184l-.004-.002z" />
            </svg>
            Chat with us on WhatsApp
          </a>
        </div>

        <div className="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.2944194559096!2d79.11735257448363!3d28.038127175963245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399e3064dfb3c3e5%3A0x9c0c57d390d05f9b!2sBudaun%2C%20Uttar%20Pradesh%20243601!5e0!3m2!1sen!2sin!4v1712134212492!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
