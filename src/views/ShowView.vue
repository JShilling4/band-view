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
        <QBtn
          v-if="isAdmin"
          color="teal-10"
          icon="fa-solid fa-plus"
          class="q-mr-md"
          no-caps
          dense
          @click="onAddShowClick"
        />
        <AppSelect
          v-model="activeShowFilter"
          :options="showFilters"
          option-label="label"
          label="Date Range"
        />
      </div>

      <div>
        <div class="results-text">{{ activeShowFilter?.fn().length }} results</div>
        <QList class="show-container flex q-mt-xs q-gutter-md">
          <ShowItem
            v-for="show in activeShowFilter?.fn()"
            :key="show.id"
            :show="show"
            @venue-info-clicked="onVenueInfoClick(show.venue)"
            @edit="onEditShowClick(show.id)"
            @delete="onDeleteShowClick(show.id)"
          />
          <div class="show"></div>
          <div class="show"></div>
          <div class="show"></div>
          <div class="show"></div>
        </QList>
      </div>
    </div>

    <VenueInfoDisplay
      v-model:show-venue-detail="showVenueDetail"
      v-model:venue-detail="venueDetail"
      @hide="onHideVenueDetail"
    />

    <ShowModal
      v-model:show-modal="showShowModal"
      v-model:show="localShow"
      :action="showModalAction"
      persistent
      @hide="onHideShowModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { clone } from "lodash";
import { useShowUtility, useVenueUtility } from "@/composables";
import { useMemberStore, useShowStore, useUserStore, useVenueStore } from "@/stores";
import { ShowFilter, ShowFilterNames } from "@/types";

// Types
const props = defineProps<{
  pageTitle: string;
  range?: ShowFilterNames;
}>();

// Dependency
const showStore = useShowStore();
const userStore = useUserStore();
const { fetchVenues } = useVenueStore();
const { fetchMembers } = useMemberStore();
const router = useRouter();
const { onVenueInfoClick, showVenueDetail, venueDetail, onHideVenueDetail } = useVenueUtility();
const {
  onAddShowClick,
  showShowModal,
  localShow,
  showModalAction,
  onHideShowModal,
  onDeleteShowClick,
  onEditShowClick,
} = useShowUtility();

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
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");

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
  await fetchMembers();
  await fetchVenues();
  await showStore.fetchShows();
});
</script>

<style lang="sass" scoped>
.show
  width: 300px
  flex-grow: 1
</style>
