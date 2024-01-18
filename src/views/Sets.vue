<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>

    <div class="page-content">
      <div class="tabs-container q-mb-md">
        <q-tabs
          v-model="activeTab"
          inline-label
          :breakpoint="0"
          narrow-indicator
          dense
          indicator-color="transparent"
          active-bg-color="blue-10"
          active-color="grey-11"
          align="left"
        >
          <q-tab
            v-for="(set, index) in setStore.sets"
            :key="index"
            :name="set.name"
            :label="set.name"
            no-caps
            class="tab text-blue-10"
          />
        </q-tabs>
      </div>

      <div class="song-container q-mb-lg">
        <q-list>
          <div v-for="(song, index) in setSongs" :key="song.title">
            <q-item dense>
              <q-item-section>
                <q-item-label> {{ index + 1 }}. {{ song.title }}</q-item-label>
              </q-item-section>
              <q-item-section lines="1" side>
                <q-item-label>
                  V:
                  <span
                    :style="{
                      color:
                        memberStore.getMemberById(song.vocal_lead)
                          ?.profile_color ?? 'N/A',
                    }"
                  >
                    {{ memberStore.getMemberById(song.vocal_lead)?.first_name }}
                  </span>
                </q-item-label>
              </q-item-section>
              <q-item-section side lines="1">
                <span v-for="special in song.specials">{{ special }}</span>
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
import { useMemberStore } from "@/stores/member.store";
import { useSetStore } from "@/stores/set.store";
import { useSongStore } from "@/stores/song.store";
import { Tables } from "@/types";
import { openBrowserTab } from "@/utils/helpers";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  pageTitle: string;
  name: string;
}>();

const router = useRouter();
const memberStore = useMemberStore();
const songStore = useSongStore();
const setStore = useSetStore();

const activeTab = ref("");

const selectedSet = computed(() => {
  return setStore.sets.find((set) => set.name === activeTab.value);
});

const setSongs = computed(() => {
  if (!selectedSet.value?.songs?.length) return [];
  const songs: Tables<"song">[] = [];
  selectedSet.value.songs?.forEach((id) => {
    let song = songStore.getSongById(id);
    if (song) songs.push(song);
  });
  return songs;
});

watch(
  () => props.name,
  () => {
    if (!props.name) return;
    activeTab.value = props.name;
  },
  { immediate: true }
);

watch(activeTab, (newVal) => {
  router.push({ name: "Sets", query: { name: newVal } });
});

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
