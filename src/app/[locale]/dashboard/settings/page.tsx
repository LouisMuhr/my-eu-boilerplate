import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import SettingsForm from "@/components/SettingsForm";
import Link from "next/link";
import { LayoutDashboard, Settings, ChevronRight, Sparkles, Star } from "lucide-react";
import { dbHelpersAsync } from "@/lib/db-new";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const t = await getTranslations("Settings");
  const userRow = await dbHelpersAsync.getUserById(session.user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 flex flex-col md:flex-row font-sans text-slate-900 dark:text-slate-100 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-rose-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Glassmorphic Sidebar */}
      <aside className="w-full md:w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col z-40 sticky top-0 h-screen shadow-2xl shadow-slate-200/20 dark:shadow-none">
        {/* Logo Section with Animation */}
        <div className="p-8 border-b border-slate-100/50 dark:border-slate-800/50">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/50 transition-all group-hover:scale-110 group-hover:rotate-3">
                <Sparkles size={24} className="animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-2xl tracking-tighter leading-none bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EU Core
              </span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1 flex items-center gap-1">
                <Star size={8} className="text-amber-400 fill-amber-400" />
                Premium Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Enhanced Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4 flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gradient-to-r from-indigo-600 to-transparent"></div>
            Navigation
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl font-medium transition-all group"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Übersicht</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="group relative flex items-center justify-between px-4 py-3.5 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="flex items-center gap-3 relative z-10">
              <Settings className="w-5 h-5" />
              <span>Einstellungen</span>
            </div>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </nav>

        {/* Enhanced User Card */}
        <div className="p-6 border-t border-slate-100/50 dark:border-slate-800/50">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-sm shadow-lg">
                  {userRow?.name?.[0] || "U"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-col min-w-0 text-left flex-1">
                <span className="text-sm font-bold truncate text-slate-900 dark:text-white">
                  {userRow?.name || "Nutzer"}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {userRow?.email}
                </span>
              </div>
              <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative overflow-y-auto">
        {/* Premium Header */}
        <header className="h-24 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl flex items-center px-8 justify-between sticky top-0 z-30 shadow-sm">
          <div>
            <h2 className="font-black text-3xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
              {t("title")}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t("subtitle")}
            </p>
          </div>
        </header>

        {/* Settings Content */}
        <div className="p-6 md:p-12 max-w-5xl mx-auto w-full">
          <SettingsForm />
        </div>

        {/* Premium Footer */}
        <footer className="mt-auto p-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Powered by EU Core Engine v2.4
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="/legal/privacy" className="hover:text-indigo-600 transition-colors">
                Datenschutz
              </Link>
              <span>•</span>
              <Link href="/legal/imprint" className="hover:text-indigo-600 transition-colors">
                Impressum
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
