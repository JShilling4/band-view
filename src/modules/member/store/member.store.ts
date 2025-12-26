import { defineStore } from "pinia";
import { Notify } from "quasar";
import { type Tables } from "@/plugins/supabase";
import supabase from "@/plugins/supabase";

interface State {
  members: Tables<"member">[];
  loading: boolean;
}

export const useMemberStore = defineStore("members", {
  state: (): State => ({
    members: [],
    loading: false,
  }),

  actions: {
    async fetchMembers() {
      if (this.loading || this.members.length) return;
      try {
        this.loading = true;
        const { data, error } = await supabase.from("member").select("*");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          this.members = data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getMemberById: (state) => {
      return (id: number | null | undefined) => {
        return state.members.find((member) => member.id === id);
      };
    },
    getMemberByUserId: (state) => {
      return (userId: string | null | undefined) => {
        return state.members.find((member) => member.user_id === userId);
      };
    },
    getMemberFullNameById: (state) => {
      return (id: number | null | undefined) => {
        const member = state.members.find((member) => member.id === id);
        if (!member) return "";
        return `${member.first_name} ${member.last_name}`.trim();
      };
    },
  },
});
