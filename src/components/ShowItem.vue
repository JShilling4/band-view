<template>
  <QItem class="show q-mb-md bg-teal-1 q-pa-md text-black">
    <QItemSection>
      <div class="show-header q-mb-sm row items-center">
        <div class="date-text">{{ format(new Date(show.date), "eeee, MMM do") }}</div>
        <div class="venue-icon-row row q-ml-auto">
          <QIcon
            v-if="venue?.address"
            name="fa-solid fa-signs-post"
            class="icon q-ml-md text-blue-5 cursor-pointer"
            size="sm"
          >
            <QPopupProxy
              transition-show="flip-up"
              transition-hide="flip-down"
              @hide="showCopiedNotice = false"
            >
              <QBanner class="bg-teal-1 text-black q-pa-md">
                <div class="pop-address text-bold text-h6">
                  {{ venue?.address }} {{ venue?.city }},
                  {{ venue?.state }}
                </div>
                <div class="pop-controls row items-center">
                  <QBtn
                    label="Copy"
                    color="grey"
                    class="q-mt-sm"
                    size="md"
                    @click="copyVenueAddress"
                  />
                  <div v-if="showCopiedNotice" class="copied-notice q-ml-md text-h6 text-grey-8">
                    Copied
                  </div>
                </div>
              </QBanner>
            </QPopupProxy>
          </QIcon>
        </div>
      </div>
      <div class="show-venue q-mb-sm row items-center">
        {{ venue?.name }}
        <QIcon name="fa-regular fa-circle-question" class="icon q-ml-sm text-grey-8" size="sm" />
      </div>
      <div class="show-venue q-mb-sm row items-center">
        {{ venue?.city }}{{ `${venue?.state ? ", " + venue.state : ""}` }}
      </div>
      <div class="show-time">{{ show.start_time }} - {{ show.end_time }}</div>
    </QItemSection>
  </QItem>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { copyToClipboard } from "quasar";
import { format } from "date-fns";
import { useVenueStore } from "@/stores";
import { Tables } from "@/types";

const props = defineProps<{
  show: Tables<"show">;
}>();

const { getVenueById } = useVenueStore();

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
    await copyToClipboard(`${venue.value.address} ${venue.value.city}, ${venue.value.state}`);
    showCopiedNotice.value = true;
  } catch (e) {
    console.error(e);
  }
}
</script>

<style lang="scss" scoped>
.show {
  width: 300px;
  flex-grow: 1;
  border-radius: 5px;
  font-size: 16px;

  .show-venue {
    font-size: 15px;
  }
}

.show-header {
  font-weight: 600;
  letter-spacing: 1px;
}

.icon {
  font-size: 18px;
  cursor: pointer;
}
</style>
