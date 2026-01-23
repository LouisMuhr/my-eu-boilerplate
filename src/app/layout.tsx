// Datei: src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import { Toaster } from "sonner";
import CookieConsent from "@/components/cookie-consent"; //

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EU Boilerplate",
  description: "Das rechtssichere Next.js Starterkit",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        
        {/* Die Toasts für System-Meldungen */}
        <Toaster richColors position="bottom-right" /> 
        
        {/* Der DSGVO-Türsteher */}
        <CookieConsent /> 
      </body>
    </html>
  );
}