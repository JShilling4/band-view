<template>
  <AppDrawer
    v-model="leftDrawerOpen"
    :mini="$q.screen.width < 1024 && miniLeftDrawer"
    side="left"
    :width="$q.screen.width > 1024 ? 250 : 45"
    class="app-left-drawer bg-black text-grey-3"
    behavior="desktop"
    show-if-above
    persistent
    :mini-width="45"
  >
    <template #mini>
      <QScrollArea class="fit" :horizontal-thumb-style="{ opacity: '0' }">
        <QList>
          <QItem
            v-for="(item, i) in authorizedRoutes"
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
              <QIcon
                :name="item.icon.classes.join(' ')"
                :color="item.icon.color"
                class="mini-icon"
              />
            </QItemSection>
            <!-- <QItemSection> {{ item.label }} </QItemSection> -->
          </QItem>
        </QList>
      </QScrollArea>
    </template>
    <QScrollArea class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <QList>
        <QItem
          v-for="(item, i) in authorizedRoutes"
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
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useUserStore } from "@/stores";
import navConfig from "./navigationConfig";

const $q = useQuasar();
const $route = useRoute();
const userStore = useUserStore();

const leftDrawerOpen = ref(false);
const miniLeftDrawer = ref(true);
const authorizedRoutes = computed(() => {
  return navConfig.filter(
    (nc) => !nc.requiresAuth || userStore.activeMember?.permission_level === "admin"
  );
});
</script>

<style lang="sass" scoped>
.active-route
  color: #72b9ff
</style>
