import { defineStore } from "pinia";
import { Notify } from "quasar";
import supabase from "@/supabase";
import { Tables } from "@/types";

interface State {
  sets: Tables<"set">[];
  loading: boolean;
}

export const useSetStore = defineStore("sets", {
  state: (): State => ({
    sets: [],
    loading: false,
  }),

  actions: {
    async fetchSets() {
      if (this.loading || this.sets.length) return;

      try {
        this.loading = true;
        const { data: set, error } = await supabase.from("set").select("*");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (set) this.sets = set;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async createSet(set: Omit<Tables<"set">, "id">): Promise<
      | {
          id: number;
          songs: number[] | null;
        }
      | null
      | undefined
    > {
      try {
        const { data, error } = await supabase
          .from("set")
          .insert(set)
          .select()
          .returns<Tables<"set">[]>();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          this.sets.push(data[0]);
          return data[0];
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    async deleteSet(id: number): Promise<boolean | undefined> {
      this.loading = true;
      try {
        const { error } = await supabase.from("set").delete().eq("id", id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.sets.findIndex((v) => v.id === id);
          if (target !== -1) {
            this.sets.splice(target, 1);
          }
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async updateSetOrder(id: number, songOrder: number[]) {
      try {
        const { data, error } = await supabase
          .from("set")
          .update({ songs: songOrder })
          .eq("id", id)
          .select();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          const target = this.sets.findIndex((s) => s.id === id);
          if (target !== -1) {
            this.sets[target] = data[0];
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getSetById: (state) => {
      return (id: number | null) => {
        return state.sets.find((set) => set.id === id);
      };
    },
  },
});
