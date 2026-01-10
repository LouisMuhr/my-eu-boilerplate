"use client";

import { useState } from "react";
import { 
  CreditCard, 
  Loader2, 
  CheckCircle2,
  Zap,
  ExternalLink,
  CalendarX,
  User,
  Save,
  Download,
  ShieldAlert,
  Star
} from "lucide-react";

interface DashboardActionsProps {
  userId: string;
  userName: string;
  userEmail: string;
  subscriptionStatus: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string | null;
  hasStripeCustomer: boolean;
}

export default function DashboardActions({
  userName,
  subscriptionStatus,
  cancelAtPeriodEnd,
  currentPeriodEnd,
  hasStripeCustomer
}: DashboardActionsProps) {
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [loadingType, setLoadingType] = useState<"monthly" | "annual" | null>(null);
  const [name, setName] = useState(userName);

  const handleOpenPortal = async () => {
    setLoadingPortal(true);
    try {
      const res = await fetch("/api/create-portal-link", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error);
    } catch (err: any) {
      console.error("Portal Error:", err);
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleCheckout = async (type: "monthly" | "annual") => {
    setLoadingType(type);
    const priceId = type === "monthly" 
      ? process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY 
      : process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY;

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        body: JSON.stringify({ priceId }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error);
    } catch (err: any) {
      console.error("Checkout Error:", err);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* --- ABRECHNUNG & STATUS --- */}
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-500">
        <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gradient-to-br from-blue-50/30 to-transparent flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-black uppercase tracking-tighter text-sm">Abrechnung</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Plan & Abo-Status</p>
          </div>
          <CreditCard className="w-5 h-5 text-blue-600" />
        </div>
        
        <div className="p-8 space-y-4 flex-1 flex flex-col justify-center">
          {subscriptionStatus === 'free' ? (
            <div className="grid grid-cols-1 gap-4">
              {/* Monatliches Abo */}
              <button
                onClick={() => handleCheckout("monthly")}
                disabled={!!loadingType}
                className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-blue-500 transition-all disabled:opacity-50 group cursor-pointer"
              >
                <div className="text-left font-bold">
                  <p className="text-sm text-gray-900 dark:text-white">Monatliches Abo</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tight">Maximale Flexibilität</p>
                </div>
                <div className="h-10 w-10 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 transition-colors">
                  {loadingType === "monthly" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                </div>
              </button>

              {/* Jährliches Abo (Highlight) */}
              <button
                onClick={() => handleCheckout("annual")}
                disabled={!!loadingType}
                className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] text-white shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 bg-white/10 text-[8px] font-black uppercase tracking-widest">
                  -20% Ersparnis
                </div>
                <div className="text-left font-bold">
                  <p className="text-lg">Jährliches Abo</p>
                  <p className="text-xs opacity-70">Bester Wert für Profis</p>
                </div>
                <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {loadingType === "annual" ? <Loader2 className="w-6 h-6 animate-spin" /> : <Star className="w-6 h-6 fill-white" />}
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
               {/* Abo-Logik: Gekündigt vs Aktiv */}
               {cancelAtPeriodEnd ? (
                  <div className="p-5 bg-amber-50 dark:bg-amber-900/10 rounded-[2rem] border border-amber-100 dark:border-amber-800/30 flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/40 rounded-2xl flex items-center justify-center text-amber-600">
                      <CalendarX className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-amber-800 dark:text-amber-400">Abo gekündigt</p>
                      <p className="text-[10px] text-amber-700/60 font-bold uppercase tracking-tight">Erlischt am {currentPeriodEnd}</p>
                    </div>
                  </div>
               ) : (
                  <div className="p-5 bg-green-50/50 dark:bg-green-900/10 rounded-[2rem] border border-green-100 dark:border-green-800/30 flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-green-800 dark:text-green-400">Abo ist aktiv</p>
                      <p className="text-[10px] text-green-700/60 font-bold uppercase tracking-tight">Verlängerung am {currentPeriodEnd}</p>
                    </div>
                  </div>
               )}
               
               {hasStripeCustomer && (
                 <button
                   onClick={handleOpenPortal}
                   disabled={loadingPortal}
                   className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50/30 transition-all group cursor-pointer"
                 >
                   <div className="text-left font-bold">
                     <p className="text-sm group-hover:text-blue-600 transition-colors">Stripe Portal öffnen</p>
                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">Abo verwalten & Kündigen</p>
                   </div>
                   <div className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 group-hover:text-blue-600">
                     {loadingPortal ? <Loader2 className="w-5 h-5 animate-spin" /> : <ExternalLink className="w-5 h-5" />}
                   </div>
                 </button>
               )}
            </div>
          )}
        </div>
      </div>

      {/* --- PROFIL UPDATE --- */}
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm p-8 flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-black uppercase tracking-tighter text-sm">Profil</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Persönliche Informationen</p>
          </div>
          <User className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Vollständiger Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <button className="w-full h-12 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg cursor-pointer">
             <Save className="w-4 h-4" /> Speichern
          </button>
        </div>
      </div>

      {/* --- DATEN & DSGVO --- */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center text-blue-600 border border-blue-100 dark:border-blue-800">
               <Download className="w-8 h-8" />
            </div>
            <div>
               <p className="font-black text-xl tracking-tighter">Daten-Export</p>
               <p className="text-sm text-gray-400 max-w-sm">Lade alle deine gespeicherten Informationen als JSON-Datei herunter (DSGVO Art. 20).</p>
            </div>
         </div>
         <button className="h-14 px-8 bg-gray-100 dark:bg-gray-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors cursor-pointer">
            Export starten
         </button>
      </div>

    </div>
  );
}