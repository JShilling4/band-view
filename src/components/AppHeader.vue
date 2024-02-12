<template>
  <QHeader elevated class="header bg-black text-white" height-hint="98">
    <QToolbar class="">
      <QToolbarTitle class="toolbar-title"> Steele Rail Band </QToolbarTitle>
      <QSpace />
      <ul>
        <li v-if="!userStore.user" class="toolbar-link" @click="onLoginClick">Login</li>
        <li v-if="userStore.user" class="toolbar-link" @click="onLogoutClick">Logout</li>
      </ul>
    </QToolbar>
  </QHeader>
  <LoginModal v-model:show-modal="showLoginModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores";

const userStore = useUserStore();

const showLoginModal = ref(false);

function onLoginClick() {
  showLoginModal.value = true;
}

function onLogoutClick() {
  userStore.logOut();
}
</script>

<style lang="sass" scoped>
.left-menu-toggle
  visibility: hidden

.toolbar-title
  font-size: 18px
  font-weight: 600

.toolbar-link
  cursor: pointer
</style>
