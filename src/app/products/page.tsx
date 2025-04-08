import { ProductsComponent } from "@/components/ProudctsComponent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products",
  description: "Discover our wide variety of Turk spices.",
};

const ProductPage = () => {
  return <ProductsComponent />;
};

export default ProductPage;
