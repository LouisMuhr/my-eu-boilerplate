// Datei: src/app/[locale]/legal/privacy/page.tsx
import { siteConfig } from "@/lib/config";
import { getTranslations } from "next-intl/server";

export default async function Privacy() {
  const t = await getTranslations("Privacy");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

        <section className="space-y-8 text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("intro_title")}</h2>
            <p>{t("intro_text")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("responsible_title")}</h2>
            <p>
              {siteConfig.company}<br />
              {siteConfig.address}<br />
              Email: {siteConfig.email}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("collection_title")}</h2>
            <h3 className="text-xl font-medium mt-4">{t("collection_logs_title")}</h3>
            <p>{t("collection_logs_text")}</p>
            
            <h3 className="text-xl font-medium mt-4">{t("collection_auth_title")}</h3>
            <p>{t("collection_auth_text")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("sharing_title")}</h2>
            <p>{t("sharing_text")}</p>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                {t("stripe_desc")}{" "}
                <a href={siteConfig.stripePrivacyUrl} target="_blank" className="text-blue-600 underline">
                  Stripe Privacy
                </a>
              </li>
              <li>
                {t("resend_desc")}{" "}
                <a href={siteConfig.resendPrivacyUrl} target="_blank" className="text-blue-600 underline">
                  Resend Privacy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("rights_title")}</h2>
            <p>{t("rights_text", { email: siteConfig.email })}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("cookies_title")}</h2>
            <p>{t("cookies_text")}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("disclaimer", { name: siteConfig.name })}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}