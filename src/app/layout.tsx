// Datei: src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * ZENTRALE SEO KONFIGURATION
 * Diese Daten werden von Google, Twitter und Facebook ausgelesen.
 */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://deine-domain.de"),
  title: {
    default: "EU Boilerplate | Das rechtssichere Next.js Starterkit",
    template: "%s | EU Boilerplate",
  },
  description: "Starte dein SaaS in Rekordzeit. Vollständig DSGVO-konform, inkl. Stripe, Auth v5 und SQLite. Gebaut für europäische Gründer.",
  keywords: ["Next.js Boilerplate", "SaaS Starterkit", "DSGVO konform", "Stripe Integration", "NextAuth v5", "SaaS Deutschland"],
  authors: [{ name: "Dein Name" }],
  creator: "Dein Name",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://deine-domain.de",
    title: "EU Boilerplate - Rechtssicher zum eigenen SaaS",
    description: "Vermeide Abmahnungen und spare 40+ Stunden Entwicklungszeit. Das SaaS Boilerplate für Europa.",
    siteName: "EU Boilerplate",
    images: [
      {
        url: "/og-image.png", // Erstelle dieses Bild in /public/
        width: 1200,
        height: 630,
        alt: "EU Boilerplate Vorschau",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EU Boilerplate - SaaS Starterkit",
    description: "Next.js 15, Auth v5 & Stripe. DSGVO-ready ab Tag 1.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
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
      </body>
    </html>
  );
}