import { MergeDeep } from "type-fest";
import { Database as DatabaseGenerated } from "./supabase";
export { type Json, type Tables } from "./supabase";

// Override the type for a specific column in a view:
export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Views: {
        songs_ordered: {
          Row: {
            artist: string;
            download_url: string | null;
            id: number;
            link_url: string | null;
            mood: Database["public"]["Enums"]["song_mood"] | null;
            sort_order: number | null;
            specials: string[] | null;
            status: Database["public"]["Enums"]["song_status"] | null;
            title: string;
            vocal_lead: number;
          };
        };
      };
    };
  }
>;
