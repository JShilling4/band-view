<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>

    <div class="page-content">
      <div class="tabs-container q-mb-md">
        <q-select
          v-model="activeTab"
          :options="setStore.sets.map((set) => set.name)"
          emit-value
          option-value="name"
          option-label="name"
          label="Select Set Name"
          filled
        />
      </div>

      <div class="song-container q-mb-lg">
        <q-list>
          <VueDraggable
            ref="el"
            v-model="localSetSongs"
            :on-update="onSongOrderChange"
          >
            <div v-for="(song, i) in localSetSongs" :key="song.title">
              <q-item dense>
                <q-item-section>
                  <q-item-label> {{ i + 1 }}. {{ song.title }}</q-item-label>
                  <q-item-label caption>
                    <div>
                      Vocal:
                      <span
                        :style="{
                          color:
                            memberStore.getMemberById(song.vocal_lead)
                              ?.profile_color ?? 'N/A',
                        }"
                      >
                        {{
                          memberStore.getMemberById(song.vocal_lead)?.first_name
                        }}
                      </span>
                      <span
                        v-for="special in song.specials"
                        class="specials-symbols"
                      >
                        Specials: {{ special }}
                      </span>
                    </div>
                  </q-item-label>
                </q-item-section>
                <q-item-section side top lines="1" class="row">
                  <div class="q-gutter-sm">
                    <q-icon name="fa-solid fa-trash-alt" color="red-10" />
                  </div>
                </q-item-section>
              </q-item>

              <q-separator spaced />
            </div>
          </VueDraggable>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore, useSetStore, useSongStore } from "@/stores";
import { VueDraggable } from "vue-draggable-plus";
import { Tables } from "@/types";

const props = defineProps<{
  pageTitle: string;
  name: string | undefined;
}>();

const router = useRouter();
const memberStore = useMemberStore();
const songStore = useSongStore();
const setStore = useSetStore();

const activeTab = ref("");

const selectedSet = computed(() => {
  return setStore.sets.find((set) => set.name === activeTab.value);
});

const localSetSongs = ref<Tables<"song">[]>([]);

watch(
  () => props.name,
  () => {
    if (!props.name) return;
    activeTab.value = props.name;
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
    if (!selectedSet.value?.songs?.length) return;
    const songs: Tables<"song">[] = [];
    selectedSet.value.songs?.forEach((id) => {
      let song = songStore.getSongById(id);
      if (song) songs.push(song);
    });
    localSetSongs.value = songs;
  },
  { immediate: true }
);

function onSongOrderChange(): void {
  console.log(
    "Posting new order: ",
    localSetSongs.value.map((ss) => ss.id)
  );
  if (selectedSet.value) {
    setStore.updateSetOrder(
      selectedSet.value.id,
      localSetSongs.value.map((ss) => ss.id)
    );
  }
}

onMounted(() => {
  if (!setStore.sets.length) {
    setStore.fetchSets();
  }
});
</script>

<style lang="scss" scoped>
.q-item {
  padding-left: 0 !important;
  padding-right: 0 !important;
  font-family: Roboto, sans-serif;
  font-weight: 400;
}
</style>
