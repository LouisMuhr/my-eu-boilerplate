// Datei: src/app/legal/privacy/page.tsx
import { siteConfig } from "@/lib/config";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

        <section className="space-y-8 text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none">
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
            <p>
              Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Diese Datenschutzerklärung informiert dich über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten (nachfolgend „Daten“) innerhalb unseres Onlineangebotes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Verantwortlicher</h2>
            <p>
              {siteConfig.company}<br />
              {siteConfig.address}<br />
              E-Mail: {siteConfig.email}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Datenerhebung auf unserer Website</h2>
            <h3 className="text-xl font-medium mt-4">Server-Log-Dateien</h3>
            <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien (IP-Adresse, Browsertyp, Referrer URL, Uhrzeit). Diese Daten sind technisch notwendig.</p>
            
            <h3 className="text-xl font-medium mt-4">Registrierung und Login</h3>
            <p>Wir speichern die von dir im Rahmen der Registrierung angegebenen Daten (E-Mail, Name, Passwort-Hash) zur Bereitstellung deines Nutzerkontos.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Drittanbieter & Auftragsverarbeitung</h2>
            <p>Zur Erbringung unserer Dienste nutzen wir folgende Partner:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Stripe (Zahlungen):</strong> Zur Abwicklung von Zahlungen werden Daten an Stripe übertragen. Details: <a href={siteConfig.stripePrivacyUrl} target="_blank" className="text-blue-600 underline">Stripe Datenschutz</a>.
              </li>
              <li>
                <strong>Resend (E-Mail):</strong> Für den Versand von System-E-Mails (z.B. Passwort-Reset). Details: <a href={siteConfig.resendPrivacyUrl} target="_blank" className="text-blue-600 underline">Resend Datenschutz</a>.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Deine Rechte (DSGVO)</h2>
            <p>Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Datenübertragbarkeit deiner bei uns gespeicherten Daten. Wende dich hierzu an {siteConfig.email}.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Disclaimer:</strong> Diese Vorlage wurde für die {siteConfig.name} erstellt. Sie stellt keine Rechtsberatung dar.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}