"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isRegister) {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        // Nach erfolgreicher Registrierung direkt einloggen
        const loginResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (!loginResult?.error) {
          window.location.href = "/dashboard"; // Weiterleitung
        } else {
          setError(
            "Registrierung erfolgreich, aber automatischer Login fehlgeschlagen"
          );
        }
      } else {
        const data = await res.json();
        setError(data.error || "Registrierung fehlgeschlagen");
      }
    } else {
      // Login
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Falsche E-Mail oder Passwort");
      } else {
        window.location.href = "/dashboard"; // Weiterleitung zum Dashboard
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">
          {isRegister ? "Registrieren" : "Anmelden"}
        </h1>

        {error && (
          <p className="text-red-600 text-center mb-4 bg-red-50 dark:bg-red-900/20 p-3 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          )}
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Lädt..." : isRegister ? "Registrieren" : "Anmelden"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          {isRegister ? "Hast du schon einen Account?" : "Noch keinen Account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="text-blue-600 hover:underline font-medium"
          >
            {isRegister ? "Anmelden" : "Registrieren"}
          </button>
        </p>
      </div>
    </main>
  );
}
