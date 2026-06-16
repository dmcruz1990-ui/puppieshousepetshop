import { supabase } from "./supabase";

// Ajustes clave/valor del sitio (link de pago Bold, imagen de fondo, etc.)
export async function getSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from("settings").select("key,value");
  if (error || !data) return {};
  const out: Record<string, string> = {};
  for (const row of data as { key: string; value: string | null }[]) {
    if (row.value != null) out[row.key] = row.value;
  }
  return out;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const { error } = await supabase.from("settings").upsert({ key, value });
  if (error) throw error;
}
