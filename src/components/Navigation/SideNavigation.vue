<template>
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
          active-class="active-route"
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import navConfig from "./navigationConfig";

const $q = useQuasar();
const $route = useRoute();

const leftDrawerOpen = ref(false);
const miniLeftDrawer = ref(false);
</script>

<style lang="sass" scoped>
.active-route
  color: #72b9ff
</style>
