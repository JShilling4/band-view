import { type Tables } from "@/core/models";

export interface ShowFilter {
  label: string;
  fn(date?: string | Date | number): Tables<"show">[];
}

export type Show = Tables<"show">;

export interface LocalShow extends Omit<Tables<"show">, "id" | "venue"> {
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
