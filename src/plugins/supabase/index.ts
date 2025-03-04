import { Database } from "@/core/models";
import { createClient } from "@supabase/supabase-js";

export default createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
