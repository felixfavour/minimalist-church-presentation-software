<template>
  <Transition>
    <div
      class="navbar-ctn h-[50px] w-[100%] border-b border-gray-100 flex justify-between items-center px-4"
      v-if="route.name !== 'live'"
    >
      <div class="logo flex items-center gap-2">
        <Logo class="w-[32px]" />
        <h1 class="text-md font-semibold">Cloud of Worshippers</h1>
      </div>
      <div class="actions text-sm flex gap-2 items-center">
        Links + Auth info here

        <UButton icon="i-bx-desktop" to="/live" target="_blank">
          Go Live
        </UButton>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const route = useRoute()
</script>

<style scoped></style>
