<template>
  <AppDrawer
    v-model="leftDrawerOpen"
    :mini="miniLeftDrawer"
    side="left"
    :width="$q.screen.width > 1024 ? 250 : 45"
    class="app-left-drawer bg-grey-10 text-grey-3"
    behavior="desktop"
    show-if-above
    persistent
  >
    <QScrollArea class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <QList>
        <QItem
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
          <QItemSection avatar>
            <QIcon :name="item.icon.classes.join(' ')" :color="item.icon.color" class="mini-icon" />
          </QItemSection>
          <QItemSection> {{ item.label }} </QItemSection>
        </QItem>
      </QList>
    </QScrollArea>
  </AppDrawer>
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
