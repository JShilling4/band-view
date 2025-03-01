import { defineStore } from "pinia";
import { Notify } from "quasar";
import { type Tables } from "@/core/models";
import { useSetStore } from "@/modules/set/store";
import { type LocalSetlist } from "@/modules/setlist/models";
import supabase from "@/supabase";
import omit from "lodash/omit";

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

    async deleteSetlist(setlist: Tables<"setlist">): Promise<boolean | undefined> {
      const setStore = useSetStore();

      this.loading = true;
      try {
        // delete sets first
        if (setlist.sets?.length) {
          setlist.sets?.forEach(async (setId) => {
            await setStore.deleteSet(setId);
          });
        }

        const { error } = await supabase.from("setlist").delete().eq("id", setlist.id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.setlists.findIndex((v) => v.id === setlist.id);
          if (target !== -1) {
            this.setlists.splice(target, 1);
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

    async createSetlist(setlist: LocalSetlist, setsToCreate: string) {
      const setStore = useSetStore();

      if (!setlist) return;

      try {
        const setIds: number[] = [];
        for (let i = 0; i < Number(setsToCreate); i++) {
          const set = await setStore.createSet({ songs: [] });
          if (set) setIds.push((set as unknown as Tables<"set">).id);
        }
        setlist.sets = setIds;

        const { data, error } = await supabase
          .from("setlist")
          .insert(setlist)
          .select()
          .returns<Tables<"setlist">[]>();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          this.setlists.push(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateSetlist(setlist: Tables<"setlist">) {
      if (!setlist) return;

      try {
        const clonedSetlist: LocalSetlist = omit(setlist, "id");
        const { error } = await supabase
          .from("setlist")
          .update({ ...clonedSetlist })
          .eq("id", setlist.id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.setlists.findIndex((s) => s.id === setlist.id);
          if (target !== -1) {
            this.setlists.splice(target, 1, setlist);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getSetlistById: (state) => {
      return (id: number | null) => {
        return state.setlists.find((setlist) => setlist.id === id);
      };
    },
  },
});
