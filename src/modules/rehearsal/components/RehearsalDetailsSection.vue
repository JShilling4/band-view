<template>
  <div class="song-section q-mb-sm">
    <QSeparator color="grey-4" spaced />
    <div class="section-header text-grey-6">{{ title }}</div>
    <QSeparator color="grey-4" spaced />

    <div v-if="loading" class="text-center q-pa-md">
      <QSpinner color="primary" />
    </div>

    <QList v-else-if="songList.length" class="song-list">
      <SongDetails v-for="song in songList" :key="song.id" :song="song" :hide-admin="hideAdmin" />
    </QList>

    <div v-else class="text-grey-6 q-pa-sm text-center">None selected.</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  songs?: number[] | null;
  hideAdmin?: boolean;
}>();

const { getSongById } = useSongStore();

const loading = ref(false);
const songList = computed(() => {
  if (!props.songs?.length) return [];

  try {
    return props.songs.map((id) => {
      const song = getSongById(id);
      if (!song) throw new Error(`Song ${id} not found`);
      return song;
    });
  } catch (error) {
    console.error("Error loading songs:", error);
    return [];
  }
});
</script>
