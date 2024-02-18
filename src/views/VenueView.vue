<template>
  <div class="page-container">
    <div class="row items-center">
      <AppPageTitle>{{ pageTitle }} </AppPageTitle>
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
          @click="onAddVenueClick"
        />
        <!-- <QSelect
          v-model="cityFilter"
          :options="venueStore.getVenueCities"
          emit-value
          option-value="name"
          option-label="name"
          label="City"
          class="app-select-filter col"
          behavior="menu"
          filled
        /> -->
      </div>

      <div>
        <!-- <div class="results-text">
          {{ showStore.getSongsByStatus(statusFilter).length }} results
        </div> -->
        <QList class="venue-container q-mt-md flex q-gutter-sm">
          <VenueItem
            v-for="venue in venueStore.venues"
            :key="venue.id"
            class="venue"
            :venue="venue"
            @venue-clicked="onVenueClick(venue.id)"
            @edit-clicked="onEditVenueClick(venue.id)"
            @delete="onDeleteVenueClick(venue.id)"
          />
          <div class="venue"></div>
          <div class="venue"></div>
          <div class="venue"></div>
          <div class="venue"></div>
        </QList>
      </div>

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
import { computed, onMounted } from "vue";
import { useVenueUtility } from "@/composables";
import { useContactStore, useShowStore, useUserStore, useVenueStore } from "@/stores";

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
// const cityFilter = ref<string | null>(null);
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");

// Methods
onMounted(async () => {
  await contactStore.fetchContacts();
  await showStore.fetchShows();
  await venueStore.fetchVenues();
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
