"use client";

import { useState } from "react";

export default function DashboardActions({
  userId,
  subscriptionStatus,
}: {
  userId: string;
  subscriptionStatus: string;
}) {
  const [loadingOneTime, setLoadingOneTime] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleOneTime = async () => {
    setLoadingOneTime(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error("One-Time Fehler:", err);
    }
    setLoadingOneTime(false);
  };

  const handleExport = async () => {
    setLoadingExport(true);
    try {
      const res = await fetch("/api/export-data");
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `meine-daten-${userId}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Export Fehler:", err);
    }
    setLoadingExport(false);
  };

  const handleDelete = async () => {
    if (!confirm("Bist du sicher? Account wird unwiderruflich gelöscht!"))
      return;

    setLoadingDelete(true);
    try {
      const res = await fetch("/api/delete-account", { method: "POST" });
      if (res.ok) {
        window.location.href = "/auth/signin";
      }
    } catch (err) {
      console.error("Delete Fehler:", err);
    }
    setLoadingDelete(false);
  };

  const handleSubscription = async () => {
    setLoadingSubscription(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SUBSCRIPTION,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Subscription Fehler:", err);
    }
    setLoadingSubscription(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Premium werden</h2>
      <p className="mb-4">
        Aktueller Status:{" "}
        <strong>
          {/* Hier kommt subscriptionStatus rein – siehe unten */}
        </strong>
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={handleOneTime}
          disabled={loadingOneTime}
          className="py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loadingOneTime ? "Lädt..." : "Einmalzahlung (99 €)"}
        </button>

        <button
          onClick={handleSubscription}
          disabled={loadingSubscription}
          className="py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
        >
          {loadingSubscription ? "Lädt..." : "Abo (9.99 €/Monat)"}
        </button>
      </div>
      {/* DSGVO-Bereich – jetzt wieder vollständig drin */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h2 className="text-xl font-semibold mb-4">DSGVO-Rechte</h2>

        <div className="space-y-4">
          <button
            onClick={handleExport}
            disabled={loadingExport}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loadingExport ? "Lädt..." : "Meine Daten exportieren (JSON)"}
          </button>

          <button
            onClick={handleDelete}
            disabled={loadingDelete}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
          >
            {loadingDelete ? "Lädt..." : "Account löschen"}
          </button>
        </div>
      </div>
    </div>
  );
}
