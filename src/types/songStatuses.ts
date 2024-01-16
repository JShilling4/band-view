// export enum SongStatuses {
//   Active = "Active",
//   Learning = "Learning",
//   Next = "Next",
//   Burner = "Burner",
//   Suggested = "Suggested",
//   Killed = "Killed",
// }

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
