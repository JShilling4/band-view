<template>
  <div class="page-container">
    <div class="row items-center">
      <AppPageTitle>{{ pageTitle }} </AppPageTitle>
    </div>

    <div class="page-content">
      <template v-if="isLoading">
        <div class="flex flex-center q-pa-lg">
          <QSpinner size="3em" color="primary" />
        </div>
      </template>

      <template v-else>
        <div class="top-controls q-mb-md row items-center">
          <QBtn
            v-if="isAdmin"
            color="teal-10"
            icon="fa-solid fa-plus"
            class="q-mr-md"
            no-caps
            dense
            @click="onAddVenueClick"
          />
          <AppSelect
            v-model="cityFilter"
            :options="venueStore.getVenueCities"
            emit-value
            option-value="name"
            option-label="name"
            label="Select City"
          />
        </div>

        <div class="results-text">{{ filteredVenues.length }} results</div>
        <QList class="venue-container q-mt-xs flex q-gutter-md">
          <VenueItem
            v-for="venue in filteredVenues"
            :key="venue.id"
            class="venue"
            :venue="venue"
            @venue-clicked="onVenueClick(venue.id)"
            @edit="onEditVenueClick(venue.id)"
            @delete="onDeleteVenueClick(venue.id)"
          />
          <div class="venue"></div>
          <div class="venue"></div>
          <div class="venue"></div>
          <div class="venue"></div>
        </QList>
      </template>

      <VenueModal
        v-model:show-modal="showVenueModal"
        v-model:venue="localVenue"
        :action="venueModalAction"
        persistent
        @hide="onHideVenueModal"
      />

      <VenueInfoDisplay
        v-model:show-venue-detail="showVenueDetail"
        v-model:venue-detail="venueDetail"
        @hide="onHideVenueDetail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useVenueUtility } from "@/composables";
import { useContactStore, useShowStore, useUserStore, useVenueStore } from "@/stores";
import { Tables } from "@/types";

// Types
defineProps<{
  pageTitle: string;
}>();

// Dependency
const venueStore = useVenueStore();
const showStore = useShowStore();
const userStore = useUserStore();
const contactStore = useContactStore();
const {
  onHideVenueModal,
  venueModalAction,
  localVenue,
  venueDetail,
  showVenueModal,
  onAddVenueClick,
  onVenueClick,
  onDeleteVenueClick,
  onEditVenueClick,
  showVenueDetail,
  onHideVenueDetail,
} = useVenueUtility();

// State
const isLoading = ref(true);
const error = ref<string | null>(null);
const cityFilter = ref<string | null>(null);
const filteredVenues = ref<Tables<"venue">[]>([]);
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");

// Watchers
watch(
  () => cityFilter.value,
  () => {
    if (cityFilter.value) {
      filteredVenues.value = venueStore.getVenuesByCity(cityFilter.value);
    } else {
      filteredVenues.value = venueStore.venues;
    }
  }
);

// Methods
onMounted(async () => {
  try {
    error.value = null;
    isLoading.value = true;
    await Promise.all([
      contactStore.fetchContacts(),
      showStore.fetchShows(),
      venueStore.fetchVenues(),
    ]);
    filteredVenues.value = venueStore.venues;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "An unexpected error occurred";
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.venue-container {
  display: flex;
}
.venue {
  width: 300px;
  flex-grow: 1;
}
</style>
