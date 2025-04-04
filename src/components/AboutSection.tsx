"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Story
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Since 1978, Turk Masale has been blending tradition and purity from
          the small town of Budaun, Uttar Pradesh. Our journey began in local
          markets, sourcing the finest spices handpicked from trusted farmers.
          Today, we continue our legacy with the same passion, bringing
          authentic Red Chilli Powder, Turmeric, Coriander Powder, and Whole
          Garam Masala to kitchens worldwide. Taste the essence of true Indian
          flavors with every sprinkle of Turk Masale.
        </motion.p>
      </div>
    </section>
  );
}
