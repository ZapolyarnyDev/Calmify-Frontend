<script setup lang="ts">
import RegistrationForm from '@/components/auth/RegistrationForm.vue';
import Header from '@/components/Header.vue';
</script>


<template>
  <Header :checkAuth=false />
  <div class="flex items-center justify-center bg-background-primary p-3">
    <div class="w-full max-w-md">
      <RegistrationForm />
    </div>
  </div>
</template>
  