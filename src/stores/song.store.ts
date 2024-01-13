import { Song } from "@/types";
import { defineStore } from "pinia";

interface State {
  songs: Song[];
}

export const useSongStore = defineStore("songs", {
  state: (): State => {
    return {
      songs: [],
    };
  },
});
