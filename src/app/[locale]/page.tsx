import Link from "next/link";
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  CreditCard, 
  Database, 
  Lock, 
  Layout, 
  CheckCircle2, 
  ArrowRight,
  Menu
} from "lucide-react";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-blue-100 dark:selection:bg-blue-900">
      
      {/* --- NAVIGATION --- */}
      <header className="fixed top-0 w-full z-50 border-b border-gray-200 dark:border-gray-800 glass">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              EU
            </div>
            <span>Boilerplate</span>
          </div>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Features</a>
            <a href="#stack" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Tech Stack</a>
            <a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Preise</a>
          </nav>
          <LocaleSwitcher />
          <div className="flex gap-4">
            <Link 
              href="/auth/signin" 
              className="hidden md:inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            >
              Login
            </Link>
            <Link
              href="/auth/signin" // In Realität hier Link zum Kauf
              className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Starten
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24">
        {/* --- HERO SECTION --- */}
        <section className="container mx-auto px-4 py-20 md:py-32 text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Neu: Next.js 15 & Auth v5 Support
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Starte dein SaaS. <br className="hidden md:block" />
            <span className="text-gradient">Rechtssicher in Europa.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Schluss mit Kopfschmerzen bei DSGVO, Impressum und Cookie-Bannern. 
            Das ultimative Next.js Boilerplate für europäische Gründer – inklusive Stripe, Auth und Datenbank.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#pricing"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105"
            >
              Boilerplate holen
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a 
              href="https://github.com/louismuhr" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white px-8 text-base font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              Demo ansehen
            </a>
          </div>

          <div className="mt-16 text-sm text-gray-500 flex flex-col md:flex-row justify-center gap-8 items-center">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Einmalzahlung, kein Abo</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Volle Code-Kontrolle</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>DSGVO Ready</span>
            </div>
          </div>
        </section>

        {/* --- FEATURES (BENTO GRID) --- */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Alles, was du für den Launch brauchst</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Kein "Hello World" mehr. Ein produktionsreifes Setup, das dir Wochen an Entwicklungszeit spart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Feature 1: Large */}
            <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-blue-500/20 transition-all duration-300">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">EU Compliance First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Unterschätze niemals das deutsche Abmahnwesen. Wir liefern vorbereitete Seiten für Impressum & Datenschutz, 
                einen funktionierenden Cookie-Consent Banner und API-Routen für den DSGVO-Datenexport.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-purple-500/20 transition-all duration-300">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Stripe Payments</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Fertige Integration für Abos und Einmalzahlungen. Webhooks sind bereits konfiguriert. Geld verdienen ab Tag 1.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-green-500/20 transition-all duration-300">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Auth v5 (Beta)</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Das neueste NextAuth. Sicherer Login via E-Mail/Passwort oder Google. Inklusive geschützter Routen via Middleware.
              </p>
            </div>

             {/* Feature 4: Large */}
             <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-orange-500/20 transition-all duration-300">
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Next.js 15 & Performance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gebaut auf dem neuesten Tech-Stack. App Router, Server Actions und TypeScript. 
                Kein unnötiger Ballast, nur das, was du wirklich brauchst um schnell zu sein.
              </p>
            </div>
          </div>
        </section>

        {/* --- TECH STACK --- */}
        <section id="stack" className="py-20 bg-gray-50 dark:bg-gray-900/50">
           <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-12 opacity-80">Der moderne Stack für 2026</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Einfache Text-Placeholder für Logos, da wir keine SVGs haben */}
               <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6"/> Next.js 15</div>
               <div className="flex items-center gap-2 font-bold text-xl"><Database className="w-6 h-6"/> SQLite / Prisma</div>
               <div className="flex items-center gap-2 font-bold text-xl"><Layout className="w-6 h-6"/> Tailwind CSS</div>
               <div className="flex items-center gap-2 font-bold text-xl"><CreditCard className="w-6 h-6"/> Stripe</div>
               <div className="flex items-center gap-2 font-bold text-xl"><Lock className="w-6 h-6"/> NextAuth</div>
            </div>
           </div>
        </section>

        {/* --- PRICING --- */}
        <section id="pricing" className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ein Preis. Alles drin.</h2>
            <p className="text-gray-600 dark:text-gray-400">Spare dir 40+ Stunden Entwicklungszeit für weniger als einen Freelancer-Stundensatz.</p>
          </div>

          <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULÄR
            </div>
            <div className="p-8">
              <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">Lifetime License</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight">149€</span>
                <span className="ml-1 text-xl font-semibold text-gray-500">/ einmalig</span>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                Hol dir den Code, bau dein Projekt, behalte 100% des Umsatzes.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Next.js 15 Boilerplate Code",
                  "Auth & Datenbank Setup",
                  "Stripe Integration (Abo & Einmal)",
                  "DSGVO-Texte & Cookie Banner",
                  "Lebenslange Updates",
                  "Discord Community Zugang"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="/auth/signin" // Link zum Kaufprozess
                className="mt-8 block w-full rounded-xl bg-gray-900 dark:bg-white dark:text-gray-900 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Zugang sichern
              </a>
              <p className="mt-4 text-xs text-center text-gray-400">
                Sichere Zahlung via Stripe. 14 Tage Geld-zurück-Garantie.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}