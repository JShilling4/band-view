<template>
  <div class="page-container">
    <div class="row items-center">
      <app-page-title>{{ pageTitle }} </app-page-title>
      <a href="http://www.steelerailband.com/shows" class="q-ml-auto" target="_blank">
        Website Calendar
      </a>
    </div>

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

      <div class="show-container q-mt-md">
        <div
          v-for="show in activeShowFilter?.fn()"
          :key="show.id"
          class="show q-mb-md bg-teal-10 q-pa-sm text-white"
        >
          <div class="show-date">
            {{ format(new Date(show.date), "eeee, MMM do") }}
          </div>
          <div class="show-venue">Venue</div>
          <div class="show-time">{{ show.start_time }} - {{ show.end_time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useShowStore } from "@/stores";
import { clone } from "lodash";
import { format } from "date-fns";
import { ShowFilter, ShowFilterNames } from "@/types";

// Types
const props = defineProps<{
  pageTitle: string;
  range?: ShowFilterNames;
}>();

// Dependency
const showStore = useShowStore();
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
</style>
