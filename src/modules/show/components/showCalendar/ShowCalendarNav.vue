<template>
  <div class="q-py-md q-gutter-lg row">
    <QBtn label="Today" color="grey-10" no-caps @click="onTodayClick" />
    <div class="row items-center">
      <QIcon
        name="fa-solid fa-caret-left"
        size="sm"
        color="grey-7"
        class="icon"
        @click="onPrevMonthClick"
      />
      <span class="nav-label">Month</span>
      <QIcon
        name="fa-solid fa-caret-right"
        size="sm"
        color="grey-7"
        class="icon"
        @click="onNextMonthClick"
      />
    </div>
    <div class="row items-center">
      <QIcon
        name="fa-solid fa-caret-left"
        size="sm"
        color="grey-7"
        class="icon"
        @click="onPrevYearClick"
      />
      <span class="nav-label">Year</span>
      <QIcon
        name="fa-solid fa-caret-right"
        size="sm"
        color="grey-7"
        class="icon"
        @click="onNextYearClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  "prev-month": [];
  "next-month": [];
  "prev-year": [];
  "next-year": [];
  today: [];
}>();

function onTodayClick() {
  emits("today");
}
function onPrevMonthClick() {
  emits("prev-month");
}
function onNextMonthClick() {
  emits("next-month");
}
function onPrevYearClick() {
  emits("prev-year");
}
function onNextYearClick() {
  emits("next-year");
}
</script>

<style lang="scss" scoped>
.nav-label {
  font-weight: 500;
  letter-spacing: 1px;
  color: #333;
  font-size: 16px;
  margin: 0 0.75rem;
}
</style>
