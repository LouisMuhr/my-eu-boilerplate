// Datei: src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import { Toaster } from "sonner"; // DEIN TOASTER

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Basis-Titel reicht völlig für die Entwicklung
export const metadata: Metadata = {
  title: "EU Boilerplate",
  description: "Next.js SaaS Starterkit",
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
        <Toaster richColors position="bottom-right" /> 
      </body>
    </html>
  );
}