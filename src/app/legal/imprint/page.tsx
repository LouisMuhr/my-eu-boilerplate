export default function Imprint() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>

        <section className="space-y-6 text-gray-700 dark:text-gray-300">
          <div>
            <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              [Dein Name / Deine Firma]<br />
              [Straße und Hausnummer]<br />
              [PLZ Ort]<br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
            <p>
              Telefon: [Deine Telefonnummer]<br />
              E-Mail: [deine@email.de]
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
              [DE123456789]
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>[Dein Name]<br />[Deine Adresse]</p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Hinweis:</strong> Diese Impressum-Vorlage ist ein Platzhalter und dient nur als Beispiel. 
              Bitte passe sie an deine tatsächlichen Daten an und lasse sie ggf. von einem Rechtsanwalt prüfen.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}