<template>
  <QItem class="venue bg-red-2 q-pa-md text-black items-start" :clickable="isAdmin">
    <QItemSection @click="isAdmin && $emit('venue-clicked')">
      <div class="venue-name">{{ venue.name }}</div>
      <div class="venue-city">{{ venue.address }}</div>
      <div>{{ venue.city ?? "" }}{{ venue.state ? `, ${venue.state}` : "" }}</div>
    </QItemSection>
  </QItem>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores";
import type { Tables } from "@/types";
import { computed } from "vue";

defineProps<{
  venue: Tables<"venue">;
}>();

defineEmits<{
  "venue-clicked": [];
  delete: [id: number];
}>();

const userStore = useUserStore();
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");
</script>

<style lang="sass" scoped>
// .venue
//   height: 130px
.venue-name
  font-weight: 500

.venue-city
  font-size: 15px
</style>
