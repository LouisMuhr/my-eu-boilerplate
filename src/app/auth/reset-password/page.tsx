"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Lock, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  ArrowRight
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
      <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900/30">
        <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-red-800 dark:text-red-400">Ungültiger Link</h2>
        <p className="text-sm text-red-600 dark:text-red-400/80 mt-2">Dieser Link zum Zurücksetzen des Passworts ist ungültig oder abgelaufen.</p>
        <a href="/auth/forgot-password" className="inline-block mt-6 text-sm font-bold text-blue-600 hover:underline">Neuen Link anfordern</a>
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
      <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-900/30 space-y-4">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">Erfolg!</h2>
        <p className="text-sm text-green-700 dark:text-green-400">Dein Passwort wurde geändert. Du wirst in Kürze zum Login weitergeleitet...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold ml-1">Neues Passwort</label>
        <div className="relative">
          <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 pl-11 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Mindestens 8 Zeichen"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold ml-1">Passwort bestätigen</label>
        <div className="relative">
          <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-12 pl-11 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Passwort wiederholen"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-medium flex gap-2 items-center">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Passwort speichern"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl text-white mb-6">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Neues Passwort</h1>
          <p className="text-gray-500 dark:text-gray-400">Vergib jetzt ein sicheres, neues Passwort für deinen Account.</p>
        </div>

        <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin" /></div>}>
          <ResetPasswordForm />
        </Suspense>

        <div className="mt-12 flex flex-col items-center gap-4 opacity-30 grayscale">
          <div className="h-[1px] w-12 bg-gray-400"></div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-black">Secure Data Processing</span>
          </div>
        </div>
      </div>
    </main>
  );
}