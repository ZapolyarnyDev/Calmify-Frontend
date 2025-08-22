<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: "primary" },
  size: { type: String, default: "full" }
})

defineEmits(['click'])

const sizeClasses: Record<string, string> = {
  full: "w-full py-4 text-base",
  md: "px-4 py-1 text-base",
  lg: "px-6 py-2 text-lg",
  xl: "px-8 py-3 text-xl"
}

const variantClasses: Record<string, string> = {
  primary: "bg-[var(--color-border-accent)] text-white hover:bg-[var(--color-border-accent-dark)]",
  secondary: "border border-[var(--color-border-accent)] text-[var(--color-border-accent)] hover:bg-[var(--color-border-accent)] hover:text-white"
}
</script>

<template>
  <button
    :class="[
      'rounded-md font-medium cursor-pointer focus:outline-none transition-colors',
      sizeClasses[props.size],
      variantClasses[props.variant]
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
