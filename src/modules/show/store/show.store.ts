import { defineStore } from "pinia";
import { handleError } from "@/core/utils/error";
import supabase from "@/plugins/supabase";
import {
  addMonths,
  addYears,
  isAfter,
  isEqual,
  isSameMonth,
  isSameYear,
  isThisMonth,
  isThisYear,
  subYears,
} from "date-fns";
import { Show } from "@/modules/show/types";

export interface ShowStoreState {
  shows: Show[];
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

    async createShow(show: Omit<Show, "id">) {
      if (!show.venue) {
        handleError(new Error("Venue is required"));
        return null;
      }

      try {
        const { data, error } = await supabase
          .from("show")
          .insert(show)
          .select()
          .overrideTypes<Show[], { merge: false }>();

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

    async updateShow(show: Show) {
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
      return (id: number | null): Show | undefined => {
        if (!id) return undefined;
        return state.shows.find((show) => show.id === id);
      };
    },

    getFirstShowDate: (state) => {
      const sortedShows = state.shows.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      return sortedShows.length > 0 ? sortedShows[0].date : null;
    },

    getShowsOnOrAfterDate: (state) => {
      return (date: string | Date | number = new Date()): Show[] => {
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

    getShowsLastYear: (state) => {
      const lastYear = subYears(new Date(), 1);
      return state.shows.filter((show) => isSameYear(show.date, lastYear));
    },

    getShowsNextYear: (state) => {
      const nextYear = addYears(new Date(), 1);
      return state.shows.filter((show) => isSameYear(show.date, nextYear));
    },

    getShowsNextMonth: (state) => {
      const nextMonth = addMonths(new Date(), 1);
      return state.shows.filter((show) => isSameMonth(show.date, nextMonth));
    },

    getUpcomingShows(): Show[] {
      return this.getShowsOnOrAfterDate();
    },

    getShowsThisYearByVenue: (state) => {
      const showsThisYear = state.shows.filter((show) => isThisYear(show.date));
      return (venueId: number) => {
        return showsThisYear.filter((s) => s.venue === venueId).length;
      };
    },

    getShowsLastYearByVenue(): (venueId: number) => number {
      return (venueId: number) => {
        return this.getShowsLastYear.filter((s) => s.venue === venueId).length;
      };
    },

    getTotalShowsByVenue: (state) => {
      return (venueId: number) => {
        return state.shows.filter((s) => s.venue === venueId).length;
      };
    },
  },
});
