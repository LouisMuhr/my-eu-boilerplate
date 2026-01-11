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
  Trash2,
  AlertTriangle,
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
  const [loadingType, setLoadingType] = useState<"monthly" | "annual" | "profile" | "export" | "delete" | null>(null);
  const [name, setName] = useState(userName);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // --- STRIPE LOGIK ---
  const handleOpenPortal = async () => {
    setLoadingPortal(true);
    try {
      const res = await fetch("/api/create-portal-link", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
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
    } finally {
      setLoadingType(null);
    }
  };

  // --- PROFIL UPDATE ---
  const handleUpdateProfile = async () => {
    setLoadingType("profile");
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        // Optional: Erfolgsmeldung anzeigen
      }
    } finally {
      setLoadingType(null);
    }
  };

  // --- DSGVO DATEN EXPORT ---
  const handleExportData = async () => {
    setLoadingType("export");
    try {
      const res = await fetch("/api/export-data");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `daten-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } finally {
      setLoadingType(null);
    }
  };

  // --- KONTO LÖSCHEN ---
  const handleDeleteAccount = async () => {
    setLoadingType("delete");
    try {
      const res = await fetch("/api/delete-account", { method: "DELETE" });
      if (res.ok) {
        window.location.href = "/"; // Zurück zur Landing Page
      }
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
              <button
                onClick={() => handleCheckout("monthly")}
                disabled={!!loadingType}
                className="w-full flex items-center justify-between p-5 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-blue-500 transition-all disabled:opacity-50 group cursor-pointer"
              >
                <div className="text-left font-bold">
                  <p className="text-sm text-gray-900 dark:text-white">Monatliches Abo</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tight">Flexibel</p>
                </div>
                <div className="h-10 w-10 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center">
                  {loadingType === "monthly" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                </div>
              </button>
              <button
                onClick={() => handleCheckout("annual")}
                disabled={!!loadingType}
                className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] text-white shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 bg-white/10 text-[8px] font-black uppercase tracking-widest">-20% Sparen</div>
                <div className="text-left font-bold"><p className="text-lg">Jährliches Abo</p><p className="text-xs opacity-70">Bester Wert</p></div>
                <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  {loadingType === "annual" ? <Loader2 className="w-6 h-6 animate-spin" /> : <Star className="w-6 h-6 fill-white" />}
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
               {cancelAtPeriodEnd ? (
                  <div className="p-5 bg-amber-50 dark:bg-amber-900/10 rounded-[2rem] border border-amber-100 dark:border-amber-800/30 flex items-center gap-4">
                    <CalendarX className="w-6 h-6 text-amber-600" />
                    <div><p className="text-sm font-black text-amber-800 dark:text-amber-400">Gekündigt</p><p className="text-[10px] opacity-60">Zugriff bis {currentPeriodEnd}</p></div>
                  </div>
               ) : (
                  <div className="p-5 bg-green-50/50 dark:bg-green-900/10 rounded-[2rem] border border-green-100 dark:border-green-800/30 flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <div><p className="text-sm font-black text-green-800 dark:text-green-400">Aktiv</p><p className="text-[10px] opacity-60">Verlängerung am {currentPeriodEnd}</p></div>
                  </div>
               )}
               {hasStripeCustomer && (
                 <button onClick={handleOpenPortal} disabled={loadingPortal} className="w-full flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-transparent hover:border-blue-500 transition-all group cursor-pointer">
                   <div className="text-left font-bold"><p className="text-sm">Stripe Portal</p><p className="text-[10px] text-gray-400">Abo verwalten</p></div>
                   {loadingPortal ? <Loader2 className="w-5 h-5 animate-spin" /> : <ExternalLink className="w-5 h-5 text-gray-400" />}
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
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Kontodaten</p>
          </div>
          <User className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Anzeigename</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 px-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button 
            onClick={handleUpdateProfile} 
            disabled={loadingType === "profile"}
            className="w-full h-12 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all cursor-pointer"
          >
             {loadingType === "profile" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Speichern
          </button>
        </div>
      </div>

      {/* --- DATEN-EXPORT (DSGVO) --- */}
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 p-8 flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-black uppercase tracking-tighter text-sm">Deine Daten</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">DSGVO Art. 20 Portabilität</p>
          </div>
          <Download className="w-5 h-5 text-blue-600" />
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          Lade alle über dich gespeicherten Informationen als maschinenlesbare JSON-Datei herunter.
        </p>
        <button 
          onClick={handleExportData}
          disabled={loadingType === "export"}
          className="w-full h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-100 transition-all cursor-pointer"
        >
          {loadingType === "export" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Daten exportieren
        </button>
      </div>

      {/* --- KONTO LÖSCHEN (DANGER ZONE) --- */}
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 p-8 flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-black uppercase tracking-tighter text-sm text-red-600">Gefahrenzone</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Unwiderruflich</p>
          </div>
          <ShieldAlert className="w-5 h-5 text-red-600" />
        </div>
        
        {!showDeleteConfirm ? (
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full h-12 border border-red-200 dark:border-red-900/30 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Account löschen
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900/30 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-[10px] text-red-800 dark:text-red-400 font-bold leading-tight">
                Bist du sicher? Alle Daten und aktiven Abos werden sofort gelöscht.
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-pointer">Abbrechen</button>
              <button 
                onClick={handleDeleteAccount}
                disabled={loadingType === "delete"}
                className="flex-[2] h-12 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-700 cursor-pointer shadow-lg shadow-red-500/20"
              >
                {loadingType === "delete" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ja, endgültig löschen"}
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}