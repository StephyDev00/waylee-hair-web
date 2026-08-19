import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const routes = ["", "/services", "/portfolio", "/about", "/book", "/shop", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://waylee-hair-web.vercel.app";

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${base}/${l}${route}`])
        ),
      },
    }))
  );
}
