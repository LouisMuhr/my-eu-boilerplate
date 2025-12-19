import "./global.css";
import CookieConsent from "@/components/cookie-consent"; // <-- neu

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col">
        {children}
        <CookieConsent /> {/* <-- immer am Ende, damit es unten erscheint */}
        <footer className="mt-auto py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <a href="/legal/imprint" className="hover:underline mx-4">
              Impressum
            </a>
            <a href="/legal/privacy" className="hover:underline mx-4">
              Datenschutzerklärung
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
