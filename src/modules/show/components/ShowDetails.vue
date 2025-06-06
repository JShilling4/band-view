<template>
  <QItem class="show bg-teal-1 text-black shadow-2">
    <QItemSection>
      <div class="show-header q-mb-sm row items-center">
        <div class="date-text">{{ format(new Date(show.date), "eeee, MMM do") }}</div>
        <div class="venue-icon-row row q-ml-auto">
          <QIcon
            v-if="venue?.address"
            name="fa-solid fa-signs-post"
            class="icon q-ml-md text-brown-5 cursor-pointer"
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
        <QIcon
          name="fa-regular fa-circle-question"
          class="icon q-ml-sm text-grey-8"
          size="sm"
          @click="$emit('venue-info-clicked')"
        />
      </div>
      <div class="show-venue q-mb-sm row items-center">
        {{ venue?.city }}{{ `${venue?.state ? ", " + venue.state : ""}` }}
      </div>
      <div class="show-time">{{ show.start_time }} - {{ show.end_time }}</div>
    </QItemSection>
    <QItemSection v-if="isAdmin" side>
      <QIcon :name="IconClasses.Edit.join(' ')" class="edit-icon q-mb-sm" @click="onEditClick" />
      <QIcon :name="IconClasses.Delete.join(' ')" class="delete-icon" @click="onDeleteClick" />
    </QItemSection>
  </QItem>
</template>

<script setup lang="ts">
import { copyToClipboard } from "quasar";
import { IconClasses, Tables } from "@/core/models";
import { format } from "date-fns";

const props = defineProps<{
  show: Tables<"show">;
}>();

const emit = defineEmits<{
  "venue-info-clicked": [];
  edit: [];
  delete: [];
}>();

const { getVenueById } = useVenueStore();
const userStore = useUserStore();
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");

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

function onEditClick() {
  if (isAdmin.value) emit("edit");
}

function onDeleteClick() {
  if (isAdmin.value) emit("delete");
}
</script>

<style lang="scss" scoped>
.show {
  width: 300px;
  flex-grow: 1;
  border-radius: 5px;
  font-size: 16px;
  padding: 11px;
  border: 1px solid $teal-2;

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
