<template>
  <QItem class="venue bg-red-1 text-black items-start" clickable>
    <QItemSection class="item-content" @click="onItemClick">
      <QItemLabel class="venue-name">
        {{ venue.name }}
        <span v-if="venue.is_private" class="text-grey-6">
          {{ `(${contactStore.getContactById(venue.contact)?.name ?? "Uknown Value"})` }}
        </span>
      </QItemLabel>
      <div class="venue-address">
        {{ formatAddress(venue.address, venue.city, venue.state) }}
      </div>
      <div class="venue-showcount q-mt-auto text-grey-8">
        Shows this year: {{ showStore.getShowsThisYearByVenue(venue.id) }}
      </div>
    </QItemSection>
    <QItemSection v-if="isAdmin" side>
      <QIcon name="fa-solid fa-edit text-blue-4" class="edit-icon q-mb-sm" @click="onEditClick" />
      <QIcon name="fa-solid fa-trash-alt text-red-4" class="delete-icon" @click="onDeleteClick" />
    </QItemSection>
  </QItem>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useContactStore, useShowStore, useUserStore } from "@/stores";
import type { Tables } from "@/types";

defineProps<{
  venue: Tables<"venue">;
}>();

const emit = defineEmits<{
  "venue-clicked": [];
  edit: [];
  delete: [];
}>();

const userStore = useUserStore();
const showStore = useShowStore();
const contactStore = useContactStore();
const isAdmin = computed(() => userStore.activeMember?.permission_level === "admin");

function formatAddress(address: string | null, city: string | null, state: string | null) {
  const addressStr = address ? `${address} - ` : "";
  const cityStr = city ?? "";
  const stateStr = state ? `, ${state}` : "";

  return addressStr + cityStr + stateStr;
}

function onItemClick() {
  emit("venue-clicked");
}

function onEditClick() {
  isAdmin.value && emit("edit");
}

function onDeleteClick() {
  isAdmin.value && emit("delete");
}
</script>

<style lang="scss" scoped>
.venue {
  width: 300px;
  flex-grow: 1;
  border-radius: 5px;
  font-size: 18px;
  padding: 11px;
}

.item-content {
  height: 80px;
}

.venue-name {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 6px;
}

.venue-address,
.venue-phone,
.venue-showcount {
  font-size: 14px;
}

.q-icon.edit-icon {
  transition: color 0.3s;

  &:hover {
    color: $blue-10 !important;
  }
}
</style>
