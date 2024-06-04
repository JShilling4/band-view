import { defineStore } from "pinia";
import { Notify } from "quasar";
import supabase from "@/supabase";
import { isAfter, isEqual } from "date-fns";
import omit from "lodash/omit";
import type { LocalRehearsal, Tables } from "@/types";

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

    async deleteRehearsal(id: number) {
      this.loading = true;
      try {
        const { error } = await supabase.from("rehearsal").delete().eq("id", id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.rehearsals.findIndex((v) => v.id === id);
          if (target !== -1) {
            this.rehearsals.splice(target, 1);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async createRehearsal(rehearsal: LocalRehearsal) {
      if (!rehearsal) return;

      try {
        const { data, error } = await supabase
          .from("rehearsal")
          .insert(rehearsal)
          .select()
          .returns<Tables<"rehearsal">[]>();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          this.rehearsals.push(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateRehearsal(rehearsal: Tables<"rehearsal">) {
      if (!rehearsal) return;

      try {
        const clonedRehearsal: LocalRehearsal = omit(rehearsal, "id");
        const { error } = await supabase
          .from("rehearsal")
          .update({ ...clonedRehearsal })
          .eq("id", rehearsal.id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.rehearsals.findIndex((s) => s.id === rehearsal.id);
          if (target !== -1) {
            this.rehearsals.splice(target, 1, rehearsal);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getRehearsalById: (state) => {
      return (id: number | null) => {
        return state.rehearsals.find((rehearsal) => rehearsal.id === id);
      };
    },
    getRehearsalsOnOrAfterDate: (state) => {
      return (date: string | Date | number = new Date()) => {
        return state.rehearsals.filter((rehearsal) => {
          const today = new Date(date).toDateString();
          return (
            isAfter(new Date(rehearsal.date).toDateString(), today) ||
            isEqual(new Date(rehearsal.date).toDateString(), today)
          );
        });
      };
    },
  },
});
