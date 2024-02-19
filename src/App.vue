<template>
  <QLayout view="hHh Lpr lff">
    <AppHeader @toggle-user-menu="showRightDrawer = !showRightDrawer" />
    <SideNavigation />
    <UserMenu v-model:right-drawer-open="showRightDrawer" />
    <QPageContainer>
      <RouterView />
    </QPageContainer>
  </QLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMemberStore, useUserStore } from "@/stores";

const { fetchMembers } = useMemberStore();
const { getSession } = useUserStore();

const showRightDrawer = ref(false);

onMounted(async () => {
  await fetchMembers();
  await getSession();
});
</script>

<style lang="scss">
@import "./scss/breakpoints";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-size: 16px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  &.heading {
    line-height: 1.5;
  }
}
.h2 {
  font-size: 26px;
  font-weight: 500;
  line-height: 1.5;
}
ul {
  list-style: none;
}

.page-container {
  padding: 10px 15px;
}

.page-content {
  margin-top: 6px;
}

// Quasar overrides
.q-drawer {
  position: fixed !important;
}
.app-left-drawer {
  .q-item {
    padding: 8px 10px;
    &--active {
      background-color: #3d3d3d;
    }
  }
}
.q-btn {
  letter-spacing: 1px;
}

.q-item__label,
.q-field__native {
  text-transform: capitalize;
}

.results-text {
  font-size: 18px;
  font-weight: 600;
  color: gray;
}

.q-dialog__inner--minimized {
  padding: 14px !important;
}

.q-icon.edit-icon {
  transition: color 0.3s;

  &:hover {
    color: $blue-10 !important;
  }
}

.q-icon.delete-icon {
  transition: color 0.3s;

  &:hover {
    color: $red-10 !important;
  }
}
</style>
