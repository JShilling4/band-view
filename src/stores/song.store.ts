import { defineStore } from "pinia";
import { Notify } from "quasar";
import supabase from "@/supabase";
import { type LocalSong, type SongStatus, Tables } from "@/types";

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
      try {
        this.loading = true;
        const { error } = await supabase.from("song").delete().eq("id", id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.songs.findIndex((s) => s.id === id);
          if (target !== -1) {
            this.songs.splice(target, 1);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async createSong(song: LocalSong) {
      if (!song) return;

      try {
        const { data, error } = await supabase
          .from("song")
          .insert(song)
          .select()
          .returns<Tables<"song">[]>();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          this.songs.push(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateSong(song: Tables<"song">) {
      if (!song) return;

      try {
        const { error } = await supabase
          .from("song")
          .update({ ...song })
          .eq("id", song.id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.songs.findIndex((s) => s.id === song.id);
          if (target !== -1) {
            this.songs.splice(target, 1, song);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getSongsByStatus: (state) => (status: SongStatus) => {
      return state.songs
        .filter((song) => song.status === status)
        .sort((a, b) => a.title.localeCompare(b.title));
    },
    getSongById: (state) => (id: number) => {
      return state.songs.find((song) => song.id === id);
    },
  },
});
