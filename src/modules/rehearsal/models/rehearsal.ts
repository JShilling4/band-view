import { type Tables } from "@/plugins/supabase";

type LocalRehearsal = Omit<Tables<"rehearsal">, "id">;
function NewRehearsal(
  date: string = "",
  start_time: string = "",
  new_songs: number[] = [],
  review_songs: number[] = [],
  notes: string = ""
): LocalRehearsal {
  return {
    date,
    start_time,
    new_songs,
    review_songs,
    notes,
  };
}

export { type LocalRehearsal, NewRehearsal };
