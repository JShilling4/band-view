import supabase from "@/supabase";
import { Tables } from "@/types";
import { defineStore } from "pinia";

interface State {
  shows: Tables<"show">[];
}

export const useSetStore = defineStore("shows", {
  state: (): State => ({
    shows: [],
  }),

  actions: {
    async fetchShows() {
      if (this.shows.length) return;
      const { data: show } = await supabase.from("show").select("*").order("name");
      if (!show) return;

      this.shows = show;
    },

    // async updateSetOrder(id: number, songOrder: number[]) {
    //   const { data } = await supabase
    //     .from("set")
    //     .update({ songs: songOrder })
    //     .eq("id", id)
    //     .select();
    //   if (!data) return;
    //   const target = this.sets.findIndex((s) => s.id === id);
    //   if (target !== -1) {
    //     this.sets[target] = data[0];
    //   }
    // },
  },

  getters: {
    getShowById: (state) => {
      return (id: number | null) => {
        return state.shows.find((show) => show.id === id);
      };
    },
  },
});
