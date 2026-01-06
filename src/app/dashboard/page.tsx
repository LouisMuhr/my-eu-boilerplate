// Datei: src/app/dashboard/page.tsx

import { auth } from "@/auth";
import { dbHelpers } from "@/lib/db";
import DashboardActions from "@/components/DashboardActions";
import { 
  LayoutDashboard, 
  CreditCard, 
  Settings, 
  LogOut,
  Zap,
  Bell,
  AlertTriangle,
  Info,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const userRow = dbHelpers.getUserById.get(session.user.id) as any;

  const user = {
    id: session.user.id,
    name: userRow?.name || "Nutzer",
    email: userRow?.email,
    subscriptionStatus: userRow?.subscriptionStatus || "free", // 'active', 'past_due', 'free'
    stripeCustomerId: userRow?.stripeCustomerId,
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 flex flex-col md:flex-row font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30 text-gray-900 dark:text-gray-100">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-72 bg-white dark:bg-gray-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 flex flex-col z-20">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 font-black text-2xl tracking-tighter group">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xs shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform font-bold">
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
            <a 
              href="/api/auth/signout" 
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-white dark:bg-gray-900 rounded-xl text-xs font-bold text-gray-500 hover:text-red-500 border border-gray-200 dark:border-gray-700 transition-all shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Abmelden
            </a>
          </div>
        </div>
      </aside>

      {/* --- HAUPTBEREICH --- */}
      <main className="flex-1 overflow-y-auto">
        
        {/* --- DYNAMISCHE WARNBANNER --- */}
        {user.subscriptionStatus === 'past_due' && (
          <div className="bg-red-600 text-white px-8 py-3 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-500">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <p className="text-sm font-bold tracking-tight">
                Zahlung fehlgeschlagen: Dein Premium-Zugang wird in Kürze eingeschränkt. Bitte aktualisiere deine Zahlungsdaten.
              </p>
            </div>
            <button className="text-xs font-black uppercase tracking-widest bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg transition-colors">
              Jetzt beheben
            </button>
          </div>
        )}

        {/* Hier könnte ein Banner für "Gekündigt, aber noch aktiv" stehen, falls du das Feld in der DB hast */}

        <header className="h-20 border-b border-gray-100 dark:border-gray-900 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl flex items-center px-8 justify-between sticky top-0 z-30">
          <div className="flex flex-col">
             <h2 className="font-black text-xl tracking-tight">Dashboard</h2>
             <p className="text-xs text-gray-400 font-medium tracking-wide">Willkommen zurück, {user.name.split(' ')[0]}.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-sm ${
               user.subscriptionStatus === 'active' 
               ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400' 
               : user.subscriptionStatus === 'past_due'
               ? 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400'
               : 'bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-800 dark:text-gray-400'
             }`}>
               {user.subscriptionStatus}
             </div>
          </div>
        </header>

        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-12">
          
          {/* Status Übersicht */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-8 rounded-[2.5rem] border shadow-sm transition-all ${
              user.subscriptionStatus === 'past_due' 
              ? 'bg-red-50/50 border-red-200 dark:bg-red-900/10 dark:border-red-800/50' 
              : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                user.subscriptionStatus === 'past_due' ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'
              }`}>
                {user.subscriptionStatus === 'past_due' ? <AlertTriangle className="w-6 h-6" /> : <Zap className="w-6 h-6 fill-blue-600/10" />}
              </div>
              <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Abonnement</p>
              <p className="text-3xl font-black">
                {user.subscriptionStatus === 'active' ? 'Premium' : user.subscriptionStatus === 'past_due' ? 'Zahlungsverzug' : 'Basis'}
              </p>
            </div>
            
            {/* Weitere Cards ... */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
               <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <CreditCard className="w-6 h-6" />
              </div>
              <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Zahlungsmethode</p>
              <p className="text-3xl font-black">{user.stripeCustomerId ? 'Hinterlegt' : 'Keine'}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
               <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">DSGVO Status</p>
              <p className="text-3xl font-black text-green-600">Konform</p>
            </div>
          </div>

          <DashboardActions 
            userId={user.id} 
            userName={user.name}
            userEmail={user.email}
            subscriptionStatus={user.subscriptionStatus} 
            hasStripeCustomer={!!user.stripeCustomerId}
          />
          
        </div>
      </main>
    </div>
  );
}