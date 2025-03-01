import { defineStore } from "pinia";
import { Notify } from "quasar";
import { type Tables } from "@/core/models";
import supabase from "@/supabase";

interface State {
  contacts: Tables<"contact">[];
  loading: boolean;
}

export const useContactStore = defineStore("contacts", {
  state: (): State => {
    return {
      contacts: [],
      loading: false,
    };
  },

  actions: {
    async fetchContacts() {
      if (this.loading || this.contacts.length) return;

      try {
        const { data: contact, error } = await supabase.from("contact").select("*");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (contact) {
          this.contacts = contact.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getContactById: (state) => {
      return (id: number | null) => {
        return state.contacts.find((contact) => contact.id === id);
      };
    },
  },
});
