import supabase from "@/supabase";
import { Tables } from "@/types";
import { defineStore } from "pinia";
import { Notify } from "quasar";

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
