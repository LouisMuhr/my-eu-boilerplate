// Datei: src/app/dashboard/page.tsx

import { auth } from "../../auth";
import { dbHelpers, UserRow } from "../../lib/db";
import DashboardActions from "../../components/DashboardActions";
import {
  LayoutDashboard,
  Settings,
  CalendarX,
  Activity,
  ShieldCheck,
  Zap,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Daten direkt aus der SQLite laden
  const userRow = dbHelpers.getUserById.get(session.user.id) as
    | UserRow
    | undefined;
  console.log(userRow?.cancelAtPeriodEnd, userRow?.currentPeriodEnd);
  // Logik für den Abo-Status
  const subscriptionStatus = userRow?.subscriptionStatus || "free";
  const isCanceled = userRow?.cancelAtPeriodEnd === 1;

  // Datum für die deutsche Anzeige formatieren
  const formattedDate = userRow?.currentPeriodEnd
    ? new Date(userRow.currentPeriodEnd).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const expirationDate = userRow?.currentPeriodEnd
    ? new Date(userRow.currentPeriodEnd).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Unbekannt";

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 flex flex-col md:flex-row font-sans text-gray-900 dark:text-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col z-20">
        <div className="p-8 font-black text-2xl tracking-tighter flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xs">
            EU
          </div>
          <span>Dashboard</span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-2xl font-bold border border-blue-100 dark:border-blue-800/50"
          >
            <LayoutDashboard className="w-5 h-5" /> Übersicht
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl font-medium transition-colors cursor-pointer">
            <Settings className="w-5 h-5" /> Einstellungen
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {/* Kündigungs-Banner: Nur anzeigen, wenn gekündigt wurde aber noch aktiv ist */}
        {isCanceled && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <CalendarX className="w-5 h-5" />
              <p className="text-sm font-bold">
                Abo gekündigt. Dein Pro-Zugriff bleibt bis zum{" "}
                <span className="underline">{formattedDate}</span> bestehen.
              </p>
            </div>
          </div>
        )}

        <header className="h-20 border-b border-gray-100 dark:border-gray-900 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl flex items-center px-8 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="font-black text-xl tracking-tight">Übersicht</h2>
            <div
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                isCanceled
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : subscriptionStatus === "active"
                  ? "bg-green-50 text-green-700 border-green-100"
                  : "bg-gray-100 text-gray-500 border-gray-200"
              }`}
            >
              {isCanceled ? "Gekündigt" : subscriptionStatus}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-gray-800"></span>
            </div>
          </div>
        </header>
        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-12">
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
      </main>
    </div>
  );
}
