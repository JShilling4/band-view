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
      const { data: set, error } = await supabase
        .from("set")
        .select("*")
        .order("name");
      if (!set) return;

      this.sets = set;
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
