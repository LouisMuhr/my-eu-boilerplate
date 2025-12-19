import "./global.css";
import CookieConsent from "@/components/cookie-consent";  // <-- neu

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        {children}
        <CookieConsent />  {/* <-- immer am Ende, damit es unten erscheint */}
      </body>
    </html>
  );
}