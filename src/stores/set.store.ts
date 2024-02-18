import { Notify } from "quasar";
import supabase from "@/supabase";
import { defineStore } from "pinia";
import { Tables } from "@/types";

interface State {
  sets: Tables<"set">[];
  loading: boolean;
}

export const useSetStore = defineStore("sets", {
  state: (): State => ({
    sets: [],
    loading: false,
  }),

  actions: {
    async fetchSets() {
      if (this.loading || this.sets.length) return;

      try {
        this.loading = true;
        const { data: set, error } = await supabase.from("set").select("*").order("name");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (set) this.sets = set;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async updateSetOrder(id: number, songOrder: number[]) {
      try {
        const { data, error } = await supabase
          .from("set")
          .update({ songs: songOrder })
          .eq("id", id)
          .select();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          const target = this.sets.findIndex((s) => s.id === id);
          if (target !== -1) {
            this.sets[target] = data[0];
          }
        }
      } catch (error) {
        console.log(error);
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
