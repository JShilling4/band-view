<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>

    <div class="page-content">
      <div class="top-controls q-mb-md row items-center">
        <q-select
          v-model="activeTab"
          :options="setStore.sets.map((set) => set.name)"
          emit-value
          option-value="name"
          option-label="name"
          label="Select Set"
          filled
          behavior="menu"
          class="app-select-filter col"
        />
      </div>

      <set-list :set="selectedSet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore, useSetStore, useSongStore } from "@/stores";

// Types
const props = defineProps<{
  pageTitle: string;
  name: string | undefined;
}>();

// Dependency
const router = useRouter();
const memberStore = useMemberStore();
const songStore = useSongStore();
const setStore = useSetStore();

// State
const selectedSet = computed(() => {
  return setStore.sets.find((set) => set.name === activeTab.value);
});
const activeTab = ref("Set 1 (4h)");

// Watchers
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

// Methods
onMounted(async () => {
  await memberStore.fetchMembers();
  await songStore.fetchSongs();
  await setStore.fetchSets();
});
</script>

<style lang="sass" scoped>
.setlist-wrapper
  max-width: 500px
</style>
