import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import Head from "next/head";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Turk Masale - Premium Handpicked Spices",
    template: "%s | Turk Masale",
  },
  description:
    "Turk Masale offers premium, handpicked spices to bring authentic flavor to your kitchen. Explore our range of red chilli powder, turmeric, coriander, and garam masala.",
  keywords:
    "Turk Masale, Spices, Red Chilli Powder, Turmeric, Coriander, Garam Masala, Indian Spices, Authentic Masala",
  openGraph: {
    title: "Turk Masale | Premium Handpicked Spices",
    description:
      "Explore our premium range of spices sourced directly from farms.",
    url: "https://turk-masale.vercel.app/",
    siteName: "Turk Masale",
    images: [
      {
        url: "https://turk-masale.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Turk Masale - Premium Spices",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Turk Masale | Premium Handpicked Spices",
    description:
      "Explore our premium range of spices sourced directly from farms.",
    images: ["https://turk-masale.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Turk Masale",
            url: "https://your-live-site.com",
            logo: "https://your-live-site.com/logo.png",
            sameAs: [
              "https://facebook.com/yourpage",
              "https://instagram.com/yourpage",
              "https://wa.me/919634749230",
            ],
          }),
        }}
        id="turk-masale-website"
        strategy={"lazyOnload"}
      />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
