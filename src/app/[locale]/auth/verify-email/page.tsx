"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
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
    <div className="w-full max-w-md">
      {status === "loading" && (
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
          <h1 className="text-2xl font-bold">E-Mail wird bestätigt...</h1>
          <p className="text-gray-500">Bitte warte einen Moment.</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-800">E-Mail bestätigt!</h1>
          <p className="text-gray-600">{message}</p>
          <Link
            href="/auth/signin"
            className="inline-block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Jetzt einloggen
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-red-800">Bestätigung fehlgeschlagen</h1>
          <p className="text-gray-600">{message}</p>
          <Link
            href="/auth/signup"
            className="inline-block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
          >
            Erneut registrieren
          </Link>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4">
      <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin" />}>
        <VerifyEmailContent />
      </Suspense>
    </main>
  );
}