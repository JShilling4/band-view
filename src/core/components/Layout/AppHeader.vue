<template>
  <QHeader elevated class="header bg-black text-white" height-hint="98">
    <QToolbar>
      <QToolbarTitle class="toolbar-title" role="heading" aria-level="1">
        Steele Rail Band
      </QToolbarTitle>
      <QSpace />
      <nav aria-label="User navigation">
        <ul>
          <li v-if="!userStore.user" class="toolbar-link" @click="onLoginClick">
            <button type="button" class="reset-button">Login</button>
          </li>
          <li v-if="userStore.user" class="toolbar-link" @click="$emit('toggle-user-menu')">
            <button type="button" class="reset-button">
              <span class="member-name q-mr-md">{{ userStore.activeMember?.first_name }}</span>
              <QIcon :name="IconClasses.User.join(' ')" size="sm" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>
    </QToolbar>
  </QHeader>
  <LoginModal v-model:show-modal="showLoginModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IconClasses } from "@/core/models";
import { useUserStore } from "@/stores";

defineEmits<{
  "toggle-user-menu": [];
}>();

const userStore = useUserStore();

const showLoginModal = ref(false);

function onLoginClick() {
  showLoginModal.value = true;
}
</script>

<style lang="scss" scoped>
.left-menu-toggle {
  visibility: hidden;
}

.toolbar-title {
  font-size: 18px;
  font-weight: 600;
}

.toolbar-link {
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}

.reset-button {
  background: none;
  border: none;
  color: inherit;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
}
</style>
