<template>
  <div class="page-container">
    <AppPageTitle>{{ pageTitle }}</AppPageTitle>
    <div class="page-content">
      <div class="top-controls q-mb-md row items-center">
        <QBtn
          v-if="isAdmin"
          color="teal-10"
          icon="fa-solid fa-plus"
          class="q-mr-md"
          no-caps
          dense
          @click="onAddSongClick"
        />
        <AppSelect
          v-model="statusFilter"
          :options="Array(...SONG_STATUSES).sort()"
          emit-value
          option-value="name"
          option-label="name"
          label="Select Status"
        />
        <SongModal
          v-model:show-modal="showSongModal"
          v-model:song="localSong"
          :action="songModalAction"
          persistent
          @hide="onHideSongModal"
        />
      </div>
      <div class="song-container q-mb-lg">
        <div v-if="error" class="text-negative q-mb-md">
          {{ error }}
        </div>
        <div v-if="isLoading">
          <QSkeleton v-for="n in 3" :key="n" type="rect" class="q-mb-sm" />
        </div>
        <template v-else>
          <div v-if="statusFilter" class="results-text">
            {{ songStore.getSongsByStatus(statusFilter).length }} results
          </div>
          <QList separator>
            <SongDetails
              v-for="song in selectedSongs"
              :key="song.id"
              :song="song"
              @song-clicked="onSongClick(song.id)"
              @delete="onDeleteSongClick(song.id)"
            />
          </QList>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { QSkeleton } from "quasar";
import { useSongUtility } from "@/composables";
import { useMemberStore, useSongStore, useUserStore } from "@/stores";
import { SONG_STATUSES, type SongStatus } from "@/types";

const props = defineProps<{
  pageTitle: string;
  status: SongStatus;
}>();

const router = useRouter();
const songStore = useSongStore();
const memberStore = useMemberStore();
const userStore = useUserStore();
const {
  localSong,
  onDeleteSongClick,
  onSongClick,
  showSongModal,
  songModalAction,
  onHideSongModal,
  onAddSongClick,
} = useSongUtility();

const statusFilter = ref<SongStatus | null>(null);
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");
const selectedSongs = computed(() => {
  if (!statusFilter.value) return;
  return songStore.getSongsByStatus(statusFilter.value);
});

const isLoading = ref(false);
const error = ref<string | null>(null);

watch(
  () => props.status,
  () => {
    if (!props.status) return;
    statusFilter.value = props.status;
  },
  { immediate: true }
);

watch(statusFilter, (newVal) => {
  router.push({ name: "Songs", query: { status: newVal } });
});

onMounted(async () => {
  isLoading.value = true;
  error.value = null;

  try {
    await memberStore.fetchMembers();
    await songStore.fetchSongs();
  } catch (err) {
    error.value = "Failed to load songs. Please try again later.";
    console.error("Error loading songs:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.song-container {
  max-width: 500px;
}

:deep(.q-field__native) {
  text-transform: capitalize;
}
</style>
