"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setShow(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          Wir verwenden Cookies, um die Funktionalität der Website zu gewährleisten. 
          Mit "Alle akzeptieren" stimmen Sie auch Analytics-Cookies zu.
        </p>
        <div className="flex gap-4">
          <button
            onClick={acceptNecessary}
            className="px-4 py-2 text-sm border border-gray-500 rounded hover:bg-gray-800"
          >
            Nur notwendige
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}