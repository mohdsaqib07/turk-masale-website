import AboutSection from "@/components/AboutSection";
import CoverImage from "@/components/CoverImage";
import { HeroSection } from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="">
      <CoverImage />
      <HeroSection />
      <ProductSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
