<template>
  <AppDrawer
    v-model="leftDrawerOpen"
    :mini="isMiniDrawer"
    side="left"
    :width="drawerWidth"
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
            v-ripple
            :active="$route.name === item.routeName"
            active-class="active-route"
            clickable
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
          </QItem>
        </QList>
      </QScrollArea>
    </template>
    <QScrollArea class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <QList>
        <QItem
          v-for="(item, i) in authorizedRoutes"
          :key="i"
          v-ripple
          :active="$route.name === item.routeName"
          active-class="active-route"
          clickable
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
import { useQuasar } from "quasar";
import navConfig from "./navigationConfig";

const $q = useQuasar();
const $route = useRoute();
const userStore = useUserStore();

const leftDrawerOpen = ref(false);
const miniLeftDrawer = ref(true);
const isMiniDrawer = computed(() => $q.screen.width < 1024 && miniLeftDrawer.value);
const drawerWidth = computed(() => ($q.screen.width > 1024 ? 250 : 45));
const authorizedRoutes = computed(() => {
  return navConfig.filter((nc) => {
    if (!nc.requiresAuth) return true;
    return nc.requiredRoles.includes(userStore.memberRole ?? "");
  });
});
</script>

<style lang="scss" scoped>
.active-route {
  color: #72b9ff;
}
</style>
