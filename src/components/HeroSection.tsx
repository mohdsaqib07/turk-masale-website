import Link from "next/link";
export function HeroSection() {
  return (
    <section className="relative  py-20 px-4 text-center overflow-hidden">
      {/* Background Logo */}

      {/* Content */}
      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Welcome to <span className="text-red-600">Turk Masale</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Since 1978, bringing the purest and finest Indian spices from the
          heart of Uttar Pradesh to your kitchen. 🌶️
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/products">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
              Explore Our Spices
            </button>
          </Link>
          <Link href="/contact">
            <button className="border border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-600 hover:text-white transition">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
