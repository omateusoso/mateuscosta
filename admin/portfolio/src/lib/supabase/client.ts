import { createClient, type SupabaseClient } from "@supabase/supabase-js";

declare global {
  interface Window {
    MATEUSCOSTA_SUPABASE?: {
      url?: string;
      anonKey?: string;
    };
  }
}

export function getSupabaseConfig() {
  return {
    url: import.meta.env.VITE_SUPABASE_URL || window.MATEUSCOSTA_SUPABASE?.url || "",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || window.MATEUSCOSTA_SUPABASE?.anonKey || "",
  };
}

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (client) return client;
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) throw new Error("Supabase não configurado.");
  client = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return client;
}
