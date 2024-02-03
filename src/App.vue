<template>
  <q-layout view="hHh lpR fFf">
    <app-header />
    <side-navigation />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { provide } from "vue";
import { isAdminIK } from "@/types";

const isAdmin = import.meta.env.DEV;
provide(isAdminIK, isAdmin);
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

.app-select-filter
  max-width: 300px !important

// Quasar overrides
.q-drawer
  position: fixed !important
.app-left-drawer
  .q-item
    padding: 8px 10px
    &--active
      background-color: #3d3d3d
.q-btn
  letter-spacing: 1px

.q-item__label, .q-field__native
  text-transform: capitalize
</style>
