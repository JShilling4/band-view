<template>
  <QItem class="venue bg-red-2 q-pa-md text-black items-start">
    <QItemSection>
      <div class="venue-name">{{ venue.name }}</div>
      <div class="venue-city">{{ venue.address }}</div>
      <div>{{ venue.city ?? "" }}{{ venue.state ? `, ${venue.state}` : "" }}</div>
    </QItemSection>
  </QItem>
</template>

<script setup lang="ts">
import { Tables } from "@/types";

defineProps<{
  venue: Tables<"venue">;
}>();
</script>

<style lang="sass" scoped>
// .venue
//   height: 130px
.venue-name
  font-weight: 500

.venue-city
  font-size: 15px
</style>
