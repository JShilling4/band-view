import supabase from "@/supabase";
import { Tables } from "@/types";
import { defineStore } from "pinia";

interface State {
  setlists: Tables<"setlist">[];
}

export const useSetlistStore = defineStore("setlists", {
  state: (): State => {
    return {
      setlists: [],
    };
  },

  actions: {
    async fetchSetlists() {
      if (this.setlists.length) return;
      const { data: setlist, error } = await supabase.from("setlist").select("*");
      if (!setlist) return;
      this.setlists = setlist;
    },
  },
});
