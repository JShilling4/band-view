import { Database } from "./types";
import { createClient } from "@supabase/supabase-js";
export { type Database, type Tables } from "./types";

export default createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
