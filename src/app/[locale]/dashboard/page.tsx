import { auth } from "@/auth";
import { dbHelpersAsync, UserRow} from "@/lib/db-new";
import DashboardActions from "@/components/DashboardActions";
import {
  LayoutDashboard,
  Settings,
  CalendarX,
  Activity,
  ShieldCheck,
  Zap,
  Bell,
  TrendingUp,
  Box,
  ChevronRight,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

/**
 * DashboardPage - Die zentrale Übersicht für den Nutzer.
 * Diese Komponente ist als Server Component implementiert, um Daten direkt aus der SQLite-DB zu laden.
 */
export default async function DashboardPage() {
  const session = await auth();

  const t = await getTranslations("Dashboard");
  // Schutz der Route: Wenn keine Session vorhanden ist, Umleitung zum Login
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Daten direkt aus der SQLite laden
  const userRow = await dbHelpersAsync.getUserById(session.user.id);
  // Logik für den Abonnement-Status
  const subscriptionStatus = userRow?.subscriptionStatus || "free";
  const isCanceled = userRow?.cancelAtPeriodEnd === true;

  // Datumsformatierung für die Anzeige (z.B. Banner)
  const formattedDate = userRow?.currentPeriodEnd
    ? new Date(userRow.currentPeriodEnd).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  // Ablaufdatum für die Übergabe an die Client-Komponente DashboardActions
  const expirationDate = userRow?.currentPeriodEnd
    ? new Date(userRow.currentPeriodEnd).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Unbekannt";

  // Metriken für das UI-Grid (Können später durch echte DB-Abfragen ersetzt werden)
  const stats = [
    {
      label: "Nutzungsrate",
      value: "92%",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
    {
      label: "Aktive Projekte",
      value: "4",
      icon: Box,
      color: "text-indigo-500",
    },
    {
      label: "API Status",
      value: "Online",
      icon: Activity,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col md:flex-row font-sans text-slate-900 dark:text-slate-100">
      {/* Sidebar Navigation - Fixiert auf der linken Seite */}
      <aside className="w-full md:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-40 sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-transform group-hover:scale-105">
              <Zap size={20} fill="currentColor" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-xl tracking-tighter leading-none uppercase">
                EU Core
              </span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">
                SaaS Platform
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">
            Hauptmenü
          </div>
          <Link
            href="/dashboard"
            className="flex items-center justify-between px-4 py-3 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl font-bold border border-indigo-100 dark:border-indigo-800/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-5 h-5" /> <span>Übersicht</span>
            </div>
            <ChevronRight size={14} />
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors cursor-pointer group">
            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />{" "}
            <span>Einstellungen</span>
          </div>
        </nav>

        {/* Kurze Nutzerinfo im Footer der Sidebar */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase">
              {userRow?.name?.[0] || "U"}
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-xs font-bold truncate">
                {userRow?.name || "Nutzer"}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {userRow?.email}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50 dark:bg-slate-950">
        {/* Banner für gekündigte Abonnements */}
        {isCanceled && (
          <div className="bg-amber-500 text-white px-8 py-2 flex items-center justify-center gap-3 animate-in slide-in-from-top duration-500">
            <CalendarX size={16} className="animate-pulse" />
            <p className="text-xs font-bold tracking-wide uppercase">
              Abo endet am {formattedDate} – Jetzt verlängern für
              ununterbrochenen Zugriff
            </p>
          </div>
        )}

        {/* Header mit Breadcrumbs und Status-Indikator */}
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex items-center px-8 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <h2 className="font-black text-2xl tracking-tight text-slate-800 dark:text-white">
              Übersicht
            </h2>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                isCanceled
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : subscriptionStatus === "active"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm"
                    : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isCanceled ? "bg-amber-400" : subscriptionStatus === "active" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`}
              ></span>
              {isCanceled
                ? "Gekündigt"
                : subscriptionStatus === "active"
                  ? "Pro Plan"
                  : "Free Plan"}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold"
                >
                  <UserIcon size={12} />
                </div>
              ))}
            </div>
            <button className="h-10 w-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-all hover:shadow-sm relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white dark:border-slate-800"></span>
            </button>
          </div>
        </header>

        {/* Haupt-Inhaltsbereich */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
          {/* Begrüßung */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="text-left">
              <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {t("welcome")}{userRow?.name?.split(" ")[0]}!
              </h3>
              <p className="text-slate-500 mt-1">
                Hier ist eine Zusammenfassung deiner Ressourcen und deines
                Status.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
              <ShieldCheck size={14} className="text-indigo-500" />
              Datenschutz aktiv & verschlüsselt
            </div>
          </div>

          {/* Grid für Kurzinformationen (Stats) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4 text-left">
                  <div
                    className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon size={20} className={stat.color} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Live
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-2xl font-black tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bereich für DashboardActions (Client-seitige Logik) */}
          <div className="relative">
            {/* Dekorativer Hintergrundeffekt */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-2 sm:p-4">
              <DashboardActions
                userId={session.user.id!}
                userName={userRow?.name || "Nutzer"}
                userEmail={userRow?.email || ""}
                subscriptionStatus={subscriptionStatus}
                cancelAtPeriodEnd={isCanceled}
                currentPeriodEnd={expirationDate}
                hasStripeCustomer={!!userRow?.stripeCustomerId}
              />
            </div>
          </div>
        </div>

        {/* Footer-Informationen */}
        <footer className="mt-auto p-8 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Powered by EU Core Engine v2.4 • System Status: Operational
          </p>
        </footer>
      </main>
    </div>
  );
}
