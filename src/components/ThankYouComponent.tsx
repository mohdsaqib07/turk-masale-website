"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export  function ThankYouComponent() {
  return (
    <main className="py-20 px-4 bg-white min-h-screen text-center">
      <motion.h1
        className="text-4xl font-bold text-red-600 mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Thank You!
      </motion.h1>
      <motion.p
        className="text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Your message has been successfully sent. We will get back to you
        shortly!
      </motion.p>
      <Link
        href="/"
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </main>
  );
}
