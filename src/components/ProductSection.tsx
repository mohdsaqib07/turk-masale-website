"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import Image from "next/image";
import redChilli from "@/productphotos/red-chilli.png";
import turmeric from "@/productphotos/turmeric.png";
import coriander from "@/productphotos/coriander.png";
import garamMasala from "@/productphotos/garam-masala.png";

export default function ProductSection() {
  const products = [
    {
      title: "Red Chilli Powder",
      description: "Fiery and pure, add a spicy kick to your recipes.",
      image: redChilli,
    },
    {
      title: "Turmeric Powder",
      description: "Rich in color and flavor, packed with health benefits.",
      image: turmeric,
    },
    {
      title: "Coriander Powder",
      description: "Aromatic and fresh, a must-have in every kitchen.",
      image: coriander,
    },
    {
      title: "Whole Garam Masala",
      description: "A bold blend of spices for the perfect aroma.",
      image: garamMasala,
    },
  ];

  return (
    <section
      id="products"
      className="py-20 px-4 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden"
    >
      {/* Optional: Soft decorative background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern.svg')] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Our Products
        </motion.h2>

        <motion.p
          className="text-gray-600 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
        >
          Handpicked spices to add authentic flavor to every dish.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </div>
    </section>
  );
}
