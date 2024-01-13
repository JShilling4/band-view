import { Setlist } from "@/types";
import { defineStore } from "pinia";

interface State {
  setlists: Setlist[];
}

export const useSetlistStore = defineStore("setlists", {
  state: (): State => {
    return {
      setlists: [],
    };
  },
});
