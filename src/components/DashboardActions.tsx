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
  Star,
  Sparkles,
  Crown,
  TrendingUp,
} from "lucide-react";
import { updateUserName } from "@/app/[locale]/dashboard/actions";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState<string | null>(null);
  const [name, setName] = useState(userName);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleUpdateName = async () => {
    setLoading("name");
    const formData = new FormData();
    formData.append("name", name);

    const result = await updateUserName(formData);

    if (result.success) {
      toast.success("Name erfolgreich gespeichert!");
    } else {
      toast.error(result.error || "Etwas ist schiefgelaufen.");
    }
    setLoading(null);
  };

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
      toast.success("Daten erfolgreich exportiert!");
    } catch (error) {
      toast.error("Fehler beim Export");
    } finally {
      setLoadingType(null);
    }
  };

  const handleDeleteAccount = async () => {
    setLoadingType("delete");
    try {
      const res = await fetch("/api/delete-account", { method: "DELETE" });
      if (res.ok) {
        toast.success("Account erfolgreich gelöscht");
        window.location.href = "/";
      } else {
        toast.error("Fehler beim Löschen");
      }
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* BILLING & SUBSCRIPTION - Premium Card */}
      <div className="group relative">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
          {/* Header with Pattern */}
          <div className="relative p-8 border-b border-slate-100/50 dark:border-slate-800/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDIiIGQ9Ik0wIDBoMjB2MjBIMHoiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-40"></div>
            <div className="relative flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-black uppercase tracking-tighter text-base text-slate-900 dark:text-white">Abrechnung</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Plan & Abo-Status</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl blur-md opacity-50"></div>
                <div className="relative p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-4 flex-1 flex flex-col justify-center">
            {subscriptionStatus === 'free' ? (
              <div className="space-y-4">
                {/* Monthly Plan */}
                <button
                  onClick={() => handleCheckout("monthly")}
                  disabled={!!loadingType}
                  className="group/btn relative w-full overflow-hidden rounded-[2rem] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-between p-6 border-2 border-slate-200 dark:border-slate-700 group-hover/btn:border-indigo-400 dark:group-hover/btn:border-indigo-600 rounded-[2rem] transition-all">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                        <p className="text-sm font-black text-slate-900 dark:text-white">Monatliches Abo</p>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-tight font-bold">Flexibel kündbar</p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl blur-md opacity-50"></div>
                      <div className="relative h-12 w-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-2xl flex items-center justify-center group-hover/btn:scale-110 group-hover/btn:rotate-6 transition-all duration-300">
                        {loadingType === "monthly" ? <Loader2 className="w-5 h-5 animate-spin text-indigo-600" /> : <Zap className="w-5 h-5 text-indigo-600" />}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Annual Plan - Premium */}
                <button
                  onClick={() => handleCheckout("annual")}
                  disabled={!!loadingType}
                  className="group/btn relative w-full overflow-hidden rounded-[2rem] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0yMCAyMG0tMTUgMGExNSAxNSAwIDEgMCAzMCAwYTE1IDE1IDAgMSAwIC0zMCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-30"></div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[8px] font-black uppercase tracking-widest text-white border border-white/30 flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    20% Sparen
                  </div>

                  <div className="relative flex items-center justify-between p-6 text-white">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        <p className="text-lg font-black">Jährliches Abo</p>
                      </div>
                      <p className="text-xs opacity-90 font-bold">Bester Preis & voller Zugriff</p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/30 rounded-2xl blur-lg"></div>
                      <div className="relative h-14 w-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300 border border-white/30">
                        {loadingType === "annual" ? <Loader2 className="w-6 h-6 animate-spin" /> : <Star className="w-6 h-6 fill-white" />}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                 {/* Status Card */}
                 {cancelAtPeriodEnd ? (
                    <div className="relative p-6 rounded-[2rem] border-2 border-amber-200 dark:border-amber-800 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10"></div>
                      <div className="relative flex items-center gap-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl">
                          <CalendarX className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-amber-900 dark:text-amber-100">⚠️ Gekündigt</p>
                          <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5 font-bold">Zugriff bis {currentPeriodEnd}</p>
                        </div>
                      </div>
                    </div>
                 ) : (
                    <div className="relative p-6 rounded-[2rem] border-2 border-emerald-200 dark:border-emerald-800 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10"></div>
                      <div className="relative flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                          <div className="relative p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-black text-emerald-900 dark:text-emerald-100">✅ Aktiv</p>
                          <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5 font-bold">Verlängerung am {currentPeriodEnd}</p>
                        </div>
                      </div>
                    </div>
                 )}

                 {/* Portal Button */}
                 {hasStripeCustomer && (
                   <button onClick={handleOpenPortal} disabled={loadingPortal} className="group/portal relative w-full overflow-hidden rounded-[2rem] transition-all hover:scale-[1.02]">
                     <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900"></div>
                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 opacity-0 group-hover/portal:opacity-100 transition-opacity"></div>
                     <div className="relative flex items-center justify-between p-5 border-2 border-slate-200 dark:border-slate-700 group-hover/portal:border-indigo-400 dark:group-hover/portal:border-indigo-600 rounded-[2rem] transition-all">
                       <div className="text-left">
                         <p className="text-sm font-black text-slate-900 dark:text-white">Stripe Portal</p>
                         <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Abo & Zahlungen verwalten</p>
                       </div>
                       <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover/portal:scale-110 group-hover/portal:rotate-12 transition-all">
                         {loadingPortal ? <Loader2 className="w-5 h-5 animate-spin text-indigo-600" /> : <ExternalLink className="w-5 h-5 text-indigo-600" />}
                       </div>
                     </div>
                   </button>
                 )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PROFILE UPDATE - Premium Card */}
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-black uppercase tracking-tighter text-base text-slate-900 dark:text-white">Profil</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Kontodaten</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50"></div>
              <div className="relative p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest ml-1">Anzeigename</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="Dein Name"
              />
            </div>
            <button
              onClick={handleUpdateName}
              disabled={loading === "name"}
              className="group/save relative w-full h-14 overflow-hidden rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-100"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover/save:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-center gap-2 text-white dark:text-slate-900 dark:group-hover/save:text-white font-black text-xs uppercase tracking-widest">
                {loading === "name" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 group-hover/save:rotate-12 transition-transform" />}
                Speichern
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* DATA EXPORT (GDPR) - Premium Card */}
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-black uppercase tracking-tighter text-base text-slate-900 dark:text-white">Deine Daten</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">DSGVO Art. 20</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-md opacity-50"></div>
              <div className="relative p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Download className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Lade alle über dich gespeicherten Informationen als JSON-Datei herunter.
          </p>
          <button
            onClick={handleExportData}
            disabled={loadingType === "export"}
            className="group/export relative w-full h-14 overflow-hidden rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover/export:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300 group-hover/export:text-white font-black text-xs uppercase tracking-widest border-2 border-blue-200 dark:border-blue-800 group-hover/export:border-transparent rounded-2xl h-full transition-all">
              {loadingType === "export" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 group-hover/export:animate-bounce" />}
              Daten exportieren
            </div>
          </button>
        </div>
      </div>

      {/* DELETE ACCOUNT (DANGER) - Premium Card */}
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-pink-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] border-2 border-slate-200/50 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-black uppercase tracking-tighter text-base text-red-600 dark:text-red-400">Gefahrenzone</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Unwiderruflich</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl blur-md opacity-50"></div>
              <div className="relative p-2 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="group/delete w-full h-14 border-2 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-300 dark:hover:border-red-800 transition-all"
            >
              <Trash2 className="w-4 h-4 group-hover/delete:animate-bounce" />
              Account löschen
            </button>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="relative p-5 rounded-2xl border-2 border-red-200 dark:border-red-900/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20"></div>
                <div className="relative flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 animate-pulse" />
                  <p className="text-xs text-red-800 dark:text-red-300 font-bold leading-tight">
                    ⚠️ Bist du sicher? Alle Daten und aktiven Abos werden sofort und unwiderruflich gelöscht!
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 h-12 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loadingType === "delete"}
                  className="group/confirm relative flex-[2] h-12 overflow-hidden rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-700 opacity-0 group-hover/confirm:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-center gap-2 text-white font-black text-[10px] uppercase tracking-widest">
                    {loadingType === "delete" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ja, endgültig löschen"}
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
