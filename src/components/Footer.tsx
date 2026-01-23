// Datei: src/components/Footer.tsx
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="py-6 border-t bg-white dark:bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <nav className="flex gap-6">
          <Link href="/legal/imprint" className="hover:text-blue-600">Impressum</Link>
          <Link href="/legal/privacy" className="hover:text-blue-600">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}