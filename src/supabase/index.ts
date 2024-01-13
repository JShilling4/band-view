import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types";

export default createClient<Database>(
  "https://sohrxoilutntychfxjrq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaHJ4b2lsdXRudHljaGZ4anJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyOTAyNDMsImV4cCI6MjAwNzg2NjI0M30.rGUKQH9H73ynjWLgv7ZQxlWPzHR9KvJoQIUV3ccMjZY"
);
