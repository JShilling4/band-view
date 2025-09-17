<template>
  <div class="page-container">
    <div class="row items-center">
      <AppPageTitle>{{ pageTitle }} </AppPageTitle>
    </div>

    <div class="page-content">
      <div v-if="isLoading" class="text-center q-pa-md">
        <QSpinner size="3em" color="primary" />
        <div class="text-subtitle1 q-mt-sm">Loading shows...</div>
      </div>

      <div v-else-if="error" class="text-center text-negative q-pa-md">
        <div class="text-h6">Error loading shows</div>
        <div class="text-subtitle1">{{ error }}</div>
        <QBtn color="primary" class="q-mt-sm" @click="loadData">Retry</QBtn>
      </div>

      <template v-else>
        <!-- <div class="top-controls q-mb-md row items-center">
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
          >
            <template #selected-item>
              <span>{{ activeShowFilter.label }}</span>
            </template>
          </AppSelect>
        </div>

        <div class="results-container">
          <div class="results-text">{{ activeShowFilter?.fn().length }} results</div>
          <QList class="show-container flex q-mt-xs q-gutter-md">
            <ShowDetails
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
        </div> -->
        <ShowCalendar />
      </template>
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
import { ShowFilter } from "@/modules/show/types";
import { clone } from "lodash";

// Types
const props = defineProps<{
  pageTitle: string;
  range?: string;
}>();

// Dependency
const showStore = useShowStore();
// const userStore = useUserStore();
const { fetchVenues } = useVenueStore();
const { fetchMembers } = useMemberStore();
const router = useRouter();
const { showVenueDetail, venueDetail, onHideVenueDetail } = useVenueUtility();
const {
  // onAddShowClick,
  showShowModal,
  localShow,
  showModalAction,
  onHideShowModal,
  // onDeleteShowClick,
  // onEditShowClick,
} = useShowUtility();

// State
const showFilters: ShowFilter[] = [
  {
    label: "Upcoming This Year",
    fn: () => showStore.getUpcomingShows,
  },
  {
    label: "All This Year",
    fn: () => showStore.getShowsThisYear,
  },
  {
    label: "Next Year",
    fn: () => showStore.getShowsNextYear,
  },
];
const activeShowFilter = ref<ShowFilter>({ ...showFilters[0] });
// const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");
const isLoading = ref(false);
const error = ref<string | null>(null);

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
const loadData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    await Promise.all([fetchMembers(), fetchVenues(), showStore.fetchShows()]);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "An unexpected error occurred";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
.show {
  width: 300px;
  flex-grow: 1;
}
</style>
