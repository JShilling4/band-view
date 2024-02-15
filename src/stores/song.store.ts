import supabase from "@/supabase";
import omit from "lodash/omit";
import { defineStore } from "pinia";
import { type SongStatus, Tables, type LocalSong } from "@/types";
import { Notify } from "quasar";

interface State {
  songs: Tables<"song">[];
  loading: boolean;
}

export const useSongStore = defineStore("songs", {
  state: (): State => {
    return {
      songs: [],
      loading: false,
    };
  },

  actions: {
    async fetchSongs() {
      if (this.songs.length) return;

      try {
        this.loading = true;
        const { data: song, error } = await supabase.from("song").select("*");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (song) this.songs = song;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
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

    async createSong(song: LocalSong) {
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

    async updateSong(song: Tables<"song">) {
      if (!song) return;
      const clonedSong: LocalSong = omit(song, "id");

      const { error } = await supabase
        .from("song")
        .update({ ...clonedSong })
        .eq("id", song.id);

      if (!error) {
        const target = this.songs.findIndex((s) => s.id === song.id);
        if (target !== -1) {
          this.songs.splice(target, 1, song);
        }
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
