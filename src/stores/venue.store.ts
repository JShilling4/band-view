import supabase from "@/supabase";
import { Tables } from "@/types";
import { defineStore } from "pinia";

interface State {
  venues: Tables<"venue">[];
}

export const useVenueStore = defineStore("venues", {
  state: (): State => ({
    venues: [],
  }),

  actions: {
    async fetchVenues() {
      if (this.venues.length) return;
      const { data: venue } = await supabase.from("venue").select("*").order("name");
      if (!venue) return;

      this.venues = venue;
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
