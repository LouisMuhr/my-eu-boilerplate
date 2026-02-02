// Datei: src/app/admin/page.tsx

import { requireAdmin } from "../../../lib/admin";
import { dbHelpersAsync } from "../../../lib/db-new";
import { 
  Users, 
  BadgeEuro, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowLeft,
  AlertTriangle,
  Activity
} from "lucide-react";
import Link from "next/link";
import AdminTable from "./AdminTable"; // Die Client-Komponente für Interaktion
import Stripe from "stripe";
import { env } from "@/env";

// Stripe Initialisierung für dynamische Preisabfrage
const stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia" as any,
});

/**
 * Die AdminPage ist eine Server Component.
 * Vorteile: 
 * 1. Direktzugriff auf die DB ohne API-Latency.
 * 2. Secrets (Stripe Key) bleiben auf dem Server.
 * 3. requireAdmin schützt die gesamte Route vor unbefugtem Zugriff.
 */
export default async function AdminPage() {
  // 1. Sicherheit: Nur Admins (E-Mail in lib/admin.ts hinterlegt) dürfen hier rein
  await requireAdmin();

  // 2. Daten laden (Alle User aus der lokalen SQLite)
  // Wir casten als any, um TypeScript-Hürden bei benutzerdefinierten Helpers zu umgehen
  const users = await (dbHelpersAsync as any).getAllUsers() as any[];

  // 3. Preis-Details von Stripe abrufen
  // Wir nehmen die ID aus der ENV und fragen Stripe nach dem Wert (in Cents)
  let unitAmount = 0;
  let currency = "eur";
  
  try {
    const priceId = env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY;
    if (priceId) {
      const price = await stripe.prices.retrieve(priceId);
      unitAmount = price.unit_amount || 0;
      currency = price.currency;
    } else {
      // Fallback auf Wert aus ENV, falls keine Price-ID vorhanden
      unitAmount = 999;
    }
  } catch (error) {
    console.error("Stripe Price Fetch Fehler:", error);
    unitAmount = 0;
  }

  const priceInEuro = unitAmount / 100;

  // 4. Metriken berechnen
  const totalUsers = users.length;
  const paidUsers = users.filter((u) => u.subscriptionStatus === "active").length;
  const churnedUsers = users.filter((u) => u.subscriptionStatus === "past_due").length;
  const estimatedMRR = paidUsers * priceInEuro;

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans pb-20">
      
      {/* Top Header Navigation */}
      <header className="bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 px-8 py-4 sticky top-0 z-30 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-[10px] shadow-lg shadow-red-500/20">
              ADM
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight">Mission Control</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Administration</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-mono text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-800 flex items-center gap-2">
            <Activity className="w-3 h-3 animate-pulse" />
            Live Database Connected
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 space-y-10">
        
        {/* Statistics Cards (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { 
              label: "Gesamt Nutzer", 
              value: totalUsers, 
              icon: Users, 
              color: "text-blue-500",
              desc: "Registrierte Accounts" 
            },
            { 
              label: "Aktive Abos", 
              value: paidUsers, 
              icon: CheckCircle2, 
              color: "text-green-500",
              desc: "Zahlende Kunden" 
            },
            { 
              label: "MRR (Schätzung)", 
              value: estimatedMRR.toLocaleString('de-DE', { style: 'currency', currency: currency.toUpperCase() }), 
              icon: BadgeEuro, 
              color: "text-purple-500",
              desc: "Umsatz pro Monat" 
            },
            { 
              label: "Zahlungsverzug", 
              value: churnedUsers, 
              icon: ShieldAlert, 
              color: "text-red-500",
              desc: "Problemfälle" 
            },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">{stat.label}</p>
                  <p className="text-[9px] text-gray-400 font-medium mt-1 uppercase tracking-tight">{stat.desc}</p>
                </div>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Die interaktive Nutzer-Tabelle (Client Component) */}
        <AdminTable initialUsers={users} />

        {/* Legend / Security Note */}
        <div className="p-8 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-[2.5rem] flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-black text-amber-900 dark:text-amber-400 text-sm uppercase tracking-wide">Administrator Sicherheitshinweis</h4>
            <p className="text-sm text-amber-700 dark:text-amber-500/80 mt-1 leading-relaxed">
              Das Löschen eines Benutzers in diesem Dashboard entfernt lediglich den Eintrag aus der lokalen SQLite-Datenbank. 
              <strong> WICHTIG:</strong> Bestehende Abonnements bei Stripe müssen separat im Stripe Dashboard gekündigt werden, 
              um weitere Abbuchungen zu verhindern. Gelöschte Nutzer verlieren sofortigen Zugang zum System.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center opacity-20 hover:opacity-50 transition-opacity">
           <p className="text-[10px] font-black uppercase tracking-[0.3em]">EU Boilerplate v1.0 Admin Engine</p>
        </div>
      </main>
    </div>
  );
}