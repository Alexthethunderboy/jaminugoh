import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import MagneticCursor from "@/components/motion/MagneticCursor";
import FloatingNav from "@/components/layout/FloatingNav";
import InfoDrawer from "@/components/layout/InfoDrawer";
import AudioPlayer from "@/components/layout/AudioPlayer";
import GlobalCanvas from "@/components/layout/GlobalCanvas";

import { client } from "@/sanity/lib/client";
import { globalSettingsQuery } from "@/sanity/lib/queries";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cssVars: Record<string, string> = {
    '--color-obsidian': '#0a0a0a',
    '--color-charcoal': '#141414',
    '--color-silver': '#e5e5e5',
  };

  let globalSettingsData = null;

  try {
    const config = client.config();
    if (config.projectId && config.projectId !== 'dummy-project-id') {
      const settings = await client.fetch(globalSettingsQuery);
      if (settings) {
        globalSettingsData = settings;
        if (settings.colors) {
          if (settings.colors.obsidian?.hex) cssVars['--color-obsidian'] = settings.colors.obsidian.hex;
          if (settings.colors.charcoal?.hex) cssVars['--color-charcoal'] = settings.colors.charcoal.hex;
          if (settings.colors.silver?.hex) cssVars['--color-silver'] = settings.colors.silver.hex;
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch sanity global settings:", error);
  }

  return (
    <html lang="en" className="dark">
      <body 
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
        style={cssVars as React.CSSProperties}
        suppressHydrationWarning
      >
        <LenisProvider>
          <div className="grain-overlay" />
          <GlobalCanvas />
          <MagneticCursor />
          <FloatingNav data={globalSettingsData} />
          <InfoDrawer data={globalSettingsData} />
          <AudioPlayer />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
