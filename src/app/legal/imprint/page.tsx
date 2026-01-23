// Datei: src/app/legal/imprint/page.tsx
import { siteConfig } from "@/lib/config";

export default function Imprint() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>

        <section className="space-y-6 text-gray-700 dark:text-gray-300">
          <div>
            <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              {siteConfig.company}<br />
              {siteConfig.owner}<br />
              {siteConfig.address}<br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
            <p>
              Telefon: {siteConfig.phone}<br />
              E-Mail: {siteConfig.email}
            </p>
          </div>

          {siteConfig.vatId && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                {siteConfig.vatId}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>{siteConfig.owner}<br />{siteConfig.address}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Hinweis:</strong> Dieses Impressum wurde auf Basis der siteConfig generiert. 
              Prüfe die Angaben auf Richtigkeit.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}