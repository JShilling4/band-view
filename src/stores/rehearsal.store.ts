import supabase from "@/supabase";
import { Tables } from "@/types";
import { defineStore } from "pinia";

interface State {
  rehearsals: Tables<"rehearsal">[];
}

export const useRehearsalStore = defineStore("rehearsal", {
  state: (): State => {
    return {
      rehearsals: [],
    };
  },

  actions: {
    async fetchRehearsals() {
      if (this.rehearsals.length) return;
      const { data: rehearsal } = await supabase.from("rehearsal").select("*");
      if (!rehearsal) return;
      this.rehearsals = rehearsal.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    },
  },
});
