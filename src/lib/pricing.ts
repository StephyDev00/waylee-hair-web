import { createClient } from "@/lib/supabase/server";
import {
  servicesSeed,
  extensionPricesSeed,
  type ServiceSeed,
  type ExtensionPriceSeed,
} from "@/data/services-seed";

export interface Service extends ServiceSeed {
  id: string;
}

export interface ExtensionPrice extends ExtensionPriceSeed {
  id: string;
}

// Reads live from Supabase; falls back to the verified static seed if the
// database is briefly unreachable, so pricing never disappears from the site.
export async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("category")
      .order("display_order");
    if (error || !data || data.length === 0) throw error ?? new Error("empty");
    return data as Service[];
  } catch {
    return servicesSeed.map((s, i) => ({ ...s, id: `seed-${i}` }));
  }
}

export async function getExtensionPrices(): Promise<ExtensionPrice[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("extension_prices")
      .select("*")
      .order("length_inches");
    if (error || !data || data.length === 0) throw error ?? new Error("empty");
    return data as ExtensionPrice[];
  } catch {
    return extensionPricesSeed.map((e, i) => ({ ...e, id: `seed-${i}` }));
  }
}

export function groupByCategory(services: Service[]) {
  return services.reduce<Record<string, Service[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});
}
