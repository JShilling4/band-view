import supabase from "@/supabase";
import { Tables } from "@/types";
import { defineStore } from "pinia";

interface State {
  songs: Tables<"song">[];
}

export const useSongStore = defineStore("songs", {
  state: (): State => ({
    songs: [],
  }),

  actions: {
    async fetchSongs() {
      const { data: song, error } = await supabase.from("song").select("*");
      if (!song) return;
      this.songs = song;
    },
  },
});
