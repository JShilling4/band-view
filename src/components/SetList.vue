<template>
  <div v-if="set" class="setlist-wrapper">
    <div class="row items-center">
      <div class="set-name text-bold q-mr-auto">{{ set.name }}</div>
      <q-btn-dropdown
        v-if="isAdmin && set && availableSongs.length"
        color="green-8"
        class="q-mb-md"
        no-caps
        label="Add Song"
      >
        <q-list dense separator>
          <q-item
            v-for="song in availableSongs"
            :key="song.id"
            clickable
            v-close-popup
            @click="onAddSetSongClick(song.id)"
          >
            <q-item-section>
              <q-item-label header>{{ song.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <q-list>
      <VueDraggable
        ref="el"
        v-model="localSetSongs"
        :on-update="onSongDragUpdate"
        :disabled="!isAdmin"
      >
        <div v-for="(song, i) in localSetSongs" :key="song.title" class="song-container">
          <song-list-item
            :song="song"
            :index="i"
            hide-artist
            @delete="onSongListItemDelete(song.id)"
            @click="onSongClick(song.id)"
          />
          <q-separator />
        </div>
      </VueDraggable>

      <song-modal
        v-model:show-modal="showSongModal"
        v-model:song="localSong"
        action="Edit"
        persistent
        @hide="onHideSongModal"
      />
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, watch } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { useSetUtility, useSongUtility } from "@/composables";
import { type Tables, isAdminIK } from "@/types";
import { useSetStore, useSongStore } from "@/stores";

// Types
const props = defineProps<{
  set: Tables<"set">;
}>();

// Dependency
const songStore = useSongStore();
const setStore = useSetStore();
const { onSongClick, onHideSongModal, showSongModal, localSong } = useSongUtility();
const { localSetSongs, updateSetOrder, onDeleteSetSongClick, addLocalSetSong } = useSetUtility();
const isAdmin = inject(isAdminIK);

// State
const availableSongs = computed(() => {
  const setsOfType = setStore.sets.filter((s) => s.type === props.set.type);
  const setlistSongIds = setsOfType.flatMap((s) => s.songs?.map((id) => id) ?? []);

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
    props.set.songs?.forEach((songId) => {
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

<style lang="sass" scoped>
.setlist-wrapper
  flex: 25%
  min-width: 300px

.set-name
  font-size: 18px

.song-container
  max-width: 500px
  width: 100%
</style>
