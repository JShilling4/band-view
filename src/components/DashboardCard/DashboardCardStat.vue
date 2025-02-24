<template>
  <div class="line q-my-md">
    <span class="value-container">
      <span class="value text-grey-10">{{ value }}</span>
    </span>
    {{ label }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number;
  label: string;
}>();
</script>

<style scoped lang="scss">
@use "../../scss/breakpoints" as *;

.line {
  display: flex;
  align-items: center;
  font-size: 1rem;
  letter-spacing: 0.05em;
  font-weight: 400;

  @include from-desktop {
    font-size: 1.2rem;
  }

  .value-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    margin-right: 20px;
    background-color: #eeeeee;
    border-radius: 10px;
    padding: 0.5rem;
    border: 1px solid #4d4d4d;

    @include from-desktop {
      width: 6rem;
    }
  }

  .value {
    font-size: 1.75rem;
    line-height: 1.2;
    font-weight: bold;
    text-align: center;

    @include from-desktop {
      font-size: 2.5rem;
    }
  }
}
</style>
