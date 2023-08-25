import { Song } from "@/types";
import { defineStore } from "pinia";

interface State {
  songs: Song[];
}

export const useSongStore = defineStore("songs", {
  state: (): State => {
    return {
      songs: [
        {
          name: "Heart On Fire",
          leadVocal: ["Ken"],
          hasBanjoTunedDown: false,
          hasBanjoTunedUp: false,
          isDropD: false,
          starters: ["KV"],
        },
        {
          name: "Fast As You",
          leadVocal: ["Ken"],
          hasBanjoTunedDown: false,
          hasBanjoTunedUp: false,
          isDropD: false,
          starters: ["KV"],
        },
        {
          name: "Boots Made For Walkin",
          leadVocal: ["Amber"],
          hasBanjoTunedDown: false,
          hasBanjoTunedUp: false,
          isDropD: false,
          starters: ["M", "Gtrs"],
        },
      ],
    };
  },
});
