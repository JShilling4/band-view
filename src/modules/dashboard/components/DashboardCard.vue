<template>
  <div class="col-12 col-lg-4">
    <QCard :class="['stats-card', classes]">
      <QCardSection>
        <slot />
      </QCardSection>
    </QCard>
  </div>
</template>

<script setup lang="ts">
const { classes = "" } = defineProps<{
  classes?: string;
}>();
</script>

<style scoped lang="scss">
@use "@/scss/breakpoints" as *;

.stats-card {
  transition: transform 0.2s;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 0 0 0 1rem;
  height: 100%;

  @include from-desktop {
    padding: 0 2rem;
  }

  &:hover {
    transform: translateY(-2px);
  }
}
</style>
