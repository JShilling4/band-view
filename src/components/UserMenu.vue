<template>
  <AppDrawer
    v-model="rightDrawerOpen"
    side="right"
    :width="240"
    elevated
    overlay
    class="app-left-drawer bg-grey-1 text-black"
  >
    <QScrollArea class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <QList>
        <QItem @click="onLogoutClick" clickable>
          <QItemSection avatar>
            <QIcon name="fa-solid fa-arrow-right-from-bracket" color="red-8" />
          </QItemSection>
          <QItemSection> Logout</QItemSection>
        </QItem>
      </QList>
    </QScrollArea>
  </AppDrawer>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores";

const userStore = useUserStore();

const rightDrawerOpen = defineModel<boolean>("rightDrawerOpen", { default: false });

async function onLogoutClick() {
  await userStore.logOut();
  rightDrawerOpen.value = false;
}
</script>

<style lang="sass" scoped></style>
