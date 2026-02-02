"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home, Settings, Bug } from "lucide-react";

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error("Settings Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 flex items-center justify-center p-6 font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-red-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/15 to-amber-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-2xl w-full">
        {/* Error Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-red-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>

          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border-2 border-red-200/50 dark:border-red-900/50 shadow-2xl p-12 text-center space-y-8">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative p-6 bg-gradient-to-br from-red-500 to-rose-500 rounded-3xl">
                  <AlertTriangle className="w-16 h-16 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h1 className="font-black text-4xl tracking-tight bg-gradient-to-r from-red-600 via-rose-600 to-red-600 dark:from-red-400 dark:via-rose-400 dark:to-red-400 bg-clip-text text-transparent">
                Einstellungen nicht verfügbar
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mx-auto">
                Beim Laden der Einstellungen ist ein Fehler aufgetreten. Versuche es bitte erneut.
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === "development" && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-900/30">
                  <div className="flex items-start gap-3 text-left">
                    <Bug className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-red-900 dark:text-red-100 uppercase tracking-wide mb-2">
                        Development Error
                      </p>
                      <p className="text-sm text-red-800 dark:text-red-200 font-mono break-all">
                        {error.message}
                      </p>
                      {error.digest && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                          Digest: {error.digest}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={reset}
                className="group/btn relative overflow-hidden rounded-2xl transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 px-8 py-4 text-white font-bold text-sm">
                  <RefreshCcw className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                  Erneut versuchen
                </div>
              </button>

              <Link
                href="/dashboard"
                className="group/btn relative overflow-hidden rounded-2xl transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800"></div>
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 px-8 py-4 text-slate-900 dark:text-white font-bold text-sm border-2 border-slate-200 dark:border-slate-700 rounded-2xl">
                  <Home className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  Zurück zum Dashboard
                </div>
              </Link>
            </div>

            {/* Help Text */}
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-4">
              Falls das Problem weiterhin besteht, kontaktiere bitte den Support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
