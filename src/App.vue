<template>
  <q-layout view="hHh lpR fFf">
    <app-header />
    <app-drawer
      v-model="leftDrawerOpen"
      :mini="miniLeftDrawer"
      side="left"
      :width="$q.screen.width > 1024 ? 250 : 45"
      class="app-left-drawer bg-grey-10 text-grey-3"
      behavior="desktop"
      show-if-above
      persistent
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
        <q-list>
          <q-item
            v-for="(item, i) in navConfig"
            :key="i"
            :active="$route.name === item.routeName"
            clickable
            v-ripple
            :to="item.routePath"
            :href="item.link?.href"
            :target="item.link?.target"
          >
            <q-item-section avatar>
              <q-icon
                :name="item.icon.classes.join(' ')"
                :color="item.icon.color"
                class="mini-icon"
              />
            </q-item-section>
            <q-item-section> {{ item.label }} </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </app-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
javas
<script setup lang="ts">
import { provide, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import navConfig from "@/router/navigationConfig";
import { isAdminIK } from "@/types";

const $q = useQuasar();
const $route = useRoute();

const leftDrawerOpen = ref(true);
const miniLeftDrawer = ref(false);
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
