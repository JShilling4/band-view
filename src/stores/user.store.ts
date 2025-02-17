import { defineStore } from "pinia";
import { Notify } from "quasar";
import supabase from "@/supabase";
import { User } from "@supabase/supabase-js";
import { useMemberStore } from "@/stores";
import { Tables } from "@/types";

interface State {
  user: User | null;
  activeMember: Tables<"member"> | null;
  loading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: null,
    activeMember: null,
    loading: false,
  }),

  actions: {
    async logIn(creds: LoginCredentials): Promise<boolean> {
      if (!creds.email || !creds.password) {
        Notify.create({
          type: "negative",
          message: "Please provide both email and password",
        });
        return false;
      }

      try {
        this.loading = true;
        const { data, error } = await supabase.auth.signInWithPassword(creds);

        if (error) throw error;

        if (data.user) {
          await this.setUser(data.user);
          Notify.create({
            type: "positive",
            message: "Successfully logged in",
          });
          return true;
        }
        return false;
      } catch (error) {
        Notify.create({
          type: "negative",
          message: error instanceof Error ? error.message : "Login failed",
        });
        return false;
      } finally {
        this.loading = false;
      }
    },

    async getSession(): Promise<void> {
      try {
        this.loading = true;
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
          await this.setUser(data.session.user);
        }
      } catch (error) {
        Notify.create({
          type: "negative",
          message: error instanceof Error ? error.message : "Failed to restore session",
        });
      } finally {
        this.loading = false;
      }
    },

    async setUser(user: User): Promise<void> {
      const memberStore = useMemberStore();

      // Ensure members are loaded
      if (!memberStore.members.length) {
        await memberStore.fetchMembers();
      }

      this.user = user;
      const member = memberStore.getMemberById(user.id);

      if (!member) {
        Notify.create({
          type: "warning",
          message: "No member profile found for this user",
        });
      }

      this.activeMember = member ?? null;
    },

    async logOut(): Promise<boolean> {
      try {
        this.loading = true;
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        this.clearUserData();
        Notify.create({
          type: "positive",
          message: "Successfully logged out",
        });
        return true;
      } catch (error) {
        Notify.create({
          type: "negative",
          message: error instanceof Error ? error.message : "Logout failed",
        });
        return false;
      } finally {
        this.loading = false;
      }
    },

    clearUserData(): void {
      this.user = null;
      this.activeMember = null;
    },
  },

  getters: {
    isAuthenticated: (state): boolean => !!state.user,

    memberRole: (state): string | null => state.activeMember?.permission_level ?? null,

    memberFullName: (state): string | null =>
      state.activeMember
        ? `${state.activeMember.first_name} ${state.activeMember.last_name}`
        : null,
  },
});
