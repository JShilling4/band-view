<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>

    <div class="page-content">
      <div class="top-controls q-mb-md row">
        <q-select
          v-model="activeTab"
          :options="SONG_STATUSES"
          emit-value
          option-value="name"
          option-label="name"
          label="Select Song Status"
          class="col"
          dense
          filled
        />
        <q-btn
          v-if="isAdmin"
          color="green-8"
          icon="fa-solid fa-plus"
          class="q-ml-md"
          no-caps
          dense
        />
      </div>

      <div class="song-container q-mb-lg">
        <div class="results-text">{{ songStore.getSongsByStatus(activeTab).length }} results</div>
        <q-list>
          <div v-for="song in selectedSongs" :key="song.id">
            <q-item dense>
              <q-item-section>
                <q-item-label>
                  <span class="song-artist">{{ song.artist }} - </span>
                  <span class="song-title">{{ song.title }}</span>
                </q-item-label>
                <q-item-label v-if="song.vocal_lead" lines="1" class="song-metadata">
                  Vocal:
                  <span
                    :style="{
                      color: memberStore.getMemberById(song.vocal_lead)?.profile_color ?? '',
                    }"
                    class="song-vocal-lead"
                  >
                    {{ memberStore.getMemberById(song.vocal_lead)?.first_name ?? "" }}
                  </span></q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <div>
                  <span class="q-mr-sm">
                    <q-icon
                      v-if="song.link_url"
                      name="fa-brands fa-youtube"
                      color="red-9"
                      class="song-link-icon"
                      @click="openBrowserTab(song.link_url)"
                    />
                  </span>
                  <span v-if="isAdmin" class="admin-controls">
                    <q-icon
                      name="fa-solid fa-trash-alt"
                      color="red-10"
                      @click="onDeleteSetSong(song.id)"
                    />
                  </span>
                </div>
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
import { computed, onMounted, ref, watch, inject } from "vue";
import { useSongStore } from "@/stores/song.store";
import { useMemberStore } from "@/stores/member.store";
import { SONG_STATUSES, SongStatus, isAdminIK } from "@/types";
import { openBrowserTab } from "@/utils/helpers";
import { useRouter } from "vue-router";

const props = defineProps<{
  pageTitle: string;
  status: SongStatus;
}>();

const router = useRouter();
const songStore = useSongStore();
const memberStore = useMemberStore();
const isAdmin = inject(isAdminIK);

const activeTab = ref<SongStatus>("active");

const selectedSongs = computed(() => {
  return songStore.songs.filter((song) => song.status === activeTab.value);
});

watch(
  () => props.status,
  () => {
    if (!props.status) return;
    activeTab.value = props.status;
  },
  { immediate: true }
);

watch(activeTab, (newVal) => {
  router.push({ name: "Songs", query: { status: newVal } });
});

function onDeleteSetSong(id: number) {
  songStore.deleteSong(id);
}

onMounted(async () => {
  await memberStore.fetchMembers();
  songStore.fetchSongs();
});
</script>

<style lang="scss" scoped>
.tab {
  /* padding-left: 0; */
  text-transform: capitalize;
  font-weight: 300;
  letter-spacing: 1px;
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
  font-family: Roboto, sans-serif;
  font-weight: 400;
}

:deep(.q-field__native) {
  text-transform: capitalize;
}

.song-artist {
  color: rgb(163, 163, 163);
}
.song-link-icon {
  cursor: pointer;
}

.song-metadata {
  font-size: 13px;
}
</style>
