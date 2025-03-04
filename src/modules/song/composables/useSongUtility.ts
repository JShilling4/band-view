import { type Tables } from "@/core/models";
import { LocalSong, NewSong } from "@/modules/song/models";
import clone from "lodash/clone";

export function useSongUtility() {
  // Dependency
  const songStore = useSongStore();

  // State
  const localSong = ref<LocalSong | Tables<"song">>(NewSong());
  const showSongModal = ref(false);
  const songModalAction = ref<"Add" | "Edit">("Add");

  // Methods
  function onSongClick(songId: number) {
    localSong.value = clone(songStore.getSongById(songId)) ?? NewSong();
    songModalAction.value = "Edit";
    showSongModal.value = true;
  }

  function onDeleteSongClick(id: number) {
    songStore.deleteSong(id);
  }

  function onAddSongClick() {
    songModalAction.value = "Add";
    showSongModal.value = true;
  }

  function onHideSongModal() {
    localSong.value = NewSong();
  }

  return {
    localSong,
    onSongClick,
    onDeleteSongClick,
    onAddSongClick,
    showSongModal,
    songModalAction,
    onHideSongModal,
  };
}
