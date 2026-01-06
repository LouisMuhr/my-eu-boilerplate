// Datei: src/components/DashboardActions.tsx

"use client";

import { useState } from "react";
import { 
  Download, 
  Trash2, 
  CreditCard, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2,
  Zap,
  ExternalLink,
  ShieldAlert,
  User,
  Save,
  ArrowRight
} from "lucide-react";

interface DashboardActionsProps {
  userId: string;
  userName: string;
  userEmail: string;
  subscriptionStatus: string;
  hasStripeCustomer: boolean;
}

export default function DashboardActions({
  userId,
  userName,
  userEmail,
  subscriptionStatus,
  hasStripeCustomer
}: DashboardActionsProps) {
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [name, setName] = useState(userName);

  // --- STRIPE PORTAL (ABO VERWALTEN) ---
  const handleOpenPortal = async () => {
    setLoadingPortal(true);
    try {
      const res = await fetch("/api/create-portal-link", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Portal konnte nicht geladen werden.");
      }
    } catch (err: any) {
      console.error("Portal Fehler:", err.message);
      alert(err.message);
    } finally {
      setLoadingPortal(false);
    }
  };

  // --- STRIPE CHECKOUT (UPGRADE) ---
  const handleCheckout = async () => {
    setLoadingCheckout(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        body: JSON.stringify({ 
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION 
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Checkout fehlgeschlagen.");
      }
    } catch (err: any) {
      console.error("Checkout Fehler:", err.message);
      alert(err.message);
    } finally {
      setLoadingCheckout(false);
    }
  };

  // --- PROFIL UPDATE ---
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Update fehlgeschlagen.");
      // In einer echten App würden wir hier die Seite neu laden oder den State global updaten
      alert("Profil erfolgreich aktualisiert!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoadingUpdate(false);
    }
  };

  // --- DSGVO EXPORT ---
  const handleExport = async () => {
    setLoadingExport(true);
    try {
      const res = await fetch("/api/export-data");
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `user-data-${userId}.json`;
        a.click();
      }
    } finally {
      setLoadingExport(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* --- ABRECHNUNG & STATUS --- */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
        <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-black flex items-center gap-2 text-gray-900 dark:text-white uppercase tracking-tighter">Abrechnung</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Finanzen & Abonnements</p>
          </div>
          {subscriptionStatus !== 'free' && (
            <div className="h-10 w-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 border border-green-100 dark:border-green-800">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}
        </div>
        
        <div className="p-8 space-y-6 flex-1 flex flex-col justify-center">
          {subscriptionStatus === 'free' ? (
            <button
              onClick={handleCheckout}
              disabled={loadingCheckout}
              className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all disabled:opacity-50 group/btn"
            >
              <div className="text-left font-bold">
                <p className="text-lg">Pro Plan aktivieren</p>
                <p className="text-xs opacity-80">Voller Zugriff für 9.99€/Monat</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                {loadingCheckout ? <Loader2 className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6 fill-white" />}
              </div>
            </button>
          ) : (
            <div className="space-y-4">
               <div className="p-5 bg-green-50/50 dark:bg-green-900/10 rounded-3xl border border-green-100 dark:border-green-800/30 flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center text-green-600">
                     <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-green-800 dark:text-green-400">Abo ist aktiv</p>
                    <p className="text-[10px] text-green-700/60 dark:text-green-500/60 font-bold uppercase">Nächste Abrechnung folgt automatisch</p>
                  </div>
               </div>
               
               {hasStripeCustomer && (
                 <button
                   onClick={handleOpenPortal}
                   disabled={loadingPortal}
                   className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all group/portal"
                 >
                   <div className="text-left">
                     <p className="font-black text-sm dark:text-white group-hover/portal:text-blue-600 transition-colors">Zahlungsdetails verwalten</p>
                     <p className="text-xs text-gray-400 font-medium tracking-tight">Rechnungen, Kündigung & Karten</p>
                   </div>
                   <div className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center group-hover/portal:text-blue-600 transition-colors">
                     {loadingPortal ? <Loader2 className="w-5 h-5 animate-spin" /> : <ExternalLink className="w-5 h-5" />}
                   </div>
                 </button>
               )}
            </div>
          )}
        </div>
      </div>

      {/* --- PROFIL EINSTELLUNGEN --- */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-black flex items-center gap-2 uppercase tracking-tighter">Profil</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Persönliche Identität</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
            <User className="w-5 h-5" />
          </div>
        </div>
        
        <form onSubmit={handleUpdateProfile} className="p-8 space-y-6 flex-1 flex flex-col justify-center">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Anzeigename</label>
            <div className="relative">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-sm dark:text-white"
                placeholder="Dein Name"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">E-Mail (Nur Lesezugriff)</label>
            <input 
              type="email" 
              value={userEmail}
              disabled
              className="w-full h-14 px-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 text-gray-400 font-medium text-sm cursor-not-allowed opacity-60"
            />
          </div>

          <button 
            type="submit"
            disabled={loadingUpdate}
            className="w-full h-14 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-gray-100 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loadingUpdate ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Änderungen speichern</>}
          </button>
        </form>
      </div>

      {/* --- SICHERHEIT & DSGVO --- */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-500">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-[1.5rem] flex items-center justify-center text-green-600 border border-green-100 dark:border-green-800/30">
              <ShieldCheck className="w-8 h-8" />
           </div>
           <div className="space-y-1">
              <p className="font-black text-xl tracking-tighter dark:text-white">Transparenz & Sicherheit</p>
              <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-sm">Deine Daten werden nach höchsten EU-Standards verschlüsselt und DSGVO-konform verarbeitet.</p>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
           <button 
            onClick={handleExport}
            disabled={loadingExport}
            className="h-14 px-8 bg-gray-50 dark:bg-gray-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-3 border border-gray-100 dark:border-gray-700"
           >
              {loadingExport ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Download className="w-4 h-4" /> Datenexport</>}
           </button>
           <button 
            className="h-14 px-8 border-2 border-red-50 dark:border-red-900/20 text-red-600 dark:text-red-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center justify-center gap-3"
           >
              <ShieldAlert className="w-4 h-4" /> Account löschen
           </button>
        </div>
      </div>

    </div>
  );
}