"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="py-20 px-4 bg-white min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About Turk Masale
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Spreading the aroma of purity since 1978. Crafted in the heart of
          Uttar Pradesh, Turk Masale brings you spices of tradition, taste, and
          trust.
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Turk Masale is a proud Indian spice brand that started its journey
            back in 1978, in the small town of Budaun, Uttar Pradesh. With a
            passion for purity and an eye for the finest ingredients, we have
            been delivering rich and aromatic spices to homes and businesses
            across India.
          </p>
          <p className="text-gray-700 mb-4">
            Our product range includes premium Red Chilli Powder, Coriander
            Powder, Turmeric Powder, and Whole Garam Masala. Every pack is a
            promise of freshness, quality, and unbeatable taste.
          </p>
          <p className="text-gray-700">
            We believe in traditional methods of production combined with modern
            quality standards to ensure every sprinkle of Turk Masale adds magic
            to your cooking.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-80 relative"
        >
          <Image
            src="/cover-image.png" // Use your cover image or brand image
            alt="Turk Masale"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto mt-20 text-center"
      >
        <h2 className="text-2xl font-bold text-red-600 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          To bring the authentic taste of Indian spices to every kitchen, while
          maintaining the highest standards of quality, hygiene, and
          sustainability.
        </p>
        <p className="text-gray-700">
          We aim to continue our legacy by introducing innovative spice blends
          and expanding our reach globally, making Turk Masale a household name.
        </p>
      </motion.div>
    </main>
  );
}
