"use client";

import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FDF4EB] text-gray-700 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Brand Name */}
        <h3 className="text-2xl font-bold text-red-600 mb-2">Turk Masale</h3>
        <p className="text-gray-600 mb-4 italic">Pure & Spicy Since 1978 🌶️</p>

        {/* Contact Info */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="mailto:mdsaqib941002@gmail.com"
            className="flex items-center space-x-2 hover:text-red-600 transition"
          >
            <Mail className="w-4 h-4" />
            <span>mdsaqib941002@gmail.com</span>
          </a>
          <a
            href="tel:+919634749230"
            className="flex items-center space-x-2 hover:text-red-600 transition"
          >
            <Phone className="w-4 h-4" />
            <span>+91-9634749230</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Turk Masale. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
