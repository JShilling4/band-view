import { defineStore } from "pinia";
import { Notify } from "quasar";
import supabase from "@/supabase";
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

interface State {
  shows: Tables<"show">[];
  loading: boolean;
}

export const useShowStore = defineStore("shows", {
  state: (): State => ({
    shows: [],
    loading: false,
  }),

  actions: {
    async fetchShows() {
      if (this.loading || this.shows.length) return;

      try {
        this.loading = true;
        const { data: show, error } = await supabase.from("show").select("*").order("date");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (show) this.shows = show;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async createShow(show: Omit<Tables<"show">, "id">) {
      if (!show.venue) return;

      try {
        const { data, error } = await supabase
          .from("show")
          .insert(show)
          .select()
          .returns<Tables<"show">[]>();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          this.shows.push(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateShow(show: Tables<"show">) {
      if (!show) return;

      try {
        const { error } = await supabase
          .from("show")
          .update({ ...show })
          .eq("id", show.id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.shows.findIndex((s) => s.id === show.id);
          if (target !== -1) {
            this.shows.splice(target, 1, show);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteShow(id: number) {
      this.loading = true;
      try {
        const { error } = await supabase.from("show").delete().eq("id", id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.shows.findIndex((v) => v.id === id);
          if (target !== -1) {
            this.shows.splice(target, 1);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getShowById: (state) => {
      return (id: number | null) => {
        return state.shows.find((show) => show.id === id);
      };
    },
    getShowsOnOrAfterDate: (state) => {
      return (date: string | Date | number = new Date()) => {
        return state.shows.filter((show) => {
          const today = new Date(date).toDateString();
          return (
            (isAfter(new Date(show.date).toDateString(), today) ||
              isEqual(new Date(show.date).toDateString(), today)) &&
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
