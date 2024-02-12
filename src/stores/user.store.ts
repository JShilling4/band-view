import { defineStore } from "pinia";
import supabase from "@/supabase";
import { User } from "@supabase/supabase-js";
import { useMemberStore } from "@/stores";

interface State {
  user: User | null;
  role: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: null,
    role: null,
  }),

  actions: {
    async logIn(creds: { email: string; password: string }) {
      const { members } = useMemberStore();
      // if any credential is null or undefined, exit.
      if (!creds.email || !creds.password) return;
      // make auth request with user provided credentials
      const { data, error } = await supabase.auth.signInWithPassword(creds);
      // handle auth request error
      if (error) {
        return false;
      } else {
        // handle successful auth request
        this.user = data.user;
        this.role = members.find((m) => m.user_id)?.permission_level ?? null;
        return true;
      }
    },

    async logOut() {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        this.user = null;
        this.role = null;
      } else {
        console.log("logout failed...");
      }
    },
  },
});
