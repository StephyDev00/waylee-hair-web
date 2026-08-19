"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  const links = [
    { href: "/services", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/about", label: t("about") },
    { href: "/shop", label: t("shop") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur border-b border-ink/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors hover:text-wine ${
                pathname === link.href ? "text-wine" : "text-ink/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Button href="/book" className="!px-6 !py-2.5">
            {t("bookNow")}
          </Button>
        </nav>

        <button
          className="md:hidden text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-ivory px-6 pb-6 pt-2 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base py-1 text-ink/85 hover:text-wine"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher className="py-1" />
          <Button href="/book" onClick={() => setOpen(false)} className="mt-2 w-full">
            {t("bookNow")}
          </Button>
        </nav>
      )}
    </header>
  );
}
