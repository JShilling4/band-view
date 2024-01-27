<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>
    <div class="page-content">
      <div class="top-controls q-mb-md row">
        <q-select
          v-model="activeTab"
          :options="setlistStore.setlists.map((sl) => sl.name)"
          emit-value
          option-value="name"
          option-label="name"
          label="Select Setlist"
          filled
          dense
          class="col"
          behavior="menu"
        />
        <!-- <q-btn-dropdown
          v-if="isAdmin && selectedSet && availableSongs.length"
          color="green-8"
          icon="fa-solid fa-plus"
          class="q-ml-md"
          no-caps
          dense
        >
          <q-list dense separator>
            <q-item v-for="song in availableSets" clickable v-close-popup @click="onAddSet(set.id)">
              <q-item-section>
                <q-item-label header>{{ set.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->
      </div>

      <div class="setlist-container row q-col-gutter-xl">
        <q-list
          v-if="selectedSetlist"
          v-for="(setId, i) in selectedSetlist.sets"
          :key="setId"
          class="set-container q-mb-md"
        >
          <div class="set-name">{{ setStore.getSetById(setId)?.name }}</div>
          <div v-for="(songId, i) in setStore.getSetById(setId)?.songs" :key="songId">
            <song-list-item
              :song="songStore.getSongById(songId)"
              :index="i"
              hide-artist
              @song-clicked="onSongClicked(songId)"
            />
            <q-separator v-if="i < (setStore.getSetById(setId)?.songs?.length as number) - 1" />
          </div>
        </q-list>
      </div>
    </div>

    <song-modal
      v-model:show-modal="showSongModal"
      v-model:song="localSong"
      action="Edit"
      persistent
      @hide="onHideSongModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore, useSetStore, useSongStore } from "@/stores";
import { VueDraggable } from "vue-draggable-plus";
import { LocalSong, NewSong, Tables, isAdminIK } from "@/types";
import { useSetlistStore } from "@/stores/setlist.store";

const props = defineProps<{
  pageTitle: string;
  name: string | undefined;
}>();

const router = useRouter();
const memberStore = useMemberStore();
const songStore = useSongStore();
const setStore = useSetStore();
const setlistStore = useSetlistStore();
const isAdmin = inject(isAdminIK);

const activeTab = ref("");
const showSongModal = ref(false);
const songModalAction = ref<"Add" | "Edit">("Add");
const localSong = ref<LocalSong | Tables<"song">>(NewSong());
const selectedSetlist = computed(() => {
  return setlistStore.setlists.find((setlist) => setlist.name === activeTab.value);
});

// const localSetSongs = ref<Tables<"song">[]>([]);

// const availableSongs = computed(() => {
//   const setsOfType = setStore.sets.filter((s) => s.type === selectedSetlist.value?.type);
//   const setlistSongIds = setsOfType.flatMap((s) => s.songs?.map((id) => id) ?? []);

//   return songStore.songs
//     .filter((s) => s.status === "active" && !setlistSongIds.includes(s.id))
//     .sort((a, b) => {
//       return a.title > b.title ? 1 : -1;
//     });
// });

watch(
  () => props.name,
  () => {
    if (!props.name) return;
    activeTab.value = props.name;
    // syncLocalSetSongs();
  },
  { immediate: true }
);

watch(
  activeTab,
  (newVal) => {
    router.push({ name: "Setlists", query: { name: newVal } });
  },
  { immediate: true }
);

// watch(
//   selectedSetlist,
//   () => {
//     syncLocalSetSongs();
//   },
//   { immediate: true }
// );

// function syncLocalSetSongs() {
//   localSetSongs.value = [];
//   if (!selectedSetlist.value?.songs?.length) return;
//   const songs: Tables<"song">[] = [];
//   selectedSetlist.value.songs?.forEach((id) => {
//     let song = songStore.getSongById(id);
//     if (song) songs.push(song);
//   });
//   localSetSongs.value = songs;
// }

// function updateSetOrder() {
//   if (selectedSet.value) {
//     setStore.updateSetOrder(
//       selectedSet.value.id,
//       localSetSongs.value.map((ss) => ss.id)
//     );
//   }
// }

// function onAddSetlist(id: number) {
//   const song = songStore.getSongById(id);
//   if (song) {
//     localSetSongs.value.push(song);
//     updateSetOrder();
//   }
// }

function onSongClicked(songId: number) {
  localSong.value = songStore.getSongById(songId) ?? NewSong();
  songModalAction.value = "Edit";
  showSongModal.value = true;
}

function onHideSongModal() {
  localSong.value = NewSong();
}

onMounted(async () => {
  await memberStore.fetchMembers();
  await songStore.fetchSongs();
  await setStore.fetchSets();
  await setlistStore.fetchSetlists();
});
</script>

<style lang="sass" scoped>
@import "../scss/breakpoints"
.setlist-container
  flex-wrap: wrap
.set-container
  width: 100%

  @include md
    flex: 50%
  @include lg
    flex: 25%
.set-name
  font-weight: 600
  font-size: 18px
</style>
