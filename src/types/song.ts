import { type Tables } from "@/types";

const SONG_STATUSES = ["learning", "active", "suggested", "burner", "killed"] as const;
type SongStatusTuple = typeof SONG_STATUSES;
type SongStatus = SongStatusTuple[number];

type LocalSong = Omit<Tables<"song">, "id">;
function NewSong(
  artist: string = "",
  title: string = "",
  status: SongStatus = "suggested",
  vocal_lead: number | null = null,
  download_url: string | null = null,
  link_url: string | null = null,
  is_highlighted: boolean = false,
  specials: SongSpecial[] | null = null
): LocalSong {
  return {
    artist,
    title,
    status,
    vocal_lead,
    download_url,
    link_url,
    is_highlighted,
    specials,
  };
}

const SONG_SPECIALS = ["D", "B↑", "B↓", "Acc", "Mand"] as const;
type SongSpecialTuple = typeof SONG_SPECIALS;
type SongSpecial = SongSpecialTuple[number];

const SONG_MOODS = ["fast dance", "slow dance", "singalong", "drink"] as const;
type SongMoodTuple = typeof SONG_MOODS;
type SongMood = SongMoodTuple[number];

export {
  type SongMood,
  type SongSpecial,
  type LocalSong,
  type SongStatus,
  SONG_STATUSES,
  SONG_SPECIALS,
  SONG_MOODS,
  NewSong,
};
