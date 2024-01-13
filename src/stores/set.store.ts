import { Set } from "@/types";
import { defineStore } from "pinia";

interface State {
  sets: Set[];
}

export const useSetStore = defineStore("sets", {
  state: (): State => {
    return {
      sets: [],
    };
  },
});
