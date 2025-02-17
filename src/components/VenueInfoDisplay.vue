<template>
  <QDialog v-model="showDetail">
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ venueDetail?.name }}</h6>
      </QCardSection>
      <QCardSection v-if="venueDetail" class="modal-body">
        <div class="info-line">
          <span class="info-label">Address</span>:
          <span class="info-value">{{ venueDetail.address }}</span>
        </div>
        <div class="info-line">
          <span class="info-label">City/State</span>:
          <span class="info-value">{{ venueDetail.city }}, {{ venueDetail.state }}</span>
        </div>
        <div class="info-line">
          <span class="info-label">Phone</span>:
          <span class="info-value">{{ venueDetail.phone }}</span>
        </div>
        <div class="info-line">
          <span class="info-label">Website</span>:
          <span class="info-value">
            <a v-if="venueDetail.website_url" :href="venueDetail.website_url" target="_blank">
              {{ venueDetail.website_url }}
            </a>
          </span>
        </div>
        <div class="info-line">
          <span class="info-label">Serves food?</span>
          <span class="info-value">{{ venueDetail.serves_food ? " Yes" : " No" }}</span>
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import type { Tables } from "@/types";

defineProps<{
  venue?: Tables<"venue">;
  venueDetail?: Tables<"venue"> | null;
}>();

const showDetail = defineModel<boolean>("showVenueDetail");
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
  padding: 1rem 1.5rem 1rem;
}

.info-line {
  padding: 0.5rem 0;

  .info-label {
    font-weight: 600;
  }
}
</style>
