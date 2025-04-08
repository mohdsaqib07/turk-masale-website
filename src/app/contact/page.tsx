import { ContactPageComponent } from "@/components/ContactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Turk Masale, a modern and stylish cafe in İstanbul. We offer freshly baked pastries, homemade ice creams, and delicious pastries.",
};
const ContactPage = () => {
  return <ContactPageComponent />;
};

export default ContactPage;
