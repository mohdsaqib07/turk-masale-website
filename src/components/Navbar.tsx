"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const controls = useAnimation();
  useEffect(() => {
    if (cart.length > 0) {
      controls.start({
        scale: [1, 1.3, 0.9, 1],
        transition: { duration: 0.5 },
      });
    }
  }, [cart, controls]);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Brand Section */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png" // Ensure your logo is here in public folder
            alt="Turk Masale Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-bold text-red-600">Turk Masale</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="/"
            className="text-gray-700 hover:text-red-600 transition"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-700 hover:text-red-600 transition"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-red-600 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-red-600 transition"
          >
            Contact
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative inline-flex items-center">
            <motion.div animate={controls}>
              <ShoppingCart className="w-6 h-6 text-red-600" />
            </motion.div>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Icon for Mobile */}
          <Link href="/cart" className="relative inline-flex items-center">
            <ShoppingCart className="w-6 h-6 text-red-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu}>
            {isOpen ? (
              <X className="w-6 h-6 text-red-600" />
            ) : (
              <Menu className="w-6 h-6 text-red-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            href="/"
            className="block px-4 py-2 text-gray-700 hover:bg-red-50"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block px-4 py-2 text-gray-700 hover:bg-red-50"
          >
            Products
          </Link>
          <Link
            href="#about"
            className="block px-4 py-2 text-gray-700 hover:bg-red-50"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-4 py-2 text-gray-700 hover:bg-red-50"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
