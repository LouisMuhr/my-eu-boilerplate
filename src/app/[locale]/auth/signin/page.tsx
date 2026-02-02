"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Chrome,
  Github,
  ArrowLeft,
  Shield,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  Sparkles,
  LogIn,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("Auth");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        const r = t("data_error");
        setError(r);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Verbindung zum Server fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 p-4 font-sans text-slate-900 dark:text-slate-100 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-rose-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:scale-105 shadow-lg z-50"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück
      </Link>

      {/* Main Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>

          {/* Card */}
          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-10">
            {/* Logo & Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/50">
                    <Shield className="w-8 h-8" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent mb-3">
                {t("welcome")}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {t("info_text")}
              </p>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="group/btn relative overflow-hidden rounded-2xl transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 h-12 border-2 border-slate-200 dark:border-slate-700 group-hover/btn:border-indigo-300 dark:group-hover/btn:border-indigo-700 rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-300 transition-all">
                  <Chrome className="w-5 h-5 text-blue-500" />
                  Google
                </div>
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="group/btn relative overflow-hidden rounded-2xl transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 h-12 border-2 border-slate-200 dark:border-slate-700 group-hover/btn:border-purple-300 dark:group-hover/btn:border-purple-700 rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-300 transition-all">
                  <Github className="w-5 h-5" />
                  GitHub
                </div>
              </button>
            </div>

            {/* Separator */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/90 dark:bg-slate-900/90 px-4 text-slate-500 font-black tracking-widest">
                  {t("email_text")}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-900/30 flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 animate-pulse" />
                <p className="text-sm font-bold text-red-800 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest ml-1">
                  {t("email")}
                </label>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@firma.de"
                    className="w-full h-14 pl-12 pr-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest">
                    {t("password")}
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-500 transition-colors"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
                <div className="relative group/input">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                      <LogIn className="w-5 h-5" />
                      {t("signin")}
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              {t("noAccount")}{" "}
              <Link
                href="/auth/signup"
                className="font-black text-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-500 transition-colors inline-flex items-center gap-1"
              >
                {t("freeSignUp")}
                <Sparkles className="w-3 h-3" />
              </Link>
            </p>

            {/* Compliance Note */}
            <p className="mt-10 text-center text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-widest font-black">
              {t("info_text_2")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
