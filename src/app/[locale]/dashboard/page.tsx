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
  Sparkles,
  Heart,
  Star,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

/**
 * DashboardPage - Premium emotional design with micro-interactions
 * Focuses on delight, engagement, and professional polish
 */
export default async function DashboardPage() {
  const session = await auth();

  const t = await getTranslations("Dashboard");
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const userRow = await dbHelpersAsync.getUserById(session.user.id);
  const subscriptionStatus = userRow?.subscriptionStatus || "free";
  const isCanceled = userRow?.cancelAtPeriodEnd === true;

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

  const daysRemaining = userRow?.currentPeriodEnd && subscriptionStatus === "active"
    ? Math.max(0, Math.floor((new Date(userRow.currentPeriodEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  // Enhanced stats with emotional design
  const stats = [
    {
      label: t("stats.accountStatus"),
      value: userRow?.emailVerified ? t("stats.verified") : t("stats.pending"),
      icon: ShieldCheck,
      color: userRow?.emailVerified ? "text-emerald-500" : "text-amber-500",
      bgGradient: userRow?.emailVerified
        ? "from-emerald-500/10 to-teal-500/5"
        : "from-amber-500/10 to-orange-500/5",
      glowColor: userRow?.emailVerified ? "emerald" : "amber",
    },
    {
      label: t("stats.subscription"),
      value: subscriptionStatus === "active"
        ? (isCanceled ? t("stats.ending") : t("stats.active"))
        : "Free",
      icon: subscriptionStatus === "active" ? Zap : Box,
      color: subscriptionStatus === "active"
        ? (isCanceled ? "text-amber-500" : "text-indigo-500")
        : "text-slate-500",
      bgGradient: subscriptionStatus === "active"
        ? (isCanceled ? "from-amber-500/10 to-orange-500/5" : "from-indigo-500/10 to-purple-500/5")
        : "from-slate-500/10 to-slate-500/5",
      glowColor: subscriptionStatus === "active" ? (isCanceled ? "amber" : "indigo") : "slate",
    },
    {
      label: t("stats.planExpiry"),
      value: daysRemaining !== null ? `${daysRemaining} ${t("stats.days")}` : "–",
      icon: Activity,
      color: daysRemaining !== null && daysRemaining < 7 ? "text-red-500" : "text-blue-500",
      bgGradient: daysRemaining !== null && daysRemaining < 7
        ? "from-red-500/10 to-pink-500/5"
        : "from-blue-500/10 to-cyan-500/5",
      glowColor: daysRemaining !== null && daysRemaining < 7 ? "red" : "blue",
    },
  ];

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
            className="group relative flex items-center justify-between px-4 py-3.5 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="flex items-center gap-3 relative z-10">
              <LayoutDashboard className="w-5 h-5" />
              <span>Übersicht</span>
            </div>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl font-medium transition-all group"
          >
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-all duration-500" />
            <span>Einstellungen</span>
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

      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Premium Cancellation Banner */}
        {isCanceled && (
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white px-8 py-4 flex items-center justify-center gap-3 shadow-lg">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGQ9Ik0wIDBoMjB2MjBIMHoiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50"></div>
            <CalendarX size={20} className="animate-bounce" />
            <p className="text-sm font-bold tracking-wide relative z-10">
              ⚠️ Abo endet am {formattedDate} – Verlängere jetzt für ununterbrochenen Zugriff!
            </p>
            <button className="px-4 py-2 bg-white text-amber-600 rounded-xl font-bold text-xs hover:bg-amber-50 transition-all shadow-lg">
              Jetzt verlängern
            </button>
          </div>
        )}

        {/* Enhanced Glassmorphic Header */}
        <header className="h-24 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl flex items-center px-8 justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-6">
            <div>
              <h2 className="font-black text-3xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
                Übersicht
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Dashboard • {new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-slate-300 to-transparent hidden md:block"></div>
            <div
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all shadow-lg backdrop-blur-sm ${
                isCanceled
                  ? "bg-amber-500/10 text-amber-700 border-amber-300 dark:border-amber-700"
                  : subscriptionStatus === "active"
                    ? "bg-emerald-500/10 text-emerald-700 border-emerald-300 dark:border-emerald-700"
                    : "bg-slate-500/10 text-slate-600 border-slate-300 dark:border-slate-700"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isCanceled ? "bg-amber-500 animate-pulse" : subscriptionStatus === "active" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
              ></span>
              {isCanceled
                ? "⚠️ Gekündigt"
                : subscriptionStatus === "active"
                  ? "✨ Pro Plan"
                  : "Free Plan"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative h-11 w-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:shadow-lg hover:scale-105 group">
              <Bell className="w-5 h-5 group-hover:animate-bounce" />
              <span className="absolute top-2 right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border-2 border-white dark:border-slate-800"></span>
              </span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="p-6 md:p-12 max-w-7xl mx-auto w-full space-y-10">
          {/* Premium Welcome Section */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
                  <h3 className="text-4xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-600 to-purple-600 dark:from-white dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {t("welcome")}{userRow?.name?.split(" ")[0]}!
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Schön dich wiederzusehen! Hier ist deine persönliche Übersicht.
                </p>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200 dark:border-emerald-800 backdrop-blur-sm">
                <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400" />
                <div className="text-left">
                  <p className="text-xs font-black text-emerald-900 dark:text-emerald-100 uppercase tracking-wider">
                    🔒 Sicher & Verschlüsselt
                  </p>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                    DSGVO-konform
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

                {/* Card */}
                <div className="relative h-full bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-indigo-300 dark:group-hover:border-indigo-700 overflow-hidden">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl blur-lg opacity-50`}></div>
                        <div className={`relative p-3 rounded-2xl bg-gradient-to-br ${stat.bgGradient} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                          <stat.icon size={24} className={`${stat.color} group-hover:scale-110 transition-transform duration-500`} />
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        Live
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-4xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {stat.value}
                      </p>
                      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        {stat.label}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Cards */}
          {subscriptionStatus === "free" && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjAgMGEyMCAyMCAwIDEgMCA0MCAwYTIwIDIwIDAgMSAwIC00MCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-20"></div>
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                      <h3 className="text-2xl font-black">Upgrade auf Pro</h3>
                    </div>
                    <p className="text-indigo-100 text-sm">
                      Schalte alle Premium-Features frei und erlebe das volle Potenzial!
                    </p>
                  </div>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('[class*="Abrechnung"]')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3 group/btn"
                  >
                    <Zap className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" fill="currentColor" />
                    Jetzt upgraden
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard Actions with Enhanced Design */}
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-[3rem] blur-3xl"></div>
            <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[3rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-4 sm:p-8">
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

        {/* Premium Footer */}
        <footer className="mt-auto p-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Powered by EU Core Engine v2.4 • System Status: Operational
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="/legal/privacy" className="hover:text-indigo-600 transition-colors">
                Datenschutz
              </Link>
              <span>•</span>
              <Link href="/legal/imprint" className="hover:text-indigo-600 transition-colors">
                Impressum
              </Link>
              <span>•</span>
              <Link href="/dashboard/settings" className="hover:text-indigo-600 transition-colors">
                Einstellungen
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
