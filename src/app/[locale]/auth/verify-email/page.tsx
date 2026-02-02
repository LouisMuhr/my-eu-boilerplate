"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Mail, Sparkles, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Kein Token vorhanden.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.error);
        }
      } catch {
        setStatus("error");
        setMessage("Verbindung fehlgeschlagen.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="relative group">
        {/* Glow Effect */}
        <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-75 transition-all duration-500 ${
          status === "success"
            ? "bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-green-500/20 group-hover:opacity-100"
            : status === "error"
            ? "bg-gradient-to-r from-red-500/20 via-rose-500/20 to-pink-500/20 group-hover:opacity-100"
            : "bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"
        }`}></div>

        {/* Card */}
        <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-12">
          {status === "loading" && (
            <div className="text-center space-y-6">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <Loader2 className="relative w-20 h-20 text-indigo-600 dark:text-indigo-400 animate-spin" />
              </div>
              <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
                E-Mail wird bestätigt...
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Bitte warte einen Moment.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="inline-flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                    <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    E-Mail bestätigt!
                  </h1>
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
                <p className="text-slate-600 dark:text-slate-400">{message}</p>
              </div>
              <Link
                href="/auth/signin"
                className="group/btn relative inline-block w-full overflow-hidden rounded-2xl transition-all hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 h-14 text-white font-black text-sm uppercase tracking-widest">
                  <LogIn className="w-5 h-5" />
                  Jetzt einloggen
                </div>
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="inline-flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                    <XCircle className="w-12 h-12 text-white" strokeWidth={3} />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-red-600 via-rose-600 to-red-600 dark:from-red-400 dark:via-rose-400 dark:to-red-400 bg-clip-text text-transparent mb-2">
                  Bestätigung fehlgeschlagen
                </h1>
                <p className="text-slate-600 dark:text-slate-400">{message}</p>
              </div>
              <Link
                href="/auth/signup"
                className="group/btn relative inline-block w-full overflow-hidden rounded-2xl transition-all hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800"></div>
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 h-14 text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest border-2 border-slate-200 dark:border-slate-700 rounded-2xl">
                  <UserPlus className="w-5 h-5" />
                  Erneut registrieren
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 p-4 font-sans text-slate-900 dark:text-slate-100 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-rose-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center gap-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="font-bold text-slate-600 dark:text-slate-400">Laden...</span>
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </main>
  );
}
