<template>
  <QHeader elevated class="header bg-black text-white" height-hint="98">
    <QToolbar class="">
      <QToolbarTitle class="toolbar-title"> Steele Rail Band </QToolbarTitle>
      <QSpace />
      <ul>
        <li v-if="!userStore.user" class="toolbar-link" @click="onLoginClick">Login</li>
        <li v-if="userStore.user" class="toolbar-link" @click="$emit('toggle-user-menu')">
          <span class="member-name q-mr-md">{{ userStore.activeMember?.first_name }}</span>
          <QIcon :name="IconClasses.User.join(' ')" size="sm" />
        </li>
      </ul>
    </QToolbar>
  </QHeader>
  <LoginModal v-model:show-modal="showLoginModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores";
import { IconClasses } from "@/types";

defineEmits<{
  "toggle-user-menu": [];
}>();

const userStore = useUserStore();

const showLoginModal = ref(false);

function onLoginClick() {
  showLoginModal.value = true;
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
