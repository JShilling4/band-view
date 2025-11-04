<template>
  <QItem class="venue bg-red-1 text-black items-start shadow-2" clickable>
    <QItemSection class="item-content" @click="onItemClick">
      <QItemLabel class="venue-name">
        {{ venue.name }}
        <span v-if="venue.is_private" class="text-grey-6">
          {{ `(${contactStore.getContactById(venue.contact)?.name ?? "Uknown Value"})` }}
        </span>
      </QItemLabel>
      <div>
        <div class="venue-address">
          {{ formatAddress(null, venue.city, venue.state) }}
        </div>
        <div class="venue-showcount q-mt-md text-grey-8">
          Books this year: {{ showStore.getShowsThisYearByVenue(venue.id) }}
        </div>
        <div class="venue-showcount q-mt-xs text-grey-8">
          Books last year: {{ showStore.getShowsLastYearByVenue(venue.id) }}
        </div>
        <div class="venue-showcount q-mt-xs text-grey-8">
          Total books: {{ showStore.getTotalShowsByVenue(venue.id) }}
        </div>
      </div>
    </QItemSection>
    <QItemSection v-if="userStore.memberIsAdmin" side>
      <QIcon :name="IconClasses.Edit.join(' ')" class="edit-icon q-mb-sm" @click="onEditClick" />
      <QIcon :name="IconClasses.Delete.join(' ')" class="delete-icon" @click="onDeleteClick" />
    </QItemSection>
  </QItem>
</template>

<script setup lang="ts">
import { IconClasses, type Tables } from "@/core/models";

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

function formatAddress(address: string | null, city: string | null, state: string | null) {
  const addressStr = address ? `${address} - ` : "";
  const cityStr = city ?? "";
  const stateStr = state ? `, ${state}` : "";

  return address ? addressStr + cityStr + stateStr : cityStr + stateStr;
}

function onItemClick() {
  emit("venue-clicked");
}

function onEditClick() {
  emit("edit");
}

function onDeleteClick() {
  emit("delete");
}
</script>

<style lang="scss" scoped>
.venue {
  width: 300px;
  flex-grow: 1;
  border-radius: 5px;
  font-size: 18px;
  padding: 11px;
  border: 1px solid $red-2;
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
</style>
