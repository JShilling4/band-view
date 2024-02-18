import { Notify } from "quasar";
import supabase from "@/supabase";
import { defineStore } from "pinia";
import { Tables } from "@/types";

interface State {
  setlists: Tables<"setlist">[];
  loading: boolean;
}

export const useSetlistStore = defineStore("setlists", {
  state: (): State => {
    return {
      setlists: [],
      loading: false,
    };
  },

  actions: {
    async fetchSetlists() {
      if (this.loading || this.setlists.length) return;

      try {
        this.loading = true;
        const { data: setlist, error } = await supabase.from("setlist").select("*");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
        }

        if (setlist) this.setlists = setlist;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
