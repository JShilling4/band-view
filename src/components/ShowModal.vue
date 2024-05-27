<template>
  <QDialog v-model="showModal" persistent>
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ action }} Show</h6>
      </QCardSection>
      <QCardSection v-if="localShow" class="modal-body">
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
        <QBtn v-close-popup outline label="Cancel" color="black" no-caps />
        <QBtn v-close-popup label="Save" color="green-10" no-caps @click="onSaveShow" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { useShowStore, useVenueStore } from "@/stores";
import type { LocalShow, Tables } from "@/types";

const props = defineProps<{
  action: "Add" | "Edit";
  show: LocalShow | Tables<"show">;
}>();

const showStore = useShowStore();
const venueStore = useVenueStore();

const showModal = defineModel<boolean>("showModal");
const localShow = defineModel<LocalShow | Tables<"show">>("show");

async function onSaveShow() {
  if (!localShow.value?.venue) return;
  if (props.action === "Add") {
    const regex = /(T.*?Z)/gi;
    await showStore.createShow({
      ...(localShow.value as Omit<Tables<"show">, "id">),
      date: new Date(localShow.value.date).toISOString().replace(regex, " 00:00:00"),
    });
  }
  if (props.action === "Edit") {
    await showStore.updateShow(localShow.value as Tables<"show">);
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/breakpoints";

.modal-content {
  width: 100%;

  @include md {
    width: 500px;
  }
}
.modal-body {
  padding: 0 1.5rem 2rem;
}

.radio-label {
  color: rgba(0, 0, 0, 0.6);
}

.modal-controls {
  margin-bottom: 1rem;
}
</style>
