import supabase from "@/supabase";
import { SongStatus, Tables } from "@/types";
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
      if (this.songs.length) return;
      const { data: song, error } = await supabase.from("song").select("*");
      if (!song) return;
      this.songs = song;
    },

    async deleteSong(id: number) {
      const { error } = await supabase.from("song").delete().eq("id", id);
      if (!error) {
        const target = this.songs.findIndex((s) => s.id === id);
        if (target !== -1) {
          this.songs.splice(target, 1);
        }
      }
    },
  },

  getters: {
    getSongsByStatus: (state) => {
      return (status: SongStatus) => {
        return state.songs.filter((song) => song.status === status);
      };
    },
    getSongById: (state) => {
      return (id: number) => {
        return state.songs.find((song) => song.id === id);
      };
    },
  },
});
