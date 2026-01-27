"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chrome, Github,
  ArrowLeft, 
  Shield, 
  Mail, 
  Lock,
  AlertCircle,
  Loader2
} from "lucide-react";



export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // In NextAuth v5 sorgt redirect: false dafür, dass wir den Error hier abfangen können
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Die Anmeldedaten sind nicht korrekt. Bitte versuche es erneut.");
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
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4 selection:bg-blue-100 dark:selection:bg-blue-900">
      {/* Back to Home */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück zur Startseite
      </Link>

      <div className="w-full max-w-[440px]">
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 text-white mb-6">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
            Willkommen zurück
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Logge dich in dein EU-Boilerplate Konto ein.
          </p>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium text-sm text-gray-700 dark:text-gray-300 shadow-sm"
          >
            <Chrome className="w-5 h-5 text-blue-500" />
            Google
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium text-sm text-gray-700 dark:text-gray-300 shadow-sm"
          >
            <Github className="w-5 h-5" />
            GitHub
          </button>
        </div>

        {/* Separator */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-950 px-4 text-gray-500 font-medium">
              Oder mit E-Mail fortfahren
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-start gap-3 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              E-Mail Adresse
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

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Passwort
              </label>
              <Link 
                href="/auth/forgot-password" 
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                Vergessen?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Anmelden"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Noch keinen Account?{" "}
          <Link 
            href="/auth/signup" 
            className="font-bold text-blue-600 hover:underline"
          >
            Kostenlos registrieren
          </Link>
        </p>

        {/* Compliance Note */}
        <p className="mt-12 text-center text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest font-medium">
          Sicherer Login via NextAuth v5 & AES-256 Verschlüsselung
        </p>
      </div>
    </main>
  );
}