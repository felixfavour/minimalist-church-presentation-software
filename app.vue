<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLoadingIndicator />

    <NuxtLayout v-if="!loadingResources">
      <NuxtPage />
      <UNotifications />
    </NuxtLayout>
    <div
      v-else
      class="loading-ctn h-[100vh] w-[100vw] fixed inset-0 grid place-items-center"
    >
      <div class="wrapper flex flex-col gap-2">
        <div class="logo flex items-center justify-center mb-6 gap-2">
          <IconWrapper name="i-bx-cloud" size="12" />
          <h1 class="text-2xl font-semibold">Cloud of Worshippers</h1>
        </div>
        <div class="progress-wrapper text-center">
          <UProgress
            size="2xl"
            class="text-center"
            :value="downloadProgress"
            :max="[
              'Setting up environment...',
              'Loading KJV Bible...',
              'Loading Hymns...',
              'Finishing up',
            ]"
          />
          <!-- <div class="text-sm mt-2 text-primary-800">
          Retrieving essential resources...
        </div> -->
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
const downloadProgress = ref<number>(5)

const downloadEssentialResources = async () => {
  loadingResources.value = true
  downloadProgress.value = 1

  // Download KJV Bible
  const kjvBible = await useS3File("kjv.json")
  useNuxtApp().provide("kjvBible", JSON.parse(kjvBible || ""))
  downloadProgress.value = 2

  // // Download all hymns
  const hymns = await useS3File("hymns.json")
  useNuxtApp().provide("hymns", JSON.parse(hymns || ""))
  downloadProgress.value = 90
  downloadProgress.value = 3

  setTimeout(() => {
    downloadProgress.value = 4
    loadingResources.value = false
  }, 500)
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
