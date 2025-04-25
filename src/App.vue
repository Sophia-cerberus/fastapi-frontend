<template>
  <div id="app" :class="vueAppClasses">
    <router-view @setAppClasses="setAppClasses" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
// import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores'

const vueAppClasses = ref<string[]>([])
// const route = useRoute()
const appStore = useAppStore()

function toggleClassInBody(theme: string) {
  const body = document.body

  body.classList.remove('theme-dark', 'theme-semi-dark')

  if (theme === 'dark') {
    body.classList.add('theme-dark')
  } else if (theme === 'semi-dark') {
    body.classList.add('theme-semi-dark')
  }
}

function setAppClasses(classesStr: string) {
  vueAppClasses.value.push(classesStr)
}

function handleWindowResize() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  appStore.updateWindowWidth(window.innerWidth)
}

function handleScroll() {
  appStore.updateWindowScrollY(window.scrollY)
}

// Watch route depth to set transitionName (optional use in <Transition>)
// watch(route, (to, from) => {
//   const toDepth = to.path.split('/').length
//   const fromDepth = from.path.split('/').length
//   const transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
// })

watch(
  () => appStore.theme,
  (val) => toggleClassInBody(val),
  { immediate: true }
)

onMounted(() => {
  handleWindowResize()
  window.addEventListener('resize', handleWindowResize)
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* You can apply default styles if needed */
</style>
