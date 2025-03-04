import { type Tables } from "@/core/models";

interface ShowFilter {
  label: string;
  fn(date?: string | Date | number): Tables<"show">[];
}

interface LocalShow extends Omit<Tables<"show">, "id" | "venue"> {
  venue: number | null;
}
function NewShow(
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

export { NewShow, type ShowFilter, type LocalShow };
