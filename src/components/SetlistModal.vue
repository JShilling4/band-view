<template>
  <QDialog v-model="showModal" persistent>
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ action }} Setlist</h6>
      </QCardSection>
      <QCardSection v-if="localSetlist" class="modal-body">
        <div class="row">
          <QInput v-model="localSetlist.name" label="Setlist Name" class="col q-mr-lg" />
        </div>
        <div class="row">
          <QInput v-model="localSetlist.url" label="Download Url" class="col" />
        </div>
        <div v-if="action === 'Add'" class="row">
          <QInput v-model="setsToCreate" label="How many sets?" class="col" />
        </div>
      </QCardSection>
      <QCardActions align="right" class="modal-controls">
        <QBtn v-close-popup outline label="Cancel" color="black" no-caps />
        <QBtn v-close-popup label="Save" color="green-10" no-caps @click="onSaveSetlist" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { useSetlistStore } from "@/stores";
import type { LocalSetlist, Tables } from "@/types";

const props = defineProps<{
  action: "Add" | "Edit";
  show?: Tables<"show">;
}>();

const setlistStore = useSetlistStore();

const showModal = defineModel<boolean>("showModal", { default: false });
const localSetlist = defineModel<LocalSetlist | Tables<"setlist">>("setlist");
const setsToCreate = defineModel<string>("setsToCreate", { default: "" });

async function onSaveSetlist() {
  if (!localSetlist.value?.name) return;
  if (props.action === "Add") {
    await setlistStore.createSetlist(
      localSetlist.value as Omit<Tables<"setlist">, "id">,
      setsToCreate.value
    );
  }
  if (props.action === "Edit") {
    await setlistStore.updateSetlist(localSetlist.value as Tables<"setlist">);
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/breakpoints";

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
