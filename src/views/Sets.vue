<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>

    <div class="page-content">
      <div class="top-controls q-mb-md row">
        <q-select
          v-model="activeTab"
          :options="setStore.sets.map((set) => set.name)"
          emit-value
          option-value="name"
          option-label="name"
          label="Select Set Name"
          filled
          dense
          class="col"
        />
        <q-btn-dropdown
          v-if="isAdmin && selectedSet && availableSongs.length"
          color="green-8"
          icon="fa-solid fa-plus"
          class="q-ml-md"
          no-caps
          dense
        >
          <q-list dense separator>
            <q-item
              v-for="song in availableSongs"
              clickable
              v-close-popup
              @click="onAddSong(song.id)"
            >
              <q-item-section>
                <q-item-label header>{{ song.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <div class="song-container q-mb-lg">
        <q-list>
          <VueDraggable
            ref="el"
            v-model="localSetSongs"
            :on-update="updateSetOrder"
            :disabled="!isAdmin"
          >
            <div v-for="(song, i) in localSetSongs" :key="song.title">
              <song-list-item :song="song" :index="i" />
              <q-separator />
            </div>
          </VueDraggable>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore, useSetStore, useSongStore } from "@/stores";
import { VueDraggable } from "vue-draggable-plus";
import { Tables, isAdminIK } from "@/types";

const props = defineProps<{
  pageTitle: string;
  name: string | undefined;
}>();

const router = useRouter();
const memberStore = useMemberStore();
const songStore = useSongStore();
const setStore = useSetStore();
const isAdmin = inject(isAdminIK);

const activeTab = ref("");

const selectedSet = computed(() => {
  return setStore.sets.find((set) => set.name === activeTab.value);
});

const localSetSongs = ref<Tables<"song">[]>([]);

const availableSongs = computed(() => {
  const setsOfType = setStore.sets.filter((s) => s.type === selectedSet.value?.type);
  const setlistSongIds = setsOfType.flatMap((s) => s.songs?.map((id) => id) ?? []);

  return songStore.songs
    .filter((s) => s.status === "active" && !setlistSongIds.includes(s.id))
    .sort((a, b) => {
      return a.title > b.title ? 1 : -1;
    });
});

watch(
  () => props.name,
  () => {
    if (!props.name) return;
    activeTab.value = props.name;
    syncLocalSetSongs();
  },
  { immediate: true }
);

watch(
  activeTab,
  (newVal) => {
    router.push({ name: "Sets", query: { name: newVal } });
  },
  { immediate: true }
);

watch(
  selectedSet,
  () => {
    syncLocalSetSongs();
  },
  { immediate: true }
);

function syncLocalSetSongs() {
  localSetSongs.value = [];
  if (!selectedSet.value?.songs?.length) return;
  const songs: Tables<"song">[] = [];
  selectedSet.value.songs?.forEach((id) => {
    let song = songStore.getSongById(id);
    if (song) songs.push(song);
  });
  localSetSongs.value = songs;
}

function updateSetOrder() {
  if (selectedSet.value) {
    setStore.updateSetOrder(
      selectedSet.value.id,
      localSetSongs.value.map((ss) => ss.id)
    );
  }
}

function onAddSong(id: number) {
  const song = songStore.getSongById(id);
  if (song) {
    localSetSongs.value.push(song);
    updateSetOrder();
  }
}

onMounted(async () => {
  await memberStore.fetchMembers();
  await songStore.fetchSongs();
  await setStore.fetchSets();
});
</script>

<style lang="sass" scoped>
.song-container
  max-width: 500px
</style>
