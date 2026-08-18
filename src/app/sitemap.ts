import type { MetadataRoute } from "next";

const routes = ["", "/services", "/portfolio", "/about", "/book", "/shop", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://waylee-hair-web.vercel.app";
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
