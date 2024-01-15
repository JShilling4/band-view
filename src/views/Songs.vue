<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>

    <div class="page-content">
      <div class="tabs-container q-mb-lg">
        <q-tabs
          v-model="activeTab"
          inline-label
          :breakpoint="0"
          narrow-indicator
          align="left"
          class="bg-white text-blue-10"
        >
          <q-tab
            v-for="(status, index) in SONG_STATUSES"
            :key="index"
            :name="status"
            :label="status"
            class="tab"
          />
        </q-tabs>
      </div>

      <div class="song-container q-mb-lg">
        <div class="results-text">
          {{ songStore.getSongsByStatus(activeTab).length }} results
        </div>
        <q-list>
          <div v-for="song in selectedSongs" :key="song.id">
            <q-item>
              <q-item-section>
                <q-item-label>{{
                  `${song.artist} - ${song.title}`
                }}</q-item-label>
                <q-item-label lines="1" class="text-brown-5">
                  Vocal:
                  {{
                    memberStore.getMemberById(song.vocalLead)?.firstName ??
                    "None"
                  }}</q-item-label
                >
              </q-item-section>

              <q-item-section side top>
                <q-icon name="fa-solid fa-edit" color="blue-9" />
              </q-item-section>
            </q-item>

            <q-separator spaced />
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useSongStore } from "@/stores/song.store";
import { useMemberStore } from "@/stores/member.store";
import { SONG_STATUSES, SongStatus } from "@/types";

defineProps<{
  pageTitle: string;
}>();

const songStore = useSongStore();
const memberStore = useMemberStore();

const activeTab = ref<SongStatus>("active");

const selectedSongs = computed(() => {
  return songStore.songs.filter((song) => song.status === activeTab.value);
});

onMounted(() => {
  if (!songStore.songs.length) {
    songStore.fetchSongs();
  }
});
</script>

<style lang="scss" scoped>
.tab {
  padding-left: 0;
}

.results-text {
  font-size: 18px;
  margin-bottom: 1rem;
  font-weight: 600;
  color: gray;
}

.q-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
