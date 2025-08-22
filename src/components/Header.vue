<script setup lang="ts">
import { router } from '@/router/router';
import { AuthService } from '@/service/authService';
import { UserService } from '@/service/userService';
import { ref, onMounted, defineProps } from 'vue';
import Logo from './Logo.vue';
import Button from './Button.vue';

const props = defineProps({
  checkAuth: { type: Boolean, default: true }
});

const userName = ref<string | null>(null);

onMounted(async () => {
  if (!props.checkAuth) return;

  const token = AuthService.getAccessToken();
  if (token) {
    try {
      const res = await UserService.getSelfInfo();
      userName.value = res.data.displayName;
    } catch {
      userName.value = null;
    }
  }
});

function goLogin() {
  router.push({ name: 'Login' });
}

function goUser() {
  router.push({ name: 'User' });
}
</script>

<template>
  <header class="flex justify-between items-center px-4 sm:px-6 md:px-14 py-4 bg-[var(--color-background-primary)] border-b border-[var(--color-border-primary)]">
    <Logo size="text-3xl"/> 
    <div v-if="props.checkAuth"> 
      <Button v-if="!userName" size="lg" @click="goLogin">Login</Button> 
      <span v-else class="text-[var(--color-text-primary)] cursor-pointer" @click="goUser">
        {{ userName }} 
      </span>
    </div>
  </header>
</template>
  
