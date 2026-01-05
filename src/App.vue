<template>
  <QLayout view="hHh Lpr lff">
    <AppHeader @toggle-user-menu="toggleUserMenu" />
    <SideNavigation />
    <UserMenu v-model:right-drawer-open="showRightDrawer" />
    <QPageContainer>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </QPageContainer>
  </QLayout>
</template>

<script setup lang="ts">
import { getSelectedMemberId } from "@/core/utils/voteTracking";
const { fetchMembers } = useMemberStore();
const { getSession } = useUserStore();
const { fetchUserVotes } = useSongStore();

const showRightDrawer = ref(false);

function toggleUserMenu() {
  showRightDrawer.value = !showRightDrawer.value;
}

onMounted(async () => {
  try {
    await fetchMembers();
    await getSession();

    // Fetch user votes if a member is already selected
    if (getSelectedMemberId()) {
      await fetchUserVotes();
    }
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
});
</script>

<style lang="scss">
@import "@/scss/global";
@import "@/scss/quasar-overrides";
</style>
