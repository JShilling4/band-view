import supabase from "@/supabase";
import { QueryData } from "@supabase/supabase-js";
import { defineStore } from "pinia";

export const useSetStore = defineStore("sets", {
  state: (): State => ({
    sets: [],
  }),

  actions: {
    async fetchSets() {
      const { data: set, error } = await setQuery;
      if (!set) return;
      const queryResult: Sets = set;
      this.sets = queryResult;
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

interface State {
  sets: Sets;
}

const setQuery = supabase
  .from("set")
  .select(
    `id, name, song:songs_ordered!set_song (title, vocal_lead, sort_order)`
  )
  .order("name");
type Sets = QueryData<typeof setQuery>;
