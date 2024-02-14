<template>
  <div class="page-container">
    <div class="row items-center">
      <AppPageTitle>{{ pageTitle }} </AppPageTitle>
    </div>

    <div class="page-content">
      <!-- <div class="top-controls q-mb-md row items-center">
        <QSelect
          v-model="activeShowFilter"
          :options="showFilters"
          option-label="label"
          label="Date Range"
          filled
          behavior="menu"
          class="app-select-filter col"
        />
      </div> -->

      <div class="show-container q-mt-md">
        <div v-for="venue in venueStore.venues" :key="venue.id" class="venue q-mb-md">
          <div class="venue-name">{{ venue.name }}</div>
          <div class="venue-city">{{ venue.city ?? "Unknown address" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useVenueStore } from "@/stores";

// Types
defineProps<{
  pageTitle: string;
}>();

// Dependency
const venueStore = useVenueStore();

// Methods
onMounted(async () => {
  await venueStore.fetchVenues();
});
</script>

<style lang="sass" scoped>
.venue
  max-width: 500px
  border-radius: 5px
  font-size: 18px

.venue-name
  font-weight: 500

.venue-city
  font-size: 15px
</style>
