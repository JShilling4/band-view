import supabase from "@/supabase";
import { Tables } from "@/types";
import { defineStore } from "pinia";

interface State {
  sets: Tables<"set">[];
}

export const useSetStore = defineStore("sets", {
  state: (): State => ({
    sets: [],
  }),

  actions: {
    async fetchSets() {
      if (this.sets.length) return;
      const { data: set, error } = await supabase.from("set").select("*").order("name");
      if (!set) return;

      this.sets = set;
    },

    async updateSetOrder(id: number, songOrder: number[]) {
      const { data, error } = await supabase
        .from("set")
        .update({ songs: songOrder })
        .eq("id", id)
        .select();
      if (!data) return;
      const target = this.sets.findIndex((s) => s.id === id);
      if (target !== -1) {
        this.sets[target] = data[0];
      }
    },
  },

  getters: {
    getSetById: (state) => {
      return (id: number | null) => {
        return state.sets.find((set) => set.id === id);
      };
    },
  },
});
