<template>
  <div class="page-container">
    <div class="row items-center">
      <AppPageTitle>{{ pageTitle }} </AppPageTitle>
    </div>

    <div class="page-content">
      <div class="top-controls q-mb-md row items-center">
        <QSelect
          v-model="cityFilter"
          :options="venueStore.getVenueCities"
          emit-value
          option-value="name"
          option-label="name"
          label="City"
          class="app-select-filter col"
          behavior="menu"
          filled
        />
        <QBtn
          v-if="isAdmin"
          color="teal-10"
          icon="fa-solid fa-plus"
          class="q-ml-md"
          no-caps
          dense
          @click="onAddVenueClick"
        />
      </div>

      <QList class="venue-container q-mt-md flex q-gutter-sm">
        <VenueItem
          v-for="venue in venueStore.venues"
          :key="venue.id"
          class="venue"
          :venue="venue"
          @venue-clicked="onVenueClick(venue.id)"
          @delete="onDeleteVenueClick(venue.id)"
        />
        <div class="venue"></div>
        <div class="venue"></div>
        <div class="venue"></div>
        <div class="venue"></div>
      </QList>

      <VenueModal
        v-model:show-modal="showVenueModal"
        v-model:venue="localVenue"
        :action="venueModalAction"
        persistent
        @hide="onHideVenueModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useVenueUtility } from "@/composables";
import { useUserStore, useVenueStore } from "@/stores";

// Types
defineProps<{
  pageTitle: string;
}>();

// Dependency
const venueStore = useVenueStore();
const userStore = useUserStore();
const {
  onHideVenueModal,
  venueModalAction,
  localVenue,
  showVenueModal,
  onAddVenueClick,
  onVenueClick,
  onDeleteVenueClick,
} = useVenueUtility();

// State
const cityFilter = ref<string | null>(null);
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");

// Methods
onMounted(async () => {
  await venueStore.fetchVenues();
});
</script>

<style lang="sass" scoped>
.venue-container
  display: flex
.venue
  width: 300px
  flex-grow: 1
  border-radius: 5px
  font-size: 18px
</style>
