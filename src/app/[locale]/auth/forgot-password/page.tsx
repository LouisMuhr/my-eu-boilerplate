"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Mail, 
  Loader2, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // WICHTIG: Der Pfad muss zur API-Route in src/app/api/... passen
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Etwas ist schiefgelaufen.");
      }

      setMessage("Falls ein Konto mit dieser E-Mail existiert, haben wir dir soeben einen Link zum Zurücksetzen gesendet.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4 selection:bg-blue-100 dark:selection:bg-blue-900">
      {/* Zurück zum Login - Wir nutzen <a> statt Link für maximale Vorschau-Kompatibilität */}
      <a 
        href="/auth/signin" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück zum Login
      </a>

      <div className="w-full max-w-[440px]">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 mb-6">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
            Passwort vergessen?
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Kein Stress. Gib deine E-Mail ein und wir schicken dir einen Link.
          </p>
        </div>

        {/* Erfolgszustand */}
        {message ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 p-6 rounded-2xl text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              {message}
            </p>
            <div className="pt-2">
              <a 
                href="/auth/signin"
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                Zurück zum Login
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Fehlermeldung */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-start gap-3 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Formular */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                  Deine registrierte E-Mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@firma.de"
                    className="block w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Link anfordern"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
               <a 
                href="/auth/signin" 
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
              >
                Ich erinnere mich wieder
              </a>
            </div>
          </>
        )}

        {/* Sicherheits-Footer */}
        <div className="mt-16 flex flex-col items-center gap-4 opacity-30 grayscale">
          <div className="h-[1px] w-12 bg-gray-400"></div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-black">
              EU Standard Security
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}