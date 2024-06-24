<template>
  <QDialog v-model="showModal" persistent>
    <QCard class="modal-content">
      <QForm ref="loginForm" @submit.prevent="onFormSubmit">
        <QCardSection class="modal-heading row items-center bg-black text-white">
          <h6>Login</h6>
        </QCardSection>
        <QCardSection class="modal-body">
          <QInput
            v-model="email"
            label="Email"
            type="email"
            lazy-rules
            autocomplete="off"
            :rules="[(val: string) => (val && val.length > 0) || 'Email is required']"
          />
          <QInput
            v-model="password"
            label="Password"
            type="password"
            lazy-rules
            autocomplete="off"
            :rules="[(val: string) => (val && val.length > 0) || 'Password is required']"
          />
        </QCardSection>
        <QCardActions align="right" class="modal-controls">
          <QBtn v-close-popup label="Cancel" color="black" outline no-caps />
          <QBtn label="Submit" color="green-10" no-caps type="submit" />
        </QCardActions>
      </QForm>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type QForm } from "quasar";
import { useUserStore } from "@/stores";

const userStore = useUserStore();

const showModal = defineModel<boolean>("showModal", { default: true });
const email = ref<string | null>(null);
const password = ref<string | null>(null);

async function onFormSubmit() {
  if (!email.value || !password.value) return;
  const success = await userStore.logIn({ email: email.value, password: password.value });

  if (success) {
    showModal.value = false;
  }

  email.value = null;
  password.value = null;
}
</script>

<style lang="sass" scoped>
@import "../scss/breakpoints"
.modal-content
  width: 100%

  @include md
    width: 500px

.modal-body
  padding: 0 1.5rem 2rem
</style>
