<template>
  <div class="page-container">
    <AppPageTitle>{{ pageTitle }}</AppPageTitle>
    <div class="page-content">
      <div v-if="rehearsalStore.rehearsals.length">
        <div v-for="rehearsal in rehearsalStore.rehearsals" :key="rehearsal.id" class="q-mb-sm">
          <h3 class="text-h6 text-white bg-teal-10 q-px-sm q-py-xs q-mb-md">
            {{ dateStringToDisplay(rehearsal.date) }} - {{ rehearsal.start_time }}
          </h3>
          <div class="new-songs-container q-mb-sm">
            <QSeparator color="grey-4" spaced />
            <div class="section-header text-grey-6">New Songs</div>
            <QSeparator color="grey-4" spaced />
            <QList class="song-list">
              <SongItem
                v-for="songId in rehearsal.new_songs"
                :key="songId"
                :song="songStore.getSongById(songId)"
              />
            </QList>
          </div>

          <div class="new-songs-container q-mb-sm">
            <QSeparator color="grey-4" spaced />
            <div class="section-header text-grey-6">Review Songs</div>
            <QSeparator color="grey-4" spaced />
            <QList class="song-list">
              <SongItem
                v-for="songId in rehearsal.review_songs"
                :key="songId"
                hide-admin
                :song="songStore.getSongById(songId)"
              />
            </QList>
          </div>

          <div class="agenda-container">
            <QSeparator color="grey-4" spaced />
            <div class="section-header text-grey-6">Notes:</div>
            <QSeparator color="grey-4" spaced />
            <p class="rehearsal-notes">{{ rehearsal.notes }}</p>
          </div>
        </div>
      </div>
      <h6 v-else class="text-grey-8">No rehearsals scheduled.</h6>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useDateUtility } from "@/composables";
import { useMemberStore, useRehearsalStore, useSongStore } from "@/stores";

defineProps<{
  pageTitle: string;
}>();

const rehearsalStore = useRehearsalStore();
const memberStore = useMemberStore();
const songStore = useSongStore();
const { dateStringToDisplay } = useDateUtility();

onMounted(async () => {
  await memberStore.fetchMembers();
  await songStore.fetchSongs();
  rehearsalStore.fetchRehearsals();
});
</script>

<style lang="sass" scoped>

.QItem
  padding-left: 0 !important
  padding-right: 0 !important
  font-family: Roboto, sans-serif
  font-weight: 400

.song-list
  max-width: 500px

.section-header
  font-weight: 500
  font-size: 17px
  color: gray
</style>
