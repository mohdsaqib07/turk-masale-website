"use client";

import { useEffect, use, useState } from "react";
import { Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  title: string;
  description: string;
  imageFront: string;
  imageBack: string;
  sizes: string[];
  prices: string[];
}

export default function SingleProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${slug}`);
      const data = await res.json();
      setProduct(data);
      setSelectedImage(data.imageFront);
      setSelectedSize(data.sizes[0]);
      setSelectedPrice(data.prices[0]);
    }

    fetchProduct();
  }, [slug]);

  const handleSizeChange = (size: string, index: number) => {
    setSelectedSize(size);
    setSelectedPrice(product?.prices[index] || "");
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-red-600" />
      </div>
    );
  }

  const whatsappMessage = `Hello! I would like to order ${product.title} (${selectedSize}) for Rs.${selectedPrice}`;

  return (
    <motion.main
      className="py-20 px-4 bg-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Carousel */}
        <div>
          <motion.div
            className="relative w-full h-96 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={selectedImage!}
              alt={product.title}
              fill
              className="object-contain"
            />
          </motion.div>
          <div className="flex space-x-4 justify-center">
            {[product.imageFront, product.imageBack].map((img, idx) => (
              <div
                key={idx}
                className={`w-20 h-20 relative cursor-pointer border ${
                  selectedImage === img ? "border-red-600" : "border-gray-300"
                } rounded-lg overflow-hidden`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <motion.h1
            className="text-3xl font-bold text-red-600 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {product.title}
          </motion.h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <label
              htmlFor="size"
              className="block mb-2 text-gray-700 font-medium"
            >
              Select Size:
            </label>
            <select
              id="size"
              value={selectedSize}
              onChange={(e) =>
                handleSizeChange(e.target.value, e.target.selectedIndex)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-lg text-gray-800 font-semibold">
              Price: ₹{selectedPrice}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() =>
                addToCart({
                  slug: slug as string,
                  title: product.title,
                  size: selectedSize,
                  price: selectedPrice,
                  quantity: 1,
                  image: product.imageFront,
                })
              }
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Add to Cart
            </button>

            <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">
              Order Now
            </button>
            <a
              href={`https://wa.me/919634749230?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-center hover:bg-green-600 transition"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
