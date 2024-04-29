<template>
  <Transition>
    <div
      class="navbar-ctn h-[50px] w-[100%] border-b border-gray-100 dark:border-primary-950 flex justify-between items-center px-4 dark:border-primary-900"
      v-if="route.name !== 'live'"
    >
      <div class="logo flex items-center gap-2">
        <Logo class="w-[32px]" />
        <h1 class="text-md font-semibold">Cloud of Worshippers</h1>
        <span
          class="version-chip flex text-xs font-semibold bg-gray-100 dark:bg-primary-900 p-2 py-1 rounded-full dark:bg-primary-900"
        >
          v{{ appVersion }}
        </span>
      </div>
      <div class="actions text-sm flex gap-2 items-center">
        <ClientOnly>
          <UButton
            :icon="isDark ? 'i-tabler-moon-filled' : 'i-tabler-sun-filled'"
            color="primary"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
            >{{ isDark ? "Light" : "Dark" }}</UButton
          >
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
        <UButton
          icon="i-bx-slideshow"
          to="/live"
          onclick="window.open('/live', 
                         'live-view', 
                         'width=1200,height=800'); 
              return false;"
        >
          Go Live
        </UButton>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const route = useRoute()
const darkMode = ref(false)
const colorMode = useColorMode()
defineProps({
  appVersion: String,
})
const isDark = computed({
  get() {
    return colorMode.value === "dark"
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
  },
})
</script>

<style scoped></style>
