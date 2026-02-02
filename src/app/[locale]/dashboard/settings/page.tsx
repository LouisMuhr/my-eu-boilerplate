import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import SettingsForm from "@/components/SettingsForm";
import DashboardSidebar from "@/components/DashboardSidebar";
import Link from "next/link";
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

      {/* Mobile-Responsive Sidebar */}
      <DashboardSidebar userRow={userRow} />

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
