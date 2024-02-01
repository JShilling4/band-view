<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>
    <div class="page-content">
      <div v-for="rehearsal in rehearsalStore.rehearsals" :key="rehearsal.id">
        {{ rehearsal.date }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRehearsalStore } from "@/stores";
import { onMounted } from "vue";

defineProps<{
  pageTitle: string;
}>();

const rehearsalStore = useRehearsalStore();

onMounted(() => {
  rehearsalStore.fetchRehearsals();
});
</script>

<style lang="sass" scoped></style>
