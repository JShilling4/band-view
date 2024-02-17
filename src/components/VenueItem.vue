<template>
  <QItem class="venue bg-red-2 q-pa-md text-black items-start" :clickable="isAdmin">
    <QItemSection @click="isAdmin && $emit('venue-clicked')">
      <div class="venue-name">{{ venue.name }}</div>
      <div class="venue-address">
        {{ formatAddress(venue.address, venue.city, venue.state) }}
      </div>
      <!-- <div class="venue-phone">{{ venue.phone }}</div> -->
    </QItemSection>
  </QItem>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores";
import type { Tables } from "@/types";

defineProps<{
  venue: Tables<"venue">;
}>();

defineEmits<{
  "venue-clicked": [];
  delete: [id: number];
}>();

const userStore = useUserStore();
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");

function formatAddress(address: string | null, city: string | null, state: string | null) {
  const addressStr = address ? `${address} - ` : "";
  const cityStr = city ?? "";
  const stateStr = state ? `, ${state}` : "";

  return addressStr + cityStr + stateStr;
}
</script>

<style lang="sass" scoped>
.venue
  width: 300px
  flex-grow: 1
  border-radius: 5px
  font-size: 18px

.venue-name
  font-weight: 500

.venue-address, .venue-phone
  font-size: 15px
</style>
