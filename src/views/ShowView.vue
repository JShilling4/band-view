<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>
    <div class="page-content">
      <div class="show-container">
        <div v-for="show in showStore.shows" :key="show.id" class="show">
          {{ show.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useShowStore } from "@/stores";

defineProps<{
  pageTitle: string;
}>();

const showStore = useShowStore();

// Methods
onMounted(async () => {
  await showStore.fetchShows();
});
</script>

<style lang="sass" scoped></style>
