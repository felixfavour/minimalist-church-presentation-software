<template>
  <Transition>
    <div
      class="navbar-ctn h-[50px] w-[100%] border-b border-gray-100 flex justify-between items-center px-4"
      v-if="route.name !== 'live'"
    >
      <div class="logo flex items-center gap-2">
        <Logo class="w-[32px]" />
        <h1 class="text-md font-semibold">Cloud of Worshippers</h1>
        <span
          class="version-chip flex text-xs font-semibold bg-gray-100 p-2 py-1 rounded-full"
        >
          v{{ appVersion }}
        </span>
      </div>
      <div class="actions text-sm flex gap-2 items-center">
        <UButton icon="i-bx-desktop" to="/live" target="_blank">
          Go Live
        </UButton>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const route = useRoute()
defineProps({
  appVersion: String,
})
</script>

<style scoped></style>
