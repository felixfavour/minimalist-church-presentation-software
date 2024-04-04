<template>
  <NuxtLayout v-if="!loadingResources">
    <NuxtPwaManifest />
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
  <div
    v-else
    class="loading-ctn h-[100vh] w-[100vw] fixed inset-0 bg-primary-200 grid place-items-center"
  >
    <div class="wrapper flex flex-col gap-2">
      <div class="logo flex items-center justify-center mb-6 gap-2">
        <IconWrapper name="i-bx-cloud" size="12" />
        <h1 class="text-2xl font-semibold">Cloud of Worshippers</h1>
      </div>
      <div class="progress-wrapper text-center">
        <UProgress size="2xl" />
        <div class="text-sm mt-2 text-primary-800">
          Retrieving essential resources...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import mitt from "mitt"
import { useAppStore } from "./store/app"

const emitter = mitt()
const appStore = useAppStore()
appStore.setEmitter(emitter)

const loadingResources = ref<boolean>(true)

const downloadEssentialResources = async () => {
  loadingResources.value = true

  // Download KJV Bible
  const kjvBible = await useS3File("kjv.json")
  useNuxtApp().provide("kjvBible", kjvBible)

  // Download all hymns
  const hymns = await useS3File("hymns.json")
  useNuxtApp().provide("hymns", hymns)

  loadingResources.value = false
}

downloadEssentialResources()
</script>

<style>
.text-2xs {
  font-size: 0.7rem;
  line-height: 0.9rem;
}

button:focus-visible {
  /* background: #faf5ff;
  border-radius: 0.375rem; */
  outline: none;
}
</style>
