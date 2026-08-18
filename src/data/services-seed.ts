// Verified digit-for-digit against Screenshot_20260818_183344_Instagram.jpg (Tarifs)
// and Screenshot_20260818_183312_Instagram.jpg (Prix extension / Métamorphose).
// This file is the single source of truth for both the Supabase seed migration
// and any local fallback rendering.

export type LengthTier = "court" | "mi_long" | "long";

export interface ServiceSeed {
  category: "soins_shampooing" | "lissages" | "extensions" | "formules";
  name: string;
  slug: string;
  description?: string;
  price_court?: number;
  price_mi_long?: number;
  price_long?: number;
  flat_price?: number;
  duration_minutes: number;
  display_order: number;
}

export const servicesSeed: ServiceSeed[] = [
  // Soins & Shampooing
  {
    category: "soins_shampooing",
    name: "Shampooing + après shampooing",
    slug: "shampooing",
    price_court: 20,
    price_mi_long: 30,
    price_long: 35,
    duration_minutes: 30,
    display_order: 1,
  },
  {
    category: "soins_shampooing",
    name: "Brushing + sèche cheveux + fer à lisser",
    slug: "brushing",
    price_court: 50,
    price_mi_long: 55,
    price_long: 60,
    duration_minutes: 60,
    display_order: 2,
  },
  {
    category: "soins_shampooing",
    name: "Soin Botox",
    slug: "soin-botox",
    price_court: 90,
    price_mi_long: 100,
    price_long: 110,
    duration_minutes: 90,
    display_order: 3,
  },
  // Les Lissages
  {
    category: "lissages",
    name: "Lissage Tanin",
    slug: "lissage-tanin",
    price_court: 240,
    price_mi_long: 280,
    price_long: 320,
    duration_minutes: 180,
    display_order: 1,
  },
  {
    category: "lissages",
    name: "Lissage Indien",
    slug: "lissage-indien",
    price_court: 270,
    price_mi_long: 310,
    price_long: 350,
    duration_minutes: 180,
    display_order: 2,
  },
  // Nos Extensions
  {
    category: "extensions",
    name: "Tissage ouvert",
    slug: "tissage-ouvert",
    flat_price: 100,
    duration_minutes: 120,
    display_order: 1,
  },
  {
    category: "extensions",
    name: "Tissage demi-tête",
    slug: "tissage-demi-tete",
    flat_price: 60,
    duration_minutes: 90,
    display_order: 2,
  },
  {
    category: "extensions",
    name: "Pose de tape in",
    slug: "pose-tape-in",
    flat_price: 100,
    duration_minutes: 120,
    display_order: 3,
  },
  // Nos Formules
  {
    category: "formules",
    name: "Shampooing + Brushing",
    slug: "formule-shampooing-brushing",
    price_court: 60,
    price_mi_long: 65,
    price_long: 70,
    duration_minutes: 75,
    display_order: 1,
  },
  {
    category: "formules",
    name: "Lissage Tanin + Soin Botox",
    slug: "formule-lissage-tanin-botox",
    price_court: 270,
    price_mi_long: 310,
    price_long: 350,
    duration_minutes: 240,
    display_order: 2,
  },
  {
    category: "formules",
    name: "Lissage Indien + Soin Botox",
    slug: "formule-lissage-indien-botox",
    price_court: 300,
    price_mi_long: 340,
    price_long: 380,
    duration_minutes: 240,
    display_order: 3,
  },
];

export type ExtensionTexture = "lisses" | "textures" | "colores";

export interface ExtensionPriceSeed {
  length_inches: number;
  texture: ExtensionTexture;
  price: number;
}

// Métamorphose — Waylee Collection tape-in pricing (Longueurs × Lisses/Texturés/Colorés)
const tapeInGrid: [number, number, number, number][] = [
  [16, 50, 55, 60],
  [18, 55, 60, 65],
  [20, 60, 65, 70],
  [22, 65, 70, 75],
  [24, 70, 75, 80],
  [26, 75, 80, 85],
  [28, 80, 85, 90],
];

export const extensionPricesSeed: ExtensionPriceSeed[] = tapeInGrid.flatMap(
  ([length_inches, lisses, textures, colores]) => [
    { length_inches, texture: "lisses" as const, price: lisses },
    { length_inches, texture: "textures" as const, price: textures },
    { length_inches, texture: "colores" as const, price: colores },
  ]
);

export const categoryLabels: Record<ServiceSeed["category"], string> = {
  soins_shampooing: "Soins & Shampooing",
  lissages: "Les Lissages",
  extensions: "Nos Extensions",
  formules: "Nos Formules",
};

export const textureLabels: Record<ExtensionTexture, string> = {
  lisses: "Lisses",
  textures: "Texturés",
  colores: "Colorés",
};
