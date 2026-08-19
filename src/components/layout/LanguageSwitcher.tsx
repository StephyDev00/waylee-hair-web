"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: "fr" | "en") {
    router.replace(pathname, { locale: next });
  }

  return (
    <div className={`flex items-center gap-1 text-xs font-medium tracking-wide ${className}`}>
      <button
        onClick={() => switchTo("fr")}
        aria-current={locale === "fr"}
        className={locale === "fr" ? "text-wine" : "text-ink/40 hover:text-wine"}
      >
        FR
      </button>
      <span className="text-ink/25">/</span>
      <button
        onClick={() => switchTo("en")}
        aria-current={locale === "en"}
        className={locale === "en" ? "text-wine" : "text-ink/40 hover:text-wine"}
      >
        EN
      </button>
    </div>
  );
}
