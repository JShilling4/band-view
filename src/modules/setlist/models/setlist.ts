import { type Tables } from "@/plugins/supabase";

type LocalSetlist = Omit<Tables<"setlist">, "id">;

function NewSetlist(
  name: string = "",
  url: string | null = null,
  sets: number[] = []
): LocalSetlist {
  return {
    name,
    url,
    sets,
  };
}

export { NewSetlist, type LocalSetlist };
