<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  type?: 'filled' | 'outline' | 'ghost'
  icon?: string
  iconPack?: 'feather' | 'lucide'
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])

const colorVar = computed(() => `var(--color-${props.color ?? 'primary'})`)

const buttonClass = computed(() => {
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition'
  switch (props.type) {
    case 'outline':
      return `${base} border border-current text-${props.color}`
    case 'ghost':
      return `${base} bg-transparent text-${props.color} hover:bg-opacity-10`
    default:
      return `${base} text-white bg-[${colorVar.value}] hover:brightness-90`
  }

})
</script>

<template>
  <button :class="buttonClass" @click.stop="emit('click')">
    <component
      v-if="icon"
      :is="iconPack === 'lucide' ? 'LucideIcon' : 'FeatherIcon'"
      :icon="icon"
      class="w-5 h-5"
    />
    <slot />
  </button>
</template>