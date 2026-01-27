"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      // @ts-ignore - params ist in Next 15 ein Promise oder Objekt
      router.replace({ pathname, query: params }, { locale: nextLocale });
    });
  }

  return (
    <div className="flex gap-2 text-sm font-medium">
      <button
        onClick={() => onSelectChange("de")}
        disabled={isPending}
        className={`px-2 py-1 rounded transition ${
          locale === "de" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300"
        }`}
      >
        DE
      </button>
      <button
        onClick={() => onSelectChange("en")}
        disabled={isPending}
        className={`px-2 py-1 rounded transition ${
          locale === "en" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300"
        }`}
      >
        EN
      </button>
    </div>
  );
}