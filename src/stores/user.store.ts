import { defineStore } from "pinia";
import supabase from "@/supabase";
import { User } from "@supabase/supabase-js";
import { useMemberStore } from "@/stores";
import { Tables } from "@/types";

interface State {
  user: User | null;
  activeMember: Tables<"member"> | null;
  userLoading: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: null,
    activeMember: null,
    userLoading: false,
  }),

  actions: {
    async logIn(creds: { email: string; password: string }) {
      if (!creds.email || !creds.password) return;
      try {
        this.userLoading = true;
        const { data, error } = await supabase.auth.signInWithPassword(creds);
        if (error) throw error;

        if (data) {
          this.setUser(data.user);
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        this.userLoading = false;
      }
    },

    async getSession() {
      try {
        this.userLoading = true;
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          this.setUser(data.session.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.userLoading = false;
      }
    },

    setUser(user: User) {
      const { members } = useMemberStore();
      this.user = user;
      this.activeMember = members.find((m) => m.user_id) ?? null;
    },

    async logOut() {
      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw error;
        } else {
          this.user = null;
          this.activeMember = null;
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
