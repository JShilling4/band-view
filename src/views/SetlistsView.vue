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
          behavior="menu"
          class="app-select-filter col"
        />
      </div>

      <div v-if="selectedSetlist" class="setlist-container row q-col-gutter-xl">
        <set-list
          v-for="setId in selectedSetlist.sets"
          :key="setId"
          :set="setStore.getSetById(setId)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore, useSetStore, useSongStore, useSetlistStore } from "@/stores";

const props = defineProps<{
  pageTitle: string;
  name: string | undefined;
}>();

// Dependency
const router = useRouter();
const memberStore = useMemberStore();
const songStore = useSongStore();
const setStore = useSetStore();
const setlistStore = useSetlistStore();

// State
const activeTab = ref("4h Standard");
const selectedSetlist = computed(() => {
  return setlistStore.setlists.find((setlist) => setlist.name === activeTab.value);
});

// Watch
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
    router.push({ name: "Setlists", query: { name: newVal } });
  },
  { immediate: true }
);

// Methods
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
