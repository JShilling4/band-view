import { defineStore } from "pinia";
import supabase from "@/supabase";
import { User } from "@supabase/supabase-js";
import { useMemberStore } from "@/stores";
import { Tables } from "@/types";
import { Notify } from "quasar";

interface State {
  user: User | null;
  activeMember: Tables<"member"> | null;
  loading: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: null,
    activeMember: null,
    loading: false,
  }),

  actions: {
    async logIn(creds: { email: string; password: string }) {
      if (!creds.email || !creds.password) return;
      try {
        this.loading = true;
        const { data, error } = await supabase.auth.signInWithPassword(creds);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
        }

        if (data.user) {
          this.setUser(data.user);
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async getSession() {
      try {
        this.loading = true;
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
        }

        if (data.session) {
          this.setUser(data.session.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
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
