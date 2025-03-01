import { ref } from "vue";
import { Tables } from "@/core/models";
import { useSetStore } from "@/modules/set/store";
import { useSongStore } from "@/modules/song/store";

export function useSetUtility() {
  const songStore = useSongStore();
  const setStore = useSetStore();

  const localSetSongs = ref<Tables<"song">[]>([]);

  async function updateSetOrder(setId: number, songIds?: number[]) {
    if (!setId) return;
    if (!songIds) {
      songIds = localSetSongs.value.map((ss) => ss.id);
    }
    await setStore.updateSetOrder(setId, songIds);
  }

  function addLocalSetSong(song: Tables<"song">) {
    if (!song) return;
    localSetSongs.value.push(song);
  }

  function onDeleteSetSongClick(id: number) {
    const song = songStore.getSongById(id);
    if (song) {
      const target = localSetSongs.value.findIndex((s) => s.id === id);
      if (target > -1) {
        localSetSongs.value.splice(target, 1);
      }
    }
  }

  function syncLocalSetSongs(selectedSet: Tables<"set">) {
    localSetSongs.value = [];
    if (!selectedSet.songs?.length) return;
    const songs: Tables<"song">[] = [];
    selectedSet.songs?.forEach((id) => {
      const song = songStore.getSongById(id);
      if (song) songs.push(song);
    });
    localSetSongs.value = songs;
  }

  return {
    onDeleteSetSongClick,
    addLocalSetSong,
    updateSetOrder,
    localSetSongs,
    syncLocalSetSongs,
  };
}
