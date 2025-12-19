export default function Privacy() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

        <section className="space-y-8 text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <p>
              Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Diese
              Datenschutzerklärung informiert dich über Art, Umfang und Zweck
              der Verarbeitung personenbezogener Daten innerhalb unseres
              Onlineangebotes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Verantwortlicher</h2>
            <p>
              [Dein Name / Deine Firma]
              <br />
              [Adresse]
              <br />
              E-Mail: [deine@email.de]
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              3. Erhebung und Speicherung personenbezogener Daten
            </h2>
            <p>
              Beim Besuch der Website werden automatisch Server-Logfiles erhoben
              (IP-Adresse, Browser, etc.). Bei Registrierung/Nutzung speichern
              wir: Name, E-Mail, ggf. Zahlungsdaten (über Stripe).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              4. Weitergabe von Daten
            </h2>
            <p>
              Eine Übermittlung deiner persönlichen Daten an Dritte findet nur
              statt, wenn:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Du ausdrücklich eingewilligt hast</li>
              <li>Es zur Vertragsabwicklung erforderlich ist (z. B. Stripe)</li>
              <li>Es gesetzlich vorgeschrieben ist</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Deine Rechte</h2>
            <p>Du hast das Recht auf:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Auskunft über deine gespeicherten Daten</li>
              <li>Berichtigung oder Löschung</li>
              <li>Einschränkung der Verarbeitung</li>
              <li>Widerspruch gegen die Verarbeitung</li>
              <li>Datenübertragbarkeit</li>
            </ul>
            <p className="mt-4">Kontaktiere uns dazu einfach per E-Mail.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p>
              Wir verwenden Cookies nur für technische Funktionalität und nach
              deiner Einwilligung für Analytics. Die Einwilligung kannst du
              jederzeit widerrufen.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Stripe Zahlungen</h2>
            <p>
              Zahlungen werden über Stripe abgewickelt. Stripe verarbeitet deine
              Zahlungsdaten eigenverantwortlich. Details:{" "}
              <a
                href="https://stripe.com/de/privacy"
                className="text-blue-600 hover:underline"
              >
                Stripe Datenschutzerklärung
              </a>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Wichtiger Hinweis:</strong> Diese Datenschutzerklärung ist
              eine Vorlage und kein individueller Rechtsrat. Passe sie an deine
              tatsächlichen Prozesse an und lasse sie von einem
              Datenschutzexperten oder Anwalt prüfen.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
