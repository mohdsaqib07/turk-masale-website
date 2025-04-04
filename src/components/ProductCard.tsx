"use client";

import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import Image from "next/image";
interface ProductCardProps {
  title: string;
  description: string;
  image: StaticImageData;
}

export default function ProductCard({
  title,
  description,
  image,
}: ProductCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={image}
        alt={title}
        className="w-full h-48 object-contain rounded-md mb-4"
      />
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}
