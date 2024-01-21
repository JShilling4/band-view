import supabase from "@/supabase";
import { defineStore } from "pinia";
import { SongStatus, Tables, NewSong } from "@/types";

interface State {
  songs: Tables<"song">[];
}

export const useSongStore = defineStore("songs", {
  state: (): State => {
    return {
      songs: [],
    };
  },

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

    async createSong(song: NewSong) {
      if (!song) return;
      const { data, error } = await supabase
        .from("song")
        .insert(song)
        .select()
        .returns<Tables<"song">[]>();
      if (!error) {
        this.songs.push(data[0]);
      }
    },
  },

  getters: {
    getSongsByStatus: (state) => (status: SongStatus) => {
      return state.songs.filter((song) => song.status === status);
    },
    getSongById: (state) => (id: number) => {
      return state.songs.find((song) => song.id === id);
    },
  },
});
