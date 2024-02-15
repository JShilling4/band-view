import { defineStore } from "pinia";
import { Notify } from "quasar";
import supabase from "@/supabase";
import { type Tables } from "@/types";

interface State {
  venues: Tables<"venue">[];
  loading: boolean;
}

export const useVenueStore = defineStore("venues", {
  state: (): State => ({
    venues: [],
    loading: false,
  }),

  actions: {
    async fetchVenues() {
      if (this.venues.length) return;

      try {
        this.loading = true;
        const { data: venue, error } = await supabase.from("venue").select("*").order("name");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (venue) {
          this.venues = venue;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getVenueById: (state) => {
      return (id: number | null) => {
        return state.venues.find((venue) => venue.id === id);
      };
    },
  },
});
