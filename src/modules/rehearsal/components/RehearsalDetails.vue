<template>
  <div class="rehearsal-item">
    <RehearsalDetailsSection title="New Songs" :songs="rehearsal.new_songs" />

    <RehearsalDetailsSection title="Review Songs" :songs="rehearsal.review_songs" hide-admin />

    <div class="agenda-container">
      <QSeparator color="grey-4" spaced />
      <div class="section-header text-grey-6">Notes:</div>
      <QSeparator color="grey-4" spaced />
      <p class="rehearsal-notes">{{ rehearsal.notes || "No notes added." }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Tables } from "@/core/models";

defineProps<{
  rehearsal: Tables<"rehearsal">;
}>();
</script>

<style lang="scss" scoped>
.rehearsal-notes {
  margin: 1rem 0;
  white-space: pre-wrap;
}
</style>
