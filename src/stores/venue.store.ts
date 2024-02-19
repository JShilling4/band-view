import { Notify } from "quasar";
import supabase from "@/supabase";
import omit from "lodash/omit";
import { defineStore } from "pinia";
import { useArrayUtility } from "@/composables";
import type { LocalVenue, Tables } from "@/types";

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

    async deleteVenue(id: number) {
      this.loading = true;
      try {
        const { error } = await supabase.from("venue").delete().eq("id", id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.venues.findIndex((v) => v.id === id);
          if (target !== -1) {
            this.venues.splice(target, 1);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async createVenue(venue: LocalVenue) {
      if (!venue) return;

      try {
        const { data, error } = await supabase
          .from("venue")
          .insert(venue)
          .select()
          .returns<Tables<"venue">[]>();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          this.venues.push(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateVenue(venue: Tables<"venue">) {
      if (!venue) return;

      try {
        const clonedVenue: LocalVenue = omit(venue, "id");
        const { error } = await supabase
          .from("venue")
          .update({ ...clonedVenue })
          .eq("id", venue.id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.venues.findIndex((s) => s.id === venue.id);
          if (target !== -1) {
            this.venues.splice(target, 1, venue);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getVenueById: (state) => {
      return (id: number | null) => {
        return state.venues.find((venue) => venue.id === id);
      };
    },

    getVenueCities: (state) => {
      const { removeDuplicateStrings, removeNullAndEmpty } = useArrayUtility();
      const venueCities = state.venues.map((v) => (v.city !== null ? v.city : ""));
      return removeNullAndEmpty(removeDuplicateStrings(venueCities)).sort();
    },

    getVenuesByCity: (state) => {
      return (city: string) => {
        return state.venues.filter((venue) => venue.city === city);
      };
    },
  },
});
