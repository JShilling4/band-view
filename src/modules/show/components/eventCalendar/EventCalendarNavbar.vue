<template>
  <div class="q-py-md q-gutter-lg row">
    <QBtn label="Today" no-caps @click="onTodayClick" />
    <QBtn label="< Prev" no-caps @click="onPrevClick" />
    <QBtn label="Next >" no-caps @click="onNextClick" />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  prev: [];
  next: [];
  today: [];
}>();

function onTodayClick() {
  emits("today");
}
function onPrevClick() {
  emits("prev");
}
function onNextClick() {
  emits("next");
}
</script>

<style lang="scss" scoped></style>
