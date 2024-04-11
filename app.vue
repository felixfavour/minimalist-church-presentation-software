<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLoadingIndicator />

    <NuxtLayout v-if="!loadingResources" :app-version="appVersion">
      <NuxtPage />
      <UNotifications />
    </NuxtLayout>
    <div
      v-else
      class="loading-ctn h-[100vh] w-[100vw] fixed inset-0 grid place-items-center"
    >
      <div class="wrapper flex flex-col gap-2">
        <div class="logo flex items-center justify-center mb-6 gap-2">
          <Logo class="w-[48px]" />
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
              'Loading NKJV Bible...',
              'Loading NIV Bible...',
              'Loading AMP Bible...',
              'Loading Hymns...',
              'Finishing up',
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import mitt from "mitt"
import { useAppStore } from "./store/app"

const nuxtApp = useNuxtApp()
const emitter = mitt()
const appStore = useAppStore()
nuxtApp.provide("emitter", emitter)
appStore.setEmitter(emitter)

const appVersion = ref<string>("0.1.1")
const loadingResources = ref<boolean>(true)
const downloadProgress = ref<number>(5)

const downloadEssentialResources = async () => {
  loadingResources.value = true
  downloadProgress.value = 1

  // Download KJV Bible
  const kjvBible = await useS3File("kjv.json")
  useNuxtApp().provide("kjvBible", JSON.parse(kjvBible || ""))
  downloadProgress.value = 2

  // Download NKJV Bible
  const nkjvBible = await useS3File("nkjv.json")
  useNuxtApp().provide("nkjvBible", JSON.parse(nkjvBible || ""))
  downloadProgress.value = 3

  // Download NIV Bible
  const nivBible = await useS3File("niv.json")
  useNuxtApp().provide("nivBible", JSON.parse(nivBible || ""))
  downloadProgress.value = 4

  // Download AMP Bible
  const ampBible = await useS3File("amp.json")
  useNuxtApp().provide("ampBible", JSON.parse(ampBible || ""))
  downloadProgress.value = 5

  // Download all hymns
  const hymns = await useS3File("hymns.json")
  useNuxtApp().provide("hymns", JSON.parse(hymns || ""))
  downloadProgress.value = 6

  setTimeout(() => {
    downloadProgress.value = 7
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
