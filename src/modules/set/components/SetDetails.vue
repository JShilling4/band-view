<template>
  <div v-if="set" class="setlist-wrapper">
    <div class="row items-center">
      <!-- <div class="set-name text-bold q-mr-auto">{{ set.name }}</div> -->
      <QBtnDropdown
        v-if="userStore.memberIsAdmin && set && availableSongs.length"
        color="teal-10"
        class="q-mb-md"
        outline
        no-caps
        label="Add Song"
      >
        <QList dense separator>
          <QItem
            v-for="song in availableSongs"
            :key="song.id"
            v-close-popup
            clickable
            @click="onAddSetSongClick(song.id)"
          >
            <QItemSection>
              <QItemLabel header>{{ song.title }}</QItemLabel>
            </QItemSection>
          </QItem>
        </QList>
      </QBtnDropdown>
    </div>
    <QList>
      <VueDraggable
        v-model="localSetSongs"
        handle=".handle"
        :on-update="onSongDragUpdate"
        :disabled="!userStore.memberIsAdmin"
      >
        <div v-for="(song, i) in localSetSongs" :key="song.title" class="song-container">
          <SongDetails
            :song="song"
            :list-index="i"
            hide-artist
            show-handle
            @delete="onSongListItemDelete(song.id)"
            @click="onSongClick(song.id)"
          />
          <QSeparator />
        </div>
      </VueDraggable>
      <div>
        Total Time: {{ secToMinSec(localSetSongs.reduce((n, { length }) => n + (length ?? 0), 0)) }}
      </div>

      <SongModal
        v-model:show-modal="showSongModal"
        v-model:song="localSong"
        action="Edit"
        persistent
        @hide="onHideSongModal"
      />
    </QList>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import type { Tables } from "@/core/models";
import { secToMinSec } from "@/core/utils/helpers";

// Types
const props = defineProps<{
  setlistId: number;
  set?: Tables<"set">;
}>();

// Dependency
const songStore = useSongStore();
const setStore = useSetStore();
const userStore = useUserStore();
const { onSongClick, onHideSongModal, showSongModal, localSong } = useSongUtility();
const { localSetSongs, updateSetOrder, onDeleteSetSongClick, addLocalSetSong } = useSetUtility();

// State
const availableSongs = computed(() => {
  const setlistSongIds = setStore
    .getSetsBySetlistId(props.setlistId)
    .flatMap((s) => s.songs?.map((id: number) => id) ?? []);

  return songStore.songs
    .filter(
      (s) => (s.status === "active" || s.status === "learning") && !setlistSongIds.includes(s.id)
    )
    .sort((a, b) => {
      return a.title > b.title ? 1 : -1;
    });
});

// Watch
watch(
  () => props.set,
  () => {
    if (!props.set) return;
    const songs: Tables<"song">[] = [];
    props.set.songs?.forEach((songId: number) => {
      const song = songStore.getSongById(songId);
      if (song) songs.push(song);
    });
    localSetSongs.value = songs;
  },
  { immediate: true }
);

function onSongDragUpdate() {
  if (!props.set) return;
  updateSetOrder(props.set.id);
}

function onSongListItemDelete(songId: number) {
  if (!songId || !props.set) return;
  onDeleteSetSongClick(songId);
  updateSetOrder(props.set.id);
}

function onAddSetSongClick(songId: number) {
  const song = songStore.getSongById(songId);
  if (!song || !props.set) return;
  addLocalSetSong(song);
  updateSetOrder(props.set.id);
}
</script>

<style lang="scss" scoped>
.setlist-wrapper {
  flex: 25%;
  min-width: 300px;
}
.set-name {
  font-size: 18px;
}

.song-container {
  max-width: 500px;
  width: 100%;
}
</style>
