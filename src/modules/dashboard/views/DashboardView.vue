<template>
  <div class="page-container">
    <AppPageTitle>{{ pageTitle }}</AppPageTitle>

    <div class="page-content q-mt-lg">
      <div v-if="isLoading" class="text-center q-pa-md">
        <QSpinner size="3em" color="primary" />
        <div class="q-mt-sm">Loading statistics...</div>
      </div>

      <div v-else>
        <div class="q-mb-lg text-bold">
          Band Stats Since:
          {{ formattedStartDate }}
        </div>
        <div class="card-container row q-col-gutter-md items-start">
          <!-- Shows Card -->
          <DashboardCard classes="bg-teal-1">
            <DashboardCardStat :value="totalShows" label="Total Gigs" />
            <DashboardCardStat :value="showStore.getShowsLastYear.length" label="Gigs Last Year" />
          </DashboardCard>

          <!-- Venues Card -->
          <DashboardCard classes="bg-red-1">
            <DashboardCardStat :value="venuesPlayed" label="Venues Played" />
            <DashboardCardStat :value="citiesPlayed" label="Cities Played" />
          </DashboardCard>

          <!-- Songs Card -->
          <DashboardCard classes="bg-blue-1">
            <DashboardCardStat
              :value="songStore.getSongsByStatus(['burner', 'active', 'killed']).length"
              label="Songs Gigged"
            />
            <DashboardCardStat
              :value="songStore.getSongsByStatus(['burner', 'active']).length"
              label="Active Songs"
            />
          </DashboardCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "date-fns";

defineProps<{
  pageTitle: string;
}>();

// Store dependencies
const showStore = useShowStore();
const venueStore = useVenueStore();
const songStore = useSongStore();

// State
const isLoading = ref(false);

// Computed statistics
const totalShows = computed(() => showStore.shows.length);

const venuesPlayed = computed(() => {
  const uniqueVenues = new Set(showStore.shows.map((show) => show.venue));
  return uniqueVenues.size;
});

const citiesPlayed = computed(() => {
  const venues = showStore.shows.map((show) => venueStore.getVenueById(show.venue));
  const uniqueCities = new Set(venues.map((venue) => venue?.city).filter(Boolean));
  return uniqueCities.size;
});

const formattedStartDate = computed(() => {
  return showStore.getFirstShowDate
    ? formatDate(showStore.getFirstShowDate, "MMM d, yyyy")
    : "Not Found";
});

// Methods
const loadData = async () => {
  isLoading.value = true;
  try {
    await Promise.all([showStore.fetchShows(), venueStore.fetchVenues(), songStore.fetchSongs()]);
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped></style>
