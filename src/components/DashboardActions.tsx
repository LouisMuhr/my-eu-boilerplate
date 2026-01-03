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
  ArrowRight,
  HeartHandshake,
  ShieldAlert
} from "lucide-react";

export default function DashboardActions({
  userId,
  subscriptionStatus,
}: {
  userId: string;
  subscriptionStatus: string;
}) {
  const [loadingOneTime, setLoadingOneTime] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleCheckout = async (priceId: string | undefined, setter: (v: boolean) => void) => {
    if (!priceId) {
      alert("Stripe Price ID fehlt in der .env");
      return;
    }
    setter(true);
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
      alert("Fehler: " + err.message);
    } finally {
      setter(false);
    }
  };

  const handleExport = async () => {
    setLoadingExport(true);
    try {
      const res = await fetch("/api/export-data");
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `meine-daten-${userId}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Export Fehler:", err);
    } finally {
      setLoadingExport(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bist du sicher? Dein Account und alle Daten werden unwiderruflich gelöscht. Dies entspricht Art. 17 DSGVO."))
      return;

    setLoadingDelete(true);
    try {
      const res = await fetch("/api/delete-account", { method: "POST" });
      if (res.ok) {
        window.location.href = "/auth/signin?deleted=true";
      }
    } catch (err) {
      console.error("Delete Fehler:", err);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* --- Upgrade & Growth Section --- */}
      <div className="group bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden">
        <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Zap className="w-5 h-5 text-blue-600 fill-blue-600/10" /> Dein Wachstum
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Schalte das volle Potenzial frei</p>
          </div>
          {subscriptionStatus !== 'free' && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-100 dark:border-green-800">
              <CheckCircle2 className="w-3 h-3" /> Aktiv
            </div>
          )}
        </div>
        
        <div className="p-8 space-y-6">
          <button
            onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME, setLoadingOneTime)}
            disabled={loadingOneTime || subscriptionStatus !== 'free'}
            className="w-full group/btn relative flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 disabled:opacity-50 disabled:grayscale"
          >
            <div className="text-left space-y-1">
              <p className="font-bold text-sm text-gray-900 dark:text-white group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 transition-colors">Lifetime Access</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Einmal zahlen, für immer besitzen.</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-950 flex items-center justify-center group-hover/btn:bg-blue-50 dark:group-hover/btn:bg-blue-900/30 transition-colors">
              {loadingOneTime ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : <ArrowRight className="w-5 h-5 text-gray-400 group-hover/btn:text-blue-600" />}
            </div>
          </button>

          <button
            onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION, setLoadingSubscription)}
            disabled={loadingSubscription || subscriptionStatus !== 'free'}
            className="w-full relative flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:translate-y-0"
          >
            <div className="text-left space-y-1">
              <p className="font-black text-base">Pro Subscription</p>
              <p className="text-xs text-blue-100/80">Vollständige EU-Compliance Automatisierung.</p>
            </div>
            <div className="h-12 w-12 bg-white/20 rounded-xl backdrop-blur-md flex items-center justify-center">
              {loadingSubscription ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : <Zap className="w-6 h-6 text-white fill-white" />}
            </div>
          </button>
        </div>
      </div>

      {/* --- Trust & Security Section --- */}
      <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <ShieldCheck className="w-5 h-5 text-green-600" /> Vertrauen & Kontrolle
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Deine Daten gehören dir allein</p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
            <HeartHandshake className="w-5 h-5" />
          </div>
        </div>
        
        <div className="p-8 space-y-6 flex-1 flex flex-col justify-center">
          {/* Data Transparency */}
          <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 group/item">
            <div className="space-y-1">
              <p className="font-bold text-sm text-gray-900 dark:text-white">Transparenz-Bericht</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Exportiere alle gespeicherten Daten (Art. 15).</p>
            </div>
            <button
              onClick={handleExport}
              disabled={loadingExport}
              className="h-12 w-12 flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm disabled:opacity-50"
            >
              {loadingExport ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : <Download className="w-5 h-5" />}
            </button>
          </div>

          {/* Account Termination */}
          <div className="flex items-center justify-between p-5 bg-red-50/30 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 group/item">
            <div className="space-y-1">
              <p className="font-bold text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
                Recht auf Vergessen <ShieldAlert className="w-3.5 h-3.5" />
              </p>
              <p className="text-xs text-red-600/60 dark:text-red-400/60">Unwiderrufliche Löschung deines Accounts.</p>
            </div>
            <button
              onClick={handleDelete}
              disabled={loadingDelete}
              className="h-12 w-12 flex items-center justify-center bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
            >
              {loadingDelete ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}