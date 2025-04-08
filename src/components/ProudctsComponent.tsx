"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import debounce from "lodash.debounce";

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageFront: string;
}

// ✅ Define category mapping
const categories = [
  "All",
  "Red Chilli",
  "Turmeric",
  "Coriander",
  "Garam Masala",
];

export function ProductsComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    handler();

    return () => handler.cancel();
  }, [searchTerm]);

  // ✅ Filter products based on search + category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(debouncedSearchTerm);
    const matchesCategory =
      activeCategory === "All" ||
      product.title.toLowerCase().includes(activeCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="py-20 px-4 bg-white min-h-screen">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Our Spice Collection
        </h1>

        {/* ✅ Search */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or spice type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* ✅ Category Filters */}
        <div className="flex justify-center flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm border ${
                activeCategory === category
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"
              } transition`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the essence of Indian cuisine with our premium range of
          handpicked spices. Freshly ground and packed with care for
          unforgettable flavor.
        </p>
      </motion.div>

      {/* ✅ Loader / No products / Product grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-10 h-10 text-red-600" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No products found.
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-[#FDF4EB] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative w-full h-48">
                <Image
                  src={product.imageFront}
                  alt={product.title}
                  fill
                  className="group-hover:scale-105 transition-transform duration-500 object-contain"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-red-600 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link
                  href={`/products/${product.slug}`}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition block text-center"
                >
                  Order Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
