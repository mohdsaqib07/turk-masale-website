import ProductCard from "./ProductCard";
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
    <section id="products" className="py-20 px-4 bg-yellow-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Products</h2>
        <p className="text-gray-600">
          Handpicked spices to add authentic flavor to every dish.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </div>
    </section>
  );
}
