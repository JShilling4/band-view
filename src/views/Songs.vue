<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>

    <div class="page-content">
      <div class="song-container q-mb-lg">
        <div v-for="song in $songStore.songs" :key="song.id">
          {{ `${song.artist} - ${song.title}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useSongStore } from "@/stores/song.store";

defineProps<{
  pageTitle: string;
}>();

const $songStore = useSongStore();

onMounted(() => {
  if (!$songStore.songs.length) {
    $songStore.fetchSongs();
  }
});
</script>

<style lang="scss" scoped></style>
