"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle, CreditCard } from "lucide-react";

interface DashboardActionsProps {
  userId: string;
  userName: string;
  userEmail: string;
  subscriptionStatus: string; // 'free', 'active', 'canceled'
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string | null;
  hasStripeCustomer: boolean;
}

export default function DashboardActions({
  subscriptionStatus,
  currentPeriodEnd,
  cancelAtPeriodEnd,
}: DashboardActionsProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  // 1. Logik für den Checkout (Kauf starten)
  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) router.push(data.url);
    } catch (error) {
      console.error("Checkout Fehler:", error);
    } finally {
      setLoading(null);
    }
  };

  // 2. Logik für das Kundenportal (Abo verwalten)
  const handlePortal3 = async () => {
    setLoading("portal");
    try {
      const res = await fetch("/api/create-portal-link", { method: "POST" });
      const data = await res.json();
      if (data.url) router.push(data.url);
    } catch (error) {
      console.error("Portal Fehler:", error);
    } finally {
      setLoading(null);
    }
  };
  const handlePortal = async () => {
    setLoading("portal");
    try {
      const res = await fetch("/api/create-portal-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Prüfe erst, ob die Antwort überhaupt OK ist
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Server schickte kein JSON:", text);
        throw new Error("Server-Fehler: Ungültiges Antwortformat.");
      }

      const data = await res.json();

      if (res.ok && data.url) {
        // DER ERFOLG: Weiterleitung
        window.location.href = data.url;
      } else {
        alert(data.error || "Fehler beim Laden des Portals");
      }
    } catch (error: any) {
      console.error("Portal-Aufruf gescheitert:", error);
      alert(error.message || "Kritischer Fehler beim Portal-Aufruf.");
    } finally {
      setLoading(null);
    }
  };

  // === SZENARIO A: Nutzer hat KEIN aktives Abo (Free) ===
  // Zeige NUR die Kauf-Optionen an. Nichts anderes.
  if (subscriptionStatus !== "active") {
    return (
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Monatliches Abo */}
        <Card className="border-2 border-gray-200 hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600 rounded-bl-lg">
            FLEXIBEL
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-black">Monatlich</CardTitle>
            <CardDescription>
              Voller Zugriff, jederzeit kündbar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-black text-gray-900">
              9,99€{" "}
              <span className="text-lg text-gray-500 font-medium">/Monat</span>
            </div>
            <Button
              className="w-full h-12 text-lg font-bold bg-gray-900 hover:bg-gray-800"
              onClick={() => handleCheckout("price_1SnO6yLg3PL2dnkwlkTwV412")}
              disabled={!!loading}
            >
              {loading === "price_1SnO6yLg3PL2dnkwlkTwV412" ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Jetzt upgraden"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Jährliches Abo */}
        <Card className="border-2 border-blue-600 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 px-3 py-1 text-xs font-bold text-white rounded-bl-lg">
            BELIEBT (-20%)
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-black text-blue-700">
              Jährlich
            </CardTitle>
            <CardDescription>
              Zahle einmal, profitiere das ganze Jahr.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-black text-gray-900">
              99,00€{" "}
              <span className="text-lg text-gray-500 font-medium">/Jahr</span>
            </div>
            <Button
              className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleCheckout("price_1SnO9zLg3PL2dnkwaDVFLOxA")}
              disabled={!!loading}
            >
              {loading === "price_1SnO9zLg3PL2dnkwaDVFLOxA" ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Jährlich sparen"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // === SZENARIO B: Nutzer HAT ein aktives Abo ===
  // Zeige den Status und den Button zum Verwalten (Stripe Portal)
  return (
    <Card className="border border-green-200 bg-green-50/50 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <CardTitle className="text-xl font-bold text-green-800">
            Premium Aktiv
          </CardTitle>
        </div>
        <CardDescription className="text-green-700 text-base">
          Du hast vollen Zugriff auf alle Funktionen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white p-4 rounded-xl border border-green-100 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status:</span>
            <span
              className={`font-bold ${
                cancelAtPeriodEnd ? "text-amber-600" : "text-green-600"
              }`}
            >
              {cancelAtPeriodEnd ? "Läuft aus" : "Aktiv & Verlängert sich"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Nächste Abrechnung/Ende:</span>
            <span className="font-bold text-gray-900">
              {currentPeriodEnd || "Unbekannt"}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
          onClick={handlePortal}
          disabled={!!loading}
        >
          {loading === "portal" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" /> Abo verwalten & Rechnungen
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
