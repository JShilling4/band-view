<template>
  <QLayout view="hHh lpR fFf">
    <AppHeader />
    <SideNavigation />
    <QPageContainer>
      <RouterView />
    </QPageContainer>
  </QLayout>
</template>

<script setup lang="ts">
import { useMemberStore } from "./stores";
import { onMounted } from "vue";

const { fetchMembers } = useMemberStore();

onMounted(async () => {
  await fetchMembers();
});
</script>

<style lang="sass">
@import "./scss/breakpoints"

*
  margin: 0
  padding: 0
  box-sizing: border-box

body
  font-size: 16px

h1,
h2,
h3,
h4,
h5,
h6
  &.heading
    line-height: 1.5

.h2
  font-size: 26px
  font-weight: 500
  line-height: 1.5

ul
  list-style: none

.page-container
  padding: 10px 15px

.page-content
  margin-top: 6px

.app-select-filter
  // max-width: 300px !important

// Quasar overrides
.q-drawer
  position: fixed !important
.app-left-drawer
  .QItem
    padding: 8px 10px
    &--active
      background-color: #3d3d3d
.QBtn
  letter-spacing: 1px

.q-item__label, .q-field__native
  text-transform: capitalize
</style>
