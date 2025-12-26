import { type Tables } from "@/plugins/supabase";

export type Show = Tables<"show">;

export interface ShowFilter {
  label: string;
  fn(date?: string | Date | number): Show[];
}

export interface LocalShow extends Omit<Show, "id" | "venue"> {
  venue: number | null;
}
export function NewShow(
  venue: number | null = null,
  date: string = "",
  end_time: string = "",
  start_time: string = "",
  event: string = "",
  fb_url: string = ""
): LocalShow {
  return {
    venue,
    date,
    end_time,
    start_time,
    event,
    fb_url,
  };
}
