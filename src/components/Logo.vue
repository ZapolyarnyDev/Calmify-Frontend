<script setup lang="ts">
import { router } from '@/router/router';
import { defineProps } from 'vue';

const props = defineProps<{ size?: string }>();
const sizeClass = props.size || 'text-2xl';

function goHome() {
  router.push({ path: '/' });
}
</script>

<template>
  <div
    :class="`${size} cursor-pointer select-none text-[#111827] font-semibold font-tektur`"
    @click="goHome"
  >
    Calmify
  </div>
</template>
