<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>
    <div class="page-content">
      <div class="top-controls q-mb-md row items-center">
        <q-select
          v-model="activeShowFilter"
          :options="showFilters"
          option-label="label"
          label="Date Range"
          filled
          behavior="menu"
          class="app-select-filter col"
        />
      </div>

      <div class="show-container">
        <div v-for="show in activeShowFilter?.fn()" :key="show.id" class="show">
          {{ show.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useShowStore } from "@/stores";
import { ShowFilter } from "@/types";

// Types
defineProps<{
  pageTitle: string;
}>();

// Dependency
const showStore = useShowStore();

// State
const showFilters: ShowFilter[] = [
  {
    label: "This Month",
    fn: () => showStore.getShowsThisMonth,
  },
  {
    label: "This Year",
    fn: () => showStore.getShowsThisYear,
  },
  {
    label: "Next Month",
    fn: () => showStore.getShowsNextMonth,
  },
  {
    label: "Upcoming",
    fn: () => showStore.getUpcomingShows,
  },
];
const activeShowFilter = ref<ShowFilter | null>(null);

// Methods
onMounted(async () => {
  await showStore.fetchShows();
});
</script>

<style lang="sass" scoped></style>
