"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, CheckCircle2, Settings, X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
      // Delay for slide-in animation
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleClose = (type: "all" | "necessary") => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem("cookie-consent", type);
      setShow(false);
    }, 300);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>

          {/* Card */}
          <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => handleClose("necessary")}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* Icon & Content */}
                <div className="flex-1 flex items-start gap-4">
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-md opacity-50"></div>
                    <div className="relative p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
                      <Cookie className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 pr-8 lg:pr-0">
                    <h3 className="font-black text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      Cookie-Einstellungen
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                        DSGVO
                      </span>
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      Wir verwenden Cookies, um die Funktionalität der Website zu gewährleisten.
                      Mit "Alle akzeptieren" stimmen Sie auch Analytics-Cookies zu.
                    </p>
                    <Link
                      href="/legal/privacy"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-500 transition-colors inline-flex items-center gap-1"
                    >
                      Datenschutzerklärung lesen
                      <span className="text-[10px]">→</span>
                    </Link>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0">
                  <button
                    onClick={() => handleClose("necessary")}
                    className="group/btn relative overflow-hidden rounded-2xl transition-all hover:scale-105 order-2 sm:order-1"
                  >
                    <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800"></div>
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center justify-center gap-2 px-6 py-3 text-slate-900 dark:text-white font-bold text-sm border-2 border-slate-200 dark:border-slate-700 rounded-2xl">
                      <Settings className="w-4 h-4" />
                      <span className="whitespace-nowrap">Nur notwendige</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleClose("all")}
                    className="group/btn relative overflow-hidden rounded-2xl transition-all hover:scale-105 order-1 sm:order-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center justify-center gap-2 px-6 py-3 text-white font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="whitespace-nowrap">Alle akzeptieren</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
