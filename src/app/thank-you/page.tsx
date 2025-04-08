import { ThankYouComponent } from "@/components/ThankYouComponent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for your order!",
};

const ThankYouPage = () => {
  return <ThankYouComponent />;
};

export default ThankYouPage;
