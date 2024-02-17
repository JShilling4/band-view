<template>
  <QDialog v-model="showModal" persistent>
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ action }} Venue</h6>
      </QCardSection>
      <QCardSection v-if="localVenue" class="modal-body">
        <div class="row">
          <QInput v-model="localVenue.name" label="Name" class="col q-mr-lg" />
          <QInput v-model="localVenue.address" label="Address" class="col" />
        </div>
        <div class="row">
          <QInput v-model="localVenue.city" label="City" class="col q-mr-lg" />
          <QInput v-model="localVenue.state" label="State" class="col" />
        </div>
        <div class="row q-mt-sm">
          <QInput v-model="localVenue.phone" label="Phone" class="col q-mr-lg" />
          <div class="col">
            <span class="radio-label">Serves food?</span>
            <QOptionGroup
              v-model="localVenue.serves_food"
              :options="[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]"
              color="primary"
              inline
            />
          </div>
        </div>
        <QInput v-model="localVenue.website_url" label="Website Url" class="col" />
      </QCardSection>
      <QCardActions align="right" class="modal-controls">
        <QBtn outline label="Cancel" color="black" no-caps v-close-popup />
        <QBtn label="Save" color="green-10" no-caps v-close-popup @click="onSaveVenue" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { useVenueStore } from "@/stores";
import type { LocalVenue, Tables } from "@/types";

const props = defineProps<{
  action: "Add" | "Edit";
  venue?: Tables<"venue">;
}>();

const venueStore = useVenueStore();

const showModal = defineModel<boolean>("showModal");
const localVenue = defineModel<LocalVenue | Tables<"venue">>("venue");

async function onSaveVenue() {
  if (!localVenue.value) return;
  if (props.action === "Add") {
    await venueStore.createVenue(localVenue.value);
  } else {
    await venueStore.updateVenue(localVenue.value as Tables<"venue">);
  }
}
</script>

<style lang="sass" scoped>
@import "../scss/breakpoints"
.modal-content
  width: 100%

  @include md
    width: 500px

.modal-body
  padding: 0 1.5rem 2rem

.radio-label
  color: rgba(0, 0, 0, 0.6)
</style>
