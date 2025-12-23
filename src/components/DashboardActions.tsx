"use client";

import { useState } from "react";

export default function DashboardActions({ userId }: { userId: string }) {
  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

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
    if (!confirm("Bist du sicher? Account wird unwiderruflich gelöscht!")) return;

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">DSGVO-Rechte</h2>

      <button
        onClick={handleExport}
        disabled={loadingExport}
        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {loadingExport ? "Lädt..." : "Meine Daten exportieren (JSON)"}
      </button>

      <button
        onClick={handleDelete}
        disabled={loadingDelete}
        className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
      >
        {loadingDelete ? "Lädt..." : "Account löschen"}
      </button>
    </div>
  );
}