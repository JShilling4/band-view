<template>
  <div class="page-container">
    <AppPageTitle>{{ pageTitle }}</AppPageTitle>

    <div class="page-content">
      <div class="top-controls q-mb-md row items-center">
        <QSelect
          v-model="activeTab"
          :options="SONG_STATUSES"
          emit-value
          option-value="name"
          option-label="name"
          label="Status"
          class="app-select-filter col"
          behavior="menu"
          filled
        />
        <QBtn
          v-if="isAdmin"
          color="teal-10"
          icon="fa-solid fa-plus"
          class="q-ml-md"
          no-caps
          dense
          @click="onAddSongClick"
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
        <div class="results-text">{{ songStore.getSongsByStatus(activeTab).length }} results</div>
        <QList separator>
          <SongListItem
            v-for="song in selectedSongs"
            :song="song"
            :key="song.id"
            hide-specials
            @song-clicked="onSongClick(song.id)"
            @delete="onDeleteSongClick(song.id)"
          />
        </QList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useSongStore, useMemberStore, useUserStore } from "@/stores";
import { useSongUtility } from "@/composables";
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

const activeTab = ref<SongStatus>("learning");
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");
const selectedSongs = computed(() => {
  return songStore.getSongsByStatus(activeTab.value);
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

onMounted(async () => {
  await memberStore.fetchMembers();
  songStore.fetchSongs();
});
</script>

<style lang="sass" scoped>
.tab
  text-transform: capitalize
  font-weight: 300
  letter-spacing: 1px

.results-text
  font-size: 18px
  margin-bottom: 1rem
  font-weight: 600
  color: gray

.song-container
  max-width: 500px

:deep(.q-field__native)
  text-transform: capitalize
</style>
