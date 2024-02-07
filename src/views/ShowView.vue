<template>
  <div class="page-container">
    <div class="row items-center">
      <AppPageTitle>{{ pageTitle }} </AppPageTitle>
      <a href="http://www.steelerailband.com/shows" class="q-ml-auto" target="_blank">
        Website Calendar
      </a>
    </div>

    <div class="page-content">
      <div class="top-controls q-mb-md row items-center">
        <QSelect
          v-model="activeShowFilter"
          :options="showFilters"
          option-label="label"
          label="Date Range"
          filled
          behavior="menu"
          class="app-select-filter col"
        />
      </div>

      <div class="show-container q-mt-md">
        <ShowItem v-for="show in activeShowFilter?.fn()" :key="show.id" :show="show" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useShowStore, useVenueStore } from "@/stores";
import { clone } from "lodash";
import { ShowFilter, ShowFilterNames } from "@/types";

// Types
const props = defineProps<{
  pageTitle: string;
  range?: ShowFilterNames;
}>();

// Dependency
const showStore = useShowStore();
const { fetchVenues } = useVenueStore();
const router = useRouter();

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
const activeShowFilter = ref<ShowFilter | null>({ ...showFilters[3] });

// Watchers
watch(
  () => props.range,
  () => {
    const filterObj = showFilters.find((sf) => sf.label === props.range);
    if (!filterObj) return;
    activeShowFilter.value = clone(filterObj);
  },
  { immediate: true }
);

watch(
  activeShowFilter,
  (newVal) => {
    if (!newVal) return;
    router.push({ name: "Shows", query: { range: newVal.label } });
  },
  { immediate: true }
);

// Methods
onMounted(async () => {
  await fetchVenues();
  await showStore.fetchShows();
});
</script>

<style lang="sass" scoped>
.show
  max-width: 500px
  border-radius: 5px

  .show-date
    font-weight: 600
    letter-spacing: 1px

  .icon
    font-size: 18px
    cursor: pointer
</style>
