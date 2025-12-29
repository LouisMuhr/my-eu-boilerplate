export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Willkommen zu deinem EU-Boilerplate! 🚀
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Next.js mit Auth, Stripe, i18n und voller DSGVO-Compliance
        </p>

        <div className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-400">
            Alles läuft – Tailwind Styles sind aktiv!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/auth/signin"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
            >
              Zum Login / Register
            </a>
            <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition">
              Test-Button (Secondary)
            </button>
          </div>
        </div>

        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          Dark Mode wird automatisch unterstützt (je nach Systemeinstellung)
        </p>
      </div>
    </main>
  );
}