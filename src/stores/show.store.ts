import { defineStore } from "pinia";
import supabase from "@/supabase";
import { handleError } from "@/utils/error";
import {
  addMonths,
  addYears,
  isAfter,
  isEqual,
  isSameMonth,
  isSameYear,
  isThisMonth,
  isThisYear,
} from "date-fns";
import { type Tables } from "@/types";

export interface ShowStoreState {
  shows: Tables<"show">[];
  loading: boolean;
}

export const useShowStore = defineStore("shows", {
  state: (): ShowStoreState => ({
    shows: [],
    loading: false,
  }),

  actions: {
    async fetchShows() {
      // Guard clause with meaningful return
      if (this.loading) return null;
      if (this.shows.length) return this.shows;

      this.loading = true;
      try {
        const { data: shows, error } = await supabase.from("show").select("*").order("date");

        if (error) throw error;

        this.shows = shows || [];
        return shows;
      } catch (error) {
        handleError(error as Error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async createShow(show: Omit<Tables<"show">, "id">) {
      if (!show.venue) {
        handleError(new Error("Venue is required"));
        return null;
      }

      try {
        const { data, error } = await supabase
          .from("show")
          .insert(show)
          .select()
          .returns<Tables<"show">[]>();

        if (error) throw error;

        if (data?.[0]) {
          this.shows.push(data[0]);
          return data[0];
        }
        return null;
      } catch (error) {
        handleError(error as Error);
        return null;
      }
    },

    async updateShow(show: Tables<"show">) {
      if (!show?.id) {
        handleError(new Error("Show ID is required"));
        return false;
      }

      try {
        const { error } = await supabase.from("show").update(show).eq("id", show.id);

        if (error) throw error;

        const target = this.shows.findIndex((s) => s.id === show.id);
        if (target !== -1) {
          this.shows.splice(target, 1, show);
        }
        return true;
      } catch (error) {
        handleError(error as Error);
        return false;
      }
    },

    async deleteShow(id: number) {
      if (!id) {
        handleError(new Error("Show ID is required"));
        return false;
      }

      this.loading = true;
      try {
        const { error } = await supabase.from("show").delete().eq("id", id);

        if (error) throw error;

        const target = this.shows.findIndex((v) => v.id === id);
        if (target !== -1) {
          this.shows.splice(target, 1);
        }
        return true;
      } catch (error) {
        handleError(error as Error);
        return false;
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getShowById: (state) => {
      return (id: number | null): Tables<"show"> | undefined => {
        if (!id) return undefined;
        return state.shows.find((show) => show.id === id);
      };
    },

    getShowsOnOrAfterDate: (state) => {
      return (date: string | Date | number = new Date()): Tables<"show">[] => {
        const compareDate = new Date(date).toDateString();
        return state.shows.filter((show) => {
          const showDate = new Date(show.date).toDateString();
          return (
            (isAfter(showDate, compareDate) || isEqual(showDate, compareDate)) &&
            isThisYear(show.date)
          );
        });
      };
    },

    getShowsThisMonth: (state) => {
      return state.shows.filter((show) => isThisMonth(show.date));
    },

    getShowsThisYear: (state) => {
      return state.shows.filter((show) => isThisYear(show.date));
    },

    getShowsNextYear: (state) => {
      const nextYear = addYears(new Date(), 1);
      return state.shows.filter((show) => isSameYear(show.date, nextYear));
    },

    getShowsNextMonth: (state) => {
      const nextMonth = addMonths(new Date(), 1);
      return state.shows.filter((show) => isSameMonth(show.date, nextMonth));
    },

    getUpcomingShows(): Tables<"show">[] {
      return this.getShowsOnOrAfterDate();
    },

    getShowsThisYearByVenue: (state) => {
      const showsThisYear = state.shows.filter((show) => isThisYear(show.date));
      return (venueId: number) => {
        return showsThisYear.filter((s) => s.venue === venueId).length;
      };
    },
  },
});
