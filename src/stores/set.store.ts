import { Set } from "@/types";
import { defineStore } from "pinia";

interface State {
  sets: Set[];
}

export const useSetStore = defineStore("sets", {
  state: (): State => {
    return {
      sets: [
        {
          id: 1,
          name: "Set 1",
          order: 1,
          songCount: 15,
          songList: [
            {
              name: "Jesus Left Chicago",
              leadVocal: ["Mike"],
              hasBanjoTunedDown: false,
              hasBanjoTunedUp: false,
              isDropD: false,
              starters: ["M", "Gtrs"],
            },
          ],
        },
        {
          id: 2,
          name: "Set 2",
          order: 2,
          songCount: 11,
          songList: [],
        },
        {
          id: 3,
          name: "Set 3",
          order: 3,
          songCount: 11,
          songList: [],
        },
        {
          id: 4,
          name: "Set 4",
          order: 4,
          songCount: 11,
          songList: [],
        },
        {
          id: 5,
          name: "Extra",
          order: 5,
          songCount: 11,
          songList: [],
        },
      ],
    };
  },
});
