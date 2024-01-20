import supabase from "@/supabase";
import { Tables } from "@/types";
import { defineStore } from "pinia";

interface State {
  members: Tables<"member">[];
}

export const useMemberStore = defineStore("members", {
  state: (): State => ({
    members: [],
  }),

  actions: {
    async fetchMembers() {
      if (this.members.length) return;
      const { data: member, error } = await supabase.from("member").select("*");
      if (!member) return;
      this.members = member;
    },
  },

  getters: {
    getMemberById: (state) => {
      return (id: number | null) => {
        return state.members.find((member) => member.id === id);
      };
    },
  },
});
