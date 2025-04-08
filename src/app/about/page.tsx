import { AboutComponent } from "@/components/AboutComponent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Us",
  description: "Discover the story behind Turki Masale",
};

const AboutPage = () => {
  return <AboutComponent />;
};

export default AboutPage;
