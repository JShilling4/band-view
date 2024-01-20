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

export type NewSong = Partial<Omit<Tables<"song">, "id">>;

export const SONG_SPECIALS = ["D", "B↑", "B↓", "Acc", "Mand"] as const;
type SongSpecialTuple = typeof SONG_SPECIALS;
export type SongSpecial = SongSpecialTuple[number];

export const SONG_MOODS = ["Fast Dance", "Slow Dance", "Singalong", "Drink"] as const;
type SongMoodTuple = typeof SONG_SPECIALS;
export type SongMood = SongMoodTuple[number];
