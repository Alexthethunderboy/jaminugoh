import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import MagneticCursor from "@/components/motion/MagneticCursor";
import FloatingNav from "@/components/layout/FloatingNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jamin Ugoh | Director • Writer • Cinematographer",
  description: "Official portfolio of Jamin Ugoh, an award-winning Director, Writer, and Cinematographer based in the UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <LenisProvider>
          <div className="grain-overlay" />
          <MagneticCursor />
          <FloatingNav />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
