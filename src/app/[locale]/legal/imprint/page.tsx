// Datei: src/app/[locale]/legal/imprint/page.tsx
import { siteConfig } from "@/lib/config";
import { getTranslations } from "next-intl/server";

export default async function Imprint() {
  const t = await getTranslations("Legal");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">{t("imprint")}</h1>

        <section className="space-y-6 text-gray-700 dark:text-gray-300">
          <div>
            <h2 className="text-xl font-semibold mb-2">{t("tmg")}</h2>
            <p>
              {siteConfig.company}<br />
              {siteConfig.owner}<br />
              {siteConfig.address}<br />
              Germany
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{t("contact")}</h2>
            <p>
              Phone: {siteConfig.phone}<br />
              Email: {siteConfig.email}
            </p>
          </div>

          {siteConfig.vatId && (
            <div>
              <h2 className="text-xl font-semibold mb-2">{t("vatId")}</h2>
              <p>{siteConfig.vatId}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}