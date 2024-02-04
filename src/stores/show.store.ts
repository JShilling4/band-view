import supabase from "@/supabase";
import { Tables } from "@/types";
import { defineStore } from "pinia";
import { isAfter, isThisMonth, isThisYear, addMonths, isSameMonth } from "date-fns";

interface State {
  shows: Tables<"show">[];
}

export const useShowStore = defineStore("shows", {
  state: (): State => ({
    shows: [],
  }),

  actions: {
    async fetchShows() {
      if (this.shows.length) return;
      const { data: show } = await supabase.from("show").select("*").order("date");
      if (!show) return;

      this.shows = show;
    },
  },

  getters: {
    getShowById: (state) => {
      return (id: number | null) => {
        return state.shows.find((show) => show.id === id);
      };
    },
    getShowsAfterDate: (state) => {
      return (date: string | Date | number = new Date()) => {
        return state.shows.filter((show) => isAfter(show.date, date));
      };
    },
    getShowsThisMonth: (state) => {
      return state.shows.filter((show) => isThisMonth(show.date));
    },
    getShowsThisYear: (state) => {
      return state.shows.filter((show) => isThisYear(show.date));
    },
    getShowsNextMonth: (state) => {
      const nextMonth = addMonths(new Date(), 1);
      return state.shows.filter((show) => isSameMonth(show.date, nextMonth));
    },
    getUpcomingShows(): Tables<"show">[] {
      return this.getShowsAfterDate().slice(0, 4);
    },
  },
});
