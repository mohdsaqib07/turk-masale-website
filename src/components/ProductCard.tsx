"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export default function ProductCard({
  title,
  description,
  image,
  slug,
}: ProductCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/blur-background.png" // ✅ Create a blurred placeholder or use image CDN base64
        />
      </div>

      <div className="p-4">
        <Link href={`/products/${slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        </Link>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
