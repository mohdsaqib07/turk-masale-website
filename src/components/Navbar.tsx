"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion, useAnimation } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const controls = useAnimation();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Animate cart icon when cart updates
  useEffect(() => {
    if (cart.length > 0) {
      controls.start({
        scale: [1, 1.3, 0.9, 1],
        transition: { duration: 0.5 },
      });
    }
  }, [cart, controls]);

  // Close mobile menu on route change
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`bg-white ${
        scrolled ? "shadow-md" : "shadow-none"
      } sticky top-0 z-50 transition-shadow duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Brand Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Turk Masale Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-bold text-red-600 dark:text-red-500">
         Catch Masale
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-gray-800 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition font-medium ${
                pathname === link.href
                  ? "text-red-600 dark:text-red-500 font-semibold"
                  : ""
              } group`}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-600 dark:bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          {/* Cart Icon */}
          <Link href="/cart" className="relative inline-flex items-center">
            <motion.div animate={controls}>
              <ShoppingCart className="w-6 h-6 text-red-600 dark:text-red-500" />
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
            <ShoppingCart className="w-6 h-6 text-red-600 dark:text-red-500" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu}>
            {isOpen ? (
              <X className="w-6 h-6 text-red-600 dark:text-red-500" />
            ) : (
              <Menu className="w-6 h-6 text-red-600 dark:text-red-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-md py-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-800 transition ${
                pathname === link.href
                  ? "text-red-600 dark:text-red-500 font-semibold"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
