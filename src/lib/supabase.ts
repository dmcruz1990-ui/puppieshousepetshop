import { createClient } from "@supabase/supabase-js";

// Datos públicos del proyecto Supabase (la anon key es pública por diseño,
// la seguridad la dan las políticas RLS de la base de datos).
export const SUPABASE_URL = "https://mvlmhidwvbzrdoakmqrl.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12bG1oaWR3dmJ6cmRvYWttcXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNzEwMDEsImV4cCI6MjA5Njk0NzAwMX0.553-sKrWYTfop-gAgihSk9ScaerUAMA1dW9Fzish3HE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
