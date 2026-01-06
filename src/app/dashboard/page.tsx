// Datei: src/app/dashboard/page.tsx

import { auth } from "@/auth";
import { dbHelpers } from "@/lib/db";
import DashboardActions from "@/components/DashboardActions";
import { 
  LayoutDashboard, 
  CreditCard, 
  Settings, 
  User, 
  ShieldCheck, 
  LogOut,
  Zap,
  Bell,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  // Schutz vor unbefugtem Zugriff
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Daten direkt aus der SQLite laden
  const userRow = dbHelpers.getUserById.get(session.user.id) as any;

  const user = {
    id: session.user.id,
    name: userRow?.name || "Nutzer",
    email: userRow?.email,
    subscriptionStatus: userRow?.subscriptionStatus || "free",
    stripeCustomerId: userRow?.stripeCustomerId,
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 flex flex-col md:flex-row font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30 text-gray-900 dark:text-gray-100">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-72 bg-white dark:bg-gray-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 flex flex-col z-20">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 font-black text-2xl tracking-tighter group">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xs shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              EU
            </div>
            <span>Boilerplate</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Navigation</p>
          <div className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-2xl font-bold cursor-pointer border border-blue-100 dark:border-blue-800/50">
            <LayoutDashboard className="w-5 h-5" />
            Übersicht
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl cursor-pointer transition-all group">
            <CreditCard className="w-5 h-5 group-hover:text-blue-500" />
            Abrechnung
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl cursor-pointer transition-all group">
            <Settings className="w-5 h-5 group-hover:text-blue-500" />
            Einstellungen
          </div>
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-4 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate">{user.name}</p>
                <p className="text-[10px] text-gray-400 truncate uppercase tracking-wider font-bold">{user.subscriptionStatus} Plan</p>
              </div>
            </div>
            <Link 
              href="/api/auth/signout" 
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-white dark:bg-gray-900 rounded-xl text-xs font-bold text-gray-500 hover:text-red-500 border border-gray-200 dark:border-gray-700 transition-all shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Abmelden
            </Link>
          </div>
        </div>
      </aside>

      {/* --- HAUPTBEREICH --- */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-gray-100 dark:border-gray-900 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl flex items-center px-8 justify-between sticky top-0 z-30">
          <div className="flex flex-col">
             <h2 className="font-black text-xl tracking-tight">Hallo, {user.name.split(' ')[0]} 👋</h2>
             <p className="text-xs text-gray-400 font-medium tracking-wide">Willkommen in deinem Kontrollzentrum.</p>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-400 hover:text-blue-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-gray-950"></span>
             </button>
             <div className="h-8 w-[1px] bg-gray-100 dark:bg-gray-800 mx-2"></div>
             <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-sm ${
               user.subscriptionStatus !== 'free' 
               ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
               : 'bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
             }`}>
               {user.subscriptionStatus}
             </div>
          </div>
        </header>

        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-12">
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-blue-500/20 transition-all">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 fill-blue-600/10" />
              </div>
              <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Account Status</p>
              <p className={`text-3xl font-black ${user.subscriptionStatus !== 'free' ? 'text-blue-600' : ''}`}>
                {user.subscriptionStatus !== 'free' ? 'Premium' : 'Kostenlos'}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
               <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <CreditCard className="w-6 h-6" />
              </div>
              <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Nächste Abrechnung</p>
              <p className="text-3xl font-black">--</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
               <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Compliance</p>
              <p className="text-3xl font-black text-green-600">Sicher</p>
            </div>
          </div>

          {/* Interaktive Aktionen */}
          <DashboardActions 
            userId={user.id} 
            userName={user.name}
            userEmail={user.email}
            subscriptionStatus={user.subscriptionStatus} 
            hasStripeCustomer={!!user.stripeCustomerId}
          />

          {/* Call to Action Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
               <div className="flex-1 space-y-4">
                  <h3 className="text-3xl font-black leading-tight">Bereit für den Launch?</h3>
                  <p className="opacity-80 max-w-md text-sm leading-relaxed font-medium">
                    Du hast das Fundament. Jetzt ist es Zeit, dein Produkt zu bauen. 
                    Schau dir unsere Dokumentation an, um eigene Features hinzuzufügen.
                  </p>
               </div>
               <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1 active:scale-95 whitespace-nowrap flex items-center gap-2">
                 Doku öffnen <ArrowUpRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}