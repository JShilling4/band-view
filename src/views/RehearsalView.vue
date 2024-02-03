<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>
    <div class="page-content">
      <div v-if="rehearsalStore.rehearsals.length">
        <div v-for="rehearsal in rehearsalStore.rehearsals" :key="rehearsal.id" class="q-mb-sm">
          <h3 class="text-h6 text-white bg-green-9 q-px-sm q-py-xs q-mb-md">
            {{ dateStringToDisplay(rehearsal.date) }} - {{ rehearsal.start_time }}
          </h3>
          <div v-if="rehearsal.include_new_songs" class="new-songs-container q-mb-sm">
            <q-separator color="grey-4" spaced />
            <div class="section-header text-grey-6">New Songs</div>
            <q-separator color="grey-4" spaced />
            <q-list class="song-list">
              <div>
                <song-list-item
                  v-for="song in songStore.getSongsByStatus('learning')"
                  :key="song.id"
                  :song="song"
                />
              </div>
            </q-list>
          </div>

          <div class="agenda-container">
            <q-separator color="grey-4" spaced />
            <div class="section-header text-grey-6">Agenda Items</div>
            <q-separator color="grey-4" spaced />
            <q-list class="agenda-list">
              <q-item v-for="item in rehearsal.agenda" :key="item">
                <q-item-section>
                  <q-item-label class="text-body2 text-bold text-grey-9">{{ item }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <h6 v-else class="text-grey-8">No rehearsals scheduled.</h6>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMemberStore, useRehearsalStore, useSongStore } from "@/stores";
import { useDateUtility } from "@/composables";

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

.q-item
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
