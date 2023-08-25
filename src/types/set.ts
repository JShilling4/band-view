import { Song } from "@/types";

export interface Set {
  id: number;
  name: string;
  order: number;
  songList: Song[];
  songCount: number;
}
