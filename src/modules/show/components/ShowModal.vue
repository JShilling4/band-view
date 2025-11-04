<template>
  <QDialog v-model="showModal" persistent class="modal">
    <QCard v-if="localShow" class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ venue?.name }}</h6>
      </QCardSection>
      <QCardSection v-if="action === 'Edit'">
        <div class="venue-details">
          <div class="date">
            {{ format(new Date(show.date), "eeee, MMMM do") }}
          </div>
          <div class="address">
            {{ venue?.address }} {{ venue?.city }}, {{ venue?.state }}
            <QIcon
              v-if="venue?.address"
              name="fa-solid fa-copy"
              class="icon q-ml-sm cursor-pointer text-grey-7"
              size="xs"
              @click="copyVenueAddress"
            />
            <span v-if="showCopiedNotice" class="copied-notice q-ml-sm text-grey-8"> Copied </span>
          </div>
          <div class="time">{{ localShow.start_time }} - {{ localShow.end_time }}</div>
        </div>
      </QCardSection>
      <QCardSection v-if="userStore.memberIsAdmin" class="modal-body">
        <div class="row">
          <QInput v-model="localShow.date" label="Date" class="col q-mr-lg">
            <template #append>
              <QIcon name="fa-solid fa-calendar" class="cursor-pointer">
                <QPopupProxy cover transition-show="scale" transition-hide="scale">
                  <QDate v-model="localShow.date" mask="YYYY-MM-DD HH:mm:ss">
                    <div class="row items-center justify-end">
                      <QBtn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </QDate>
                </QPopupProxy>
              </QIcon>
            </template>
          </QInput>
          <AppSelect
            v-model="localShow.venue"
            :options="
              venueStore.venues.map((v) => {
                return { label: `${v.name} (${v.city})`, value: v.id };
              })
            "
            emit-value
            label="Venue"
          />
        </div>
        <div class="row">
          <QInput v-model="localShow.start_time" label="Start Time" class="col q-mr-lg" />
          <QInput v-model="localShow.end_time" label="End Time" class="col" />
        </div>
        <div class="row q-mt-sm">
          <QInput v-model="localShow.event" label="Event Label" class="col q-mr-lg" />
          <QInput v-model="localShow.fb_url" label="Facebook Url" class="col" />
        </div>
      </QCardSection>
      <QCardActions align="right" class="modal-controls">
        <QBtn v-close-popup outline label="Close" color="black" no-caps />
        <div v-if="userStore.memberIsAdmin" class="admin-controls">
          <QBtn
            v-close-popup
            label="Save"
            color="green-10"
            no-caps
            class="control"
            @click="onSaveShow"
          />
          <QBtn
            v-close-popup
            label="Delete"
            color="red-10"
            no-caps
            class="control"
            @click="onDeleteShowClick((localShow as Show).id)"
          />
        </div>
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { copyToClipboard } from "quasar";
import { format } from "date-fns/format";
import { useShowUtility } from "../composables";
import { Show, type LocalShow } from "@/modules/show/types";

// props
const props = defineProps<{
  action: "Add" | "Edit";
  show: LocalShow | Show;
}>();

const showStore = useShowStore();
const venueStore = useVenueStore();
const userStore = useUserStore();
const { onDeleteShowClick } = useShowUtility();

const showModal = defineModel<boolean>("showModal");
watch(
  () => showModal.value,
  () => {
    if (!showModal.value) {
      showCopiedNotice.value = false;
    }
  }
);

const localShow = defineModel<LocalShow | Show>("show");

const venue = computed(() => {
  return venueStore.getVenueById(localShow.value?.venue ?? -1);
});

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

async function onSaveShow() {
  if (!localShow.value?.venue) return;
  if (props.action === "Add") {
    const regex = /(T.*?Z)/gi;
    await showStore.createShow({
      ...(localShow.value as Omit<Show, "id">),
      date: new Date(localShow.value.date).toISOString().replace(regex, " 00:00:00"),
    });
  }
  if (props.action === "Edit") {
    await showStore.updateShow(localShow.value as Show);
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/breakpoints" as *;

.modal {
  &-content {
    width: 100%;

    @include from-tablet {
      width: 500px;
    }
  }
  &-body {
    padding: 0 1.5rem 2rem;
  }
}

.venue-details {
  display: flex;
  font-size: 17px;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    font-weight: 600;
    font-size: 18px;
  }
}

.radio-label {
  color: rgba(0, 0, 0, 0.6);
}

.admin-controls {
  margin: 0.5rem;

  .control {
    margin-right: 0.5rem;
  }
}
</style>
