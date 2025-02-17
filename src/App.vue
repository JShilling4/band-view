<template>
  <QLayout view="hHh Lpr lff">
    <AppHeader @toggle-user-menu="toggleUserMenu" />
    <SideNavigation />
    <UserMenu v-model:right-drawer-open="showRightDrawer" />
    <QPageContainer>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </QPageContainer>
  </QLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMemberStore, useUserStore } from "@/stores";

const { fetchMembers } = useMemberStore();
const { getSession } = useUserStore();

const showRightDrawer = ref(false);

function toggleUserMenu() {
  showRightDrawer.value = !showRightDrawer.value;
}

onMounted(async () => {
  try {
    await fetchMembers();
    await getSession();
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
});
</script>

<style lang="scss">
@import "./scss/global";
@import "./scss/quasar-overrides";
</style>
