<template>
  <QDialog v-model="showModal" persistent>
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ action }} Rehearsal</h6>
      </QCardSection>
      <QCardSection v-if="localRehearsal" class="modal-body">
        <div class="row">
          <QInput v-model="localRehearsal.date" label="Date" class="col q-mr-lg">
            <template #append>
              <QIcon name="fa-solid fa-calendar" class="cursor-pointer">
                <QPopupProxy cover transition-show="scale" transition-hide="scale">
                  <QDate v-model="localRehearsal.date" mask="YYYY-MM-DD HH:mm:ss">
                    <div class="row items-center justify-end">
                      <QBtn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </QDate>
                </QPopupProxy>
              </QIcon>
            </template>
          </QInput>
          <QInput v-model="localRehearsal.start_time" label="Start Time" class="col" />
        </div>
        <div class="row q-mt-md">
          <AppSelect
            v-model="localRehearsal.new_songs"
            :options="
              songStore.getSongsByStatus(['learning']).map((s) => {
                return { label: s.title, value: s.id };
              })
            "
            multiple
            stack-label
            emit-value
            label="New Songs"
            class="col q-mr-lg"
          >
            <template #selected-item="scope">
              <QChip
                removable
                dense
                :tabindex="scope.tabindex"
                color="black"
                text-color="white"
                class="q-pa-sm"
                @remove="scope.removeAtIndex(scope.index)"
              >
                <div class="ellipsis">
                  {{ songStore.getSongById(scope.opt)?.title }}&nbsp;&nbsp;
                  <QTooltip class="bg-black">
                    {{ songStore.getSongById(scope.opt)?.title }}
                  </QTooltip>
                </div>
              </QChip>
            </template>
          </AppSelect>
          <AppSelect
            v-model="localRehearsal.review_songs"
            :options="reviewSongOptions"
            multiple
            stack-label
            emit-value
            label="Review Songs"
            class="col q-mr-lg"
          >
            <template #selected-item="scope">
              <QChip
                removable
                dense
                :tabindex="scope.tabindex"
                color="black"
                text-color="white"
                class="q-pa-sm"
                style="max-width: 120px"
                @remove="scope.removeAtIndex(scope.index)"
              >
                <div class="ellipsis">
                  {{ songStore.getSongById(scope.opt)?.title }}&nbsp;&nbsp;
                  <QTooltip class="bg-black">
                    {{ songStore.getSongById(scope.opt)?.title }}
                  </QTooltip>
                </div>
              </QChip>
            </template>
          </AppSelect>
        </div>
        <div class="row q-mt-sm">
          <QInput
            v-model="localRehearsal.notes"
            type="textarea"
            label="Notes"
            autogrow
            class="col"
          />
        </div>
      </QCardSection>
      <QCardActions align="right" class="modal-controls">
        <QBtn v-close-popup outline label="Cancel" color="black" no-caps />
        <QBtn v-close-popup label="Save" color="green-10" no-caps @click="onSaveRehearsal" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { type Tables } from "@/core/models";
import { type LocalRehearsal } from "@/modules/rehearsal/models";

const props = defineProps<{
  action: "Add" | "Edit";
  rehearsal: LocalRehearsal | Tables<"rehearsal">;
}>();

const rehearsalStore = useRehearsalStore();
const songStore = useSongStore();

const showModal = defineModel<boolean>("showModal");
const localRehearsal = defineModel<LocalRehearsal | Tables<"rehearsal">>("rehearsal");
const reviewSongOptions = computed(() => {
  return songStore.songs
    .filter((s) => s.status !== "learning" && !localRehearsal.value?.review_songs?.includes(s.id))
    .map((s) => {
      return { label: s.title, value: s.id };
    });
});

async function onSaveRehearsal() {
  if (!localRehearsal.value) return;
  if (props.action === "Add") {
    await rehearsalStore.createRehearsal(localRehearsal.value);
  }
  if (props.action === "Edit") {
    await rehearsalStore.updateRehearsal(localRehearsal.value as Tables<"rehearsal">);
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/breakpoints" as *;

.modal-content {
  width: 100%;

  @include from-tablet {
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
