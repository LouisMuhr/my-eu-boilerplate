// Datei: src/app/[locale]/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import "../global.css"; // Pfad prüfen!
import { Toaster } from "sonner";
import CookieConsent from "@/components/cookie-consent";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// WICHTIG: Die Typ-Definition für Next.js 15
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params;

  // Validierung
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Footer />
          <Toaster richColors position="bottom-right" /> 
          <CookieConsent /> 
        </NextIntlClientProvider>
      </body>
    </html>
  );
}