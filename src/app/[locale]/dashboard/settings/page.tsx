import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import SettingsForm from "@/components/SettingsForm";
import Link from "next/link";
import { Zap, LayoutDashboard, Settings, ChevronRight } from "lucide-react";
import { dbHelpersAsync } from "@/lib/db-new";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const t = await getTranslations("Settings");

  // Get user data for sidebar
  const userRow = await dbHelpersAsync.getUserById(session.user.id);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col md:flex-row font-sans text-slate-900 dark:text-slate-100">
      {/* Sidebar Navigation - Same as Dashboard */}
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
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors cursor-pointer group"
          >
            <LayoutDashboard className="w-5 h-5" /> <span>Übersicht</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center justify-between px-4 py-3 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl font-bold border border-indigo-100 dark:border-indigo-800/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" /> <span>Einstellungen</span>
            </div>
            <ChevronRight size={14} />
          </Link>
        </nav>

        {/* User info in sidebar footer */}
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-slate-50/50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">{t("title")}</h1>
            <p className="text-slate-500 dark:text-slate-400">{t("subtitle")}</p>
          </div>

          {/* Settings Form */}
          <SettingsForm />
        </div>
      </main>
    </div>
  );
}
