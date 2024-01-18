import { defineStore } from "pinia";

interface State {
  setlists: [];
}

export const useSetlistStore = defineStore("setlists", {
  state: (): State => {
    return {
      setlists: [],
    };
  },
});
