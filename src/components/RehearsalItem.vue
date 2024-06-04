<template>
  <div class="rehearsal-item">
    <div class="new-songs-container q-mb-sm">
      <QSeparator color="grey-4" spaced />
      <div class="section-header text-grey-6">New Songs</div>
      <QSeparator color="grey-4" spaced />
      <QList v-if="rehearsal.new_songs?.length" class="song-list">
        <SongItem v-for="songId in rehearsal.new_songs" :key="songId" :song="getSongById(songId)" />
      </QList>
      <div v-else>None selected.</div>
    </div>

    <div class="new-songs-container q-mb-sm">
      <QSeparator color="grey-4" spaced />
      <div class="section-header text-grey-6">Review Songs</div>
      <QSeparator color="grey-4" spaced />
      <QList v-if="rehearsal.review_songs?.length" class="song-list">
        <SongItem
          v-for="songId in rehearsal.review_songs"
          :key="songId"
          hide-admin
          :song="getSongById(songId)"
        />
      </QList>
      <div v-else>None selected.</div>
    </div>

    <div class="agenda-container">
      <QSeparator color="grey-4" spaced />
      <div class="section-header text-grey-6">Notes:</div>
      <QSeparator color="grey-4" spaced />
      <p class="rehearsal-notes">{{ rehearsal.notes }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSongStore } from "@/stores";
import { Tables } from "@/types";

defineProps<{
  rehearsal: Tables<"rehearsal">;
}>();

const { getSongById } = useSongStore();
</script>

<style lang="scss" scoped></style>
