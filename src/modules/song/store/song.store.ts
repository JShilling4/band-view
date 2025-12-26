import { defineStore } from "pinia";
import { Notify } from "quasar";
import { type Tables } from "@/plugins/supabase";
import { type LocalSong, type SongStatus } from "@/modules/song/models";
import { type VoteCount, getVoteCountsForSongs } from "@/modules/song/services/voteService";
import supabase from "@/plugins/supabase";

interface State {
  songs: Tables<"song">[];
  loading: boolean;
  songVoteCounts: Record<number, VoteCount>;
}

export const useSongStore = defineStore("songs", {
  state: (): State => {
    return {
      songs: [],
      loading: false,
      songVoteCounts: {},
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

        if (song) {
          this.songs = song;
          // Fetch vote counts for suggested songs
          const suggestedSongIds = song.filter((s) => s.status === "suggested").map((s) => s.id);
          if (suggestedSongIds.length > 0) {
            await this.fetchSongVoteCounts(suggestedSongIds);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchSongVoteCounts(songIds: number[]) {
      try {
        const voteCounts = await getVoteCountsForSongs(songIds);
        this.songVoteCounts = { ...this.songVoteCounts, ...voteCounts };
      } catch (error) {
        console.error("Error fetching vote counts:", error);
      }
    },

    updateSongVoteCount(songId: number, voteCount: VoteCount) {
      this.songVoteCounts = {
        ...this.songVoteCounts,
        [songId]: voteCount,
      };
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
    getSongById: (state) => (id: number) => {
      return state.songs.find((song) => song.id === id);
    },
    getSongsByStatus: (state) => (statuses: SongStatus[]) => {
      return state.songs
        .filter((song) => statuses.includes(song.status))
        .sort((a, b) => a.title.localeCompare(b.title));
    },
    getSongVoteCount: (state) => (songId: number) => {
      return state.songVoteCounts[songId] || { upvotes: 0, downvotes: 0 };
    },
  },
});
