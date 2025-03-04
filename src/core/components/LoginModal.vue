<template>
  <QDialog v-model="showModal" persistent @hide="resetForm">
    <QCard class="modal-content">
      <QForm ref="loginForm" @submit.prevent="onFormSubmit">
        <QCardSection class="modal-heading row items-center bg-black text-white">
          <h6>Login</h6>
        </QCardSection>

        <QCardSection class="modal-body">
          <!-- Show error message if login fails -->
          <div v-if="errorMessage" class="text-negative q-mb-md">{{ errorMessage }}</div>

          <QInput
            v-model="email"
            label="Email"
            type="email"
            lazy-rules
            autocomplete="email"
            :rules="emailRules"
            :disable="isLoading"
            aria-label="Email address"
          />
          <QInput
            v-model="password"
            label="Password"
            type="password"
            lazy-rules
            autocomplete="current-password"
            :rules="passwordRules"
            :disable="isLoading"
            aria-label="Password"
          />
        </QCardSection>

        <QCardActions align="right" class="modal-controls">
          <QBtn v-close-popup label="Cancel" color="black" outline no-caps :disable="isLoading" />
          <QBtn label="Submit" color="green-10" no-caps type="submit" :loading="isLoading" />
        </QCardActions>
      </QForm>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
const userStore = useUserStore();

const showModal = defineModel<boolean>("showModal", { default: true });
const email = ref<string | null>(null);
const password = ref<string | null>(null);
const errorMessage = ref<string | null>(null);
const isLoading = ref(false);

const emailRules = [
  (val: string) => (val && val.length > 0) || "Email is required",
  (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || "Please enter a valid email",
];

const passwordRules = [(val: string) => (val && val.length > 0) || "Password is required"];

function resetForm() {
  email.value = null;
  password.value = null;
  errorMessage.value = null;
  isLoading.value = false;
}

async function onFormSubmit() {
  if (!email.value || !password.value) return;

  try {
    isLoading.value = true;
    errorMessage.value = null;

    const success = await userStore.logIn({
      email: email.value,
      password: password.value,
    });

    if (success) {
      showModal.value = false;
      resetForm();
    } else {
      errorMessage.value = "Invalid email or password";
    }
  } catch (error) {
    console.log(error);
    errorMessage.value = "An error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
@use "@/scss/breakpoints" as *;

.modal-content {
  width: 100%;

  @include from-tablet {
    width: 500px;
  }
}

.modal-body {
  padding: 0 1.5rem 2rem;
}
</style>
