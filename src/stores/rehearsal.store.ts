import supabase from "@/supabase";
import { Tables } from "@/types";
import { defineStore } from "pinia";
import { Notify } from "quasar";

interface State {
  rehearsals: Tables<"rehearsal">[];
  loading: boolean;
}

export const useRehearsalStore = defineStore("rehearsal", {
  state: (): State => {
    return {
      rehearsals: [],
      loading: false,
    };
  },

  actions: {
    async fetchRehearsals() {
      if (this.loading || this.rehearsals.length) return;

      try {
        const { data: rehearsal, error } = await supabase.from("rehearsal").select("*");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (rehearsal) {
          this.rehearsals = rehearsal.sort((a, b) => {
            return a.id > b.id ? 1 : -1;
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
