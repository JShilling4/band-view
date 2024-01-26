import { type Tables } from "@/types";

export const SONG_STATUSES = [
  "learning",
  "active",
  "next",
  "suggested",
  "burner",
  "killed",
] as const;
type SongStatusTuple = typeof SONG_STATUSES;
export type SongStatus = SongStatusTuple[number];

export type LocalSong = Omit<Tables<"song">, "id">;
export function NewSong(
  artist: string = "",
  title: string = "",
  status: SongStatus = "suggested",
  vocal_lead: number | null = null,
  download_url: string | null = null,
  link_url: string | null = null,
  mood: SongMood | null = null,
  specials: SongSpecial[] | null = null
): LocalSong {
  return {
    artist,
    title,
    status,
    vocal_lead,
    download_url,
    link_url,
    mood,
    specials,
  };
}

export const SONG_SPECIALS = ["D", "B↑", "B↓", "Acc", "Mand"] as const;
type SongSpecialTuple = typeof SONG_SPECIALS;
export type SongSpecial = SongSpecialTuple[number];

export const SONG_MOODS = ["fast dance", "slow dance", "singalong", "drink"] as const;
type SongMoodTuple = typeof SONG_MOODS;
export type SongMood = SongMoodTuple[number];
