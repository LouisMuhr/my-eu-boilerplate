import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          EU-Ready Next.js Boilerplate
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Auth, Stripe, i18n, volle DSGVO-Compliance (Impressum, Cookie-Consent, Export/Löschung) – einmal bauen, ewig verkaufen.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Jetzt kaufen – 149 €
          </Button>
          <Button size="lg" variant="outline">
            Demo ansehen
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Was drin ist</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Next.js 15 + Tailwind</CardTitle>
              </CardHeader>
              <CardContent>
                Moderner Stack, App Router, TypeScript-ready.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Auth + Stripe</CardTitle>
              </CardHeader>
              <CardContent>
                NextAuth v5, Credentials + Google, Stripe Checkout + Subscriptions.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Volle EU-Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                Cookie-Consent, Impressum, Datenschutz, Daten-Export/Löschung.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-6">
          Bereit, deinen ersten SaaS zu launchen?
        </h2>
        <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
          Jetzt für 149 € kaufen
        </Button>
      </section>
    </div>
  );
}