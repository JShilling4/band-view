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
        <div class="card-container">
          <!-- Shows Card -->
          <DashboardCard classes="bg-teal-1">
            <h5 class="card-title">Shows</h5>
            <div v-for="year in showYears" :key="year" class="stat">
              <span class="stat-label"> {{ year }} </span>:
              <span class="stat-value">{{ showStore.getShowsByYear(year).length }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Total</span>:
              <span class="stat-value">{{ totalShows }}</span>
            </div>
          </DashboardCard>

          <!-- Venues Card -->
          <DashboardCard classes="bg-red-1">
            <h5 class="card-title">Venues</h5>
            <div class="stat">
              <span class="stat-label">Venues</span>:
              <span class="stat-value">{{ venuesPlayed }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Cities</span>:
              <span class="stat-value">{{ citiesPlayed }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Most booked</span>:
              <span class="stat-value">{{ mostPlayedVenues }}</span>
            </div>
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
  return uniqueVenues.size + 1;
});

const showYears = computed(() => {
  const uniqueYears = new Set(showStore.shows.map((show) => new Date(show.date).getFullYear()));
  const yearsArr = [];
  for (const entry of uniqueYears.entries()) {
    yearsArr.push(entry[0]);
  }
  return yearsArr;
});

const citiesPlayed = computed(() => {
  const venues = showStore.shows.map((show) => venueStore.getVenueById(show.venue));
  const uniqueCities = new Set(venues.map((venue) => venue?.city).filter(Boolean));
  return uniqueCities.size + 1;
});

const mostPlayedVenues = computed(() => {
  if (!venueStore.venues.length || !showStore.shows.length) return "N/A";

  const venueCounts = venueStore.venues
    .map((venue) => {
      const count = showStore.getTotalShowsByVenue(venue.id);
      return { id: venue.id, name: venue.name, city: venue.city, count };
    })
    .filter((v) => v.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  if (!venueCounts.length) return "N/A";

  return venueCounts.map((v) => `${v.name} - ${v.city} (${v.count})`).join(" | ");
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

<style lang="scss" scoped>
@use "@/scss/breakpoints" as *;

.card-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  min-height: 15rem;

  @include from-tablet {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card-title {
  border-bottom: 1px solid #575757;
  margin-bottom: 0.5rem;
}

.stat {
  padding: 0.5rem 0;
  font-size: 1.1rem;

  .stat-label {
    font-weight: 600;
  }
}
</style>
