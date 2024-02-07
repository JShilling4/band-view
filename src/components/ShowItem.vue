<template>
  <div class="show q-mb-md bg-teal-10 q-pa-md text-white">
    <div class="show-date q-mb-sm row items-center">
      <div class="date-text">{{ format(new Date(show.date), "eeee, MMM do") }}</div>
      <div class="venue-icon-row row q-ml-auto">
        <q-icon
          v-if="venue?.serves_food"
          name="fa-solid fa-utensils"
          class="icon q-ml-md text-grey-4"
          size="sm"
        />
        <q-icon
          v-if="venue?.address"
          name="fa-solid fa-globe"
          class="icon q-ml-md text-grey-4"
          size="sm"
        >
          <q-popup-proxy
            transition-show="flip-up"
            transition-hide="flip-down"
            @hide="showCopiedNotice = false"
          >
            <q-banner class="bg-teal-1 text-black q-pa-md">
              <div class="pop-address text-bold text-h6">
                {{ venue?.address }} {{ venue?.city }},
                {{ venue?.state }}
              </div>
              <div class="pop-controls row items-center">
                <q-btn
                  label="Copy"
                  color="grey"
                  class="q-mt-sm"
                  size="md"
                  @click="copyVenueAddress()"
                />
                <div v-if="showCopiedNotice" class="copied-notice q-ml-md text-h6 text-grey-8">
                  Copied
                </div>
              </div>
            </q-banner>
          </q-popup-proxy>
        </q-icon>
      </div>
    </div>
    <div class="show-venue q-mb-sm">
      {{ venue?.name }} -
      {{ venue?.city }}
    </div>
    <div class="show-time">{{ show.start_time }} - {{ show.end_time }}</div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@/composables";
import { useVenueStore } from "@/stores";
import { Tables } from "@/types";
import { format } from "date-fns";
import { watch } from "vue";
import { ref } from "vue";

const props = defineProps<{
  show: Tables<"show">;
}>();

const { getVenueById } = useVenueStore();
const { toClipboard } = useClipboard();

const venue = ref<Tables<"venue">>();
watch(
  () => props.show,
  () => {
    venue.value = getVenueById(props.show.venue);
  },
  { immediate: true }
);

const showCopiedNotice = ref(false);

async function copyVenueAddress() {
  if (!venue.value) return;
  try {
    await toClipboard(`${venue.value.address} ${venue.value.city}, ${venue.value.state}`);
    showCopiedNotice.value = true;
  } catch (e) {
    console.error(e);
  }
}
</script>

<style lang="sass" scoped>
.show
  font-size: 16px

.date-text
  font-weight: 600
  letter-spacing: 1px
</style>
