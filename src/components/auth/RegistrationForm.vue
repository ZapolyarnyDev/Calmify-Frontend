<script setup lang="ts">
import { ref } from 'vue';
import { AuthService } from '@/service/authService';
import { Logger } from '@/utils/logger';
import Button from '../Button.vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPasswordMismatch = ref(false);

const onRegister = async () => {
  showPasswordMismatch.value = password.value !== confirmPassword.value;
  if (showPasswordMismatch.value) {
    Logger.error("Passwords do not match");
    return;
  }

  try {
    await AuthService.register(email.value, password.value);
    Logger.info("Register success");
  } catch (err) {
    Logger.error("Register error: ", err);
  }
};
</script>

<template>
  <div class="mt-4 w-full max-w-md p-8 rounded-lg bg-[var(--color-background-primary)] border border-[var(--color-border-primary)] mx-auto">
    <h2 class="text-2xl mb-6 font-semibold text-[var(--color-text-primary)] text-center">
      Create account
    </h2>

    <form @submit.prevent="onRegister" class="flex flex-col gap-4">
      <div>
        <label class="block text-sm mb-2 text-[var(--color-text-secondary)]">Email</label>
        <input
          requiredq
          
          v-model="email"
          type="email"
          class="w-full px-3 py-2 rounded-md border border-[var(--color-border-primary)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)]
                 placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-border-accent)]"
        />
      </div>

      <div>
        <label class="block text-sm mb-2 text-[var(--color-text-secondary)]">Password</label>
        <input
          required
          v-model="password"
          type="password"
          class="w-full px-3 py-2 rounded-md border border-[var(--color-border-primary)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)]
                 placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-border-accent)]"
        />
      </div>

      <div>
        <label class="block text-sm mb-2 text-[var(--color-text-secondary)]">Confirm Password</label>
        <input
          required
          v-model="confirmPassword"
          type="password"
          class="w-full px-3 py-2 rounded-md border border-[var(--color-border-primary)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)]
                 placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-border-accent)]"
        />
      </div>

      <p v-if="showPasswordMismatch" class="text-red-500 text-sm mt-1">Passwords do not match</p>

      <Button class="mt-3" size="lg">Create account</Button>
    </form>

    <p class="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
      Already have an account?
      <router-link
        :to="{ name: 'Login' }"
        class="text-[var(--color-border-accent)] hover:text-[#2563EB] font-medium ml-1"
      >
        Sign In
      </router-link>
    </p>
  </div>
</template>
