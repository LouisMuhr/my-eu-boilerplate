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
  Zap
} from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();

  // Sicherheits-Check (obwohl Middleware schützt, für TS-Typen notwendig)
  if (!session?.user?.id) return null;

  const userRow = dbHelpers.getUserById.get(session.user.id) as any;

  const user = {
    id: session.user.id,
    name: session.user.name || "Nutzer",
    email: session.user.email,
    subscriptionStatus: userRow?.subscriptionStatus || "free",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 flex flex-col z-20">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">
              EU
            </div>
            <span>Boilerplate</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl font-semibold cursor-pointer transition-all">
            <LayoutDashboard className="w-5 h-5" />
            Übersicht
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl cursor-pointer transition-all group">
            <CreditCard className="w-5 h-5 group-hover:text-blue-500" />
            Abrechnung
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl cursor-pointer transition-all group">
            <Settings className="w-5 h-5 group-hover:text-blue-500" />
            Einstellungen
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <Link 
            href="/api/auth/signout" 
            className="mt-2 flex items-center justify-center gap-2 w-full py-2 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Abmelden
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md flex items-center px-8 justify-between sticky top-0 z-10">
          <h2 className="font-bold text-lg tracking-tight">Mein Dashboard</h2>
          <div className="flex items-center gap-3">
             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
               user.subscriptionStatus !== 'free' 
               ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
               : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
             }`}>
               {user.subscriptionStatus} Plan
             </span>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8">
          {/* Welcome & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">Abo-Status</p>
              <p className={`text-2xl font-black ${user.subscriptionStatus !== 'free' ? 'text-green-600' : 'text-gray-400'}`}>
                {user.subscriptionStatus !== 'free' ? 'Aktiv' : 'Basis'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">Nächste Abrechnung</p>
              <p className="text-2xl font-black">--</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">API-Requests</p>
              <p className="text-2xl font-black">0 / 1k</p>
            </div>
          </div>

          {/* Interactive Actions (Client Component) */}
          <DashboardActions 
            userId={user.id} 
            subscriptionStatus={user.subscriptionStatus} 
          />

          {/* SaaS Content Placeholder */}
          <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
            <Zap className="absolute -right-4 -bottom-4 w-40 h-40 opacity-10 rotate-12" />
            <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-2">Bereit für den nächsten Schritt?</h3>
               <p className="opacity-90 max-w-md mb-6 text-sm">
                 Hier ist der Platz für deinen eigentlichen SaaS-Content. 
                 Bau dein Produkt auf diesem Fundament auf.
               </p>
               <button className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg">
                 Dokumentation lesen
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}