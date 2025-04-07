"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function CoverImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <motion.div
      ref={ref}
      className="w-full bg-[#FDF4EB] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ scale, opacity }}
    >
      <Image
        src="/cover-image.png" // make sure the path is correct!
        alt="Turk Masale Cover"
        width={1600}
        height={400}
        className="w-full max-h-[400px] object-contain mx-auto py-6"
        priority
      />
    </motion.div>
  );
}
