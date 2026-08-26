import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Default metadata for the site. Each page exports its own `metadata` to override the
 * title and description, which satisfies the per-page SEO requirement.
 */
export const metadata = {
  title: {
    default: "Travel Unbounded | Experiential Travel Experts",
    template: "%s | Travel Unbounded",
  },
  description:
    "Travel Unbounded designs personally vetted, custom travel experiences across India and the world, with offices in Bangalore, Kochi and Nairobi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
