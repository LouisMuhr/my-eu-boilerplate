"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Shield,
  KeyRound,
  ArrowRight,
} from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-red-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border-2 border-red-200/50 dark:border-red-900/50 shadow-2xl p-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 rounded-3xl blur-lg opacity-50 animate-pulse"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-red-500/50">
                <AlertCircle className="w-8 h-8" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-red-600 via-rose-600 to-red-600 dark:from-red-400 dark:via-rose-400 dark:to-red-400 bg-clip-text text-transparent mb-2">
              Ungültiger Link
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Dieser Link zum Zurücksetzen des Passworts ist ungültig oder abgelaufen.
            </p>
          </div>
          <Link
            href="/auth/forgot-password"
            className="group/btn relative inline-block w-full overflow-hidden rounded-2xl transition-all hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2 h-14 text-white font-black text-sm uppercase tracking-widest">
              <KeyRound className="w-5 h-5" />
              Neuen Link anfordern
            </div>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(true);
      setTimeout(() => router.push("/auth/signin"), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-green-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Passwort geändert!
              </h2>
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Dein Passwort wurde erfolgreich geändert. Du wirst zum Login weitergeleitet...
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-bold">Weiterleitung...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-900/30 flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 animate-pulse" />
          <p className="text-sm font-bold text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest ml-1">
          Neues Passwort
        </label>
        <div className="relative group/input">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mind. 8 Zeichen"
            className="w-full h-14 pl-12 pr-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white placeholder:text-slate-400 placeholder:font-normal"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest ml-1">
          Passwort bestätigen
        </label>
        <div className="relative group/input">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Passwort wiederholen"
            className="w-full h-14 pl-12 pr-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white placeholder:text-slate-400 placeholder:font-normal"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group/submit relative w-full h-14 overflow-hidden rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover/submit:opacity-100 transition-opacity"></div>
        <div className="relative flex items-center justify-center gap-2 text-white font-black text-sm uppercase tracking-widest">
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Passwort speichern
            </>
          )}
        </div>
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 p-4 font-sans text-slate-900 dark:text-slate-100 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-rose-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>

          {/* Card */}
          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/50">
                    <Lock className="w-8 h-8" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent mb-3">
                Neues Passwort
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Vergib jetzt ein sicheres, neues Passwort für deinen Account
              </p>
            </div>

            <Suspense
              fallback={
                <div className="flex justify-center py-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-md opacity-50 animate-pulse"></div>
                    <Loader2 className="relative w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
                  </div>
                </div>
              }
            >
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
