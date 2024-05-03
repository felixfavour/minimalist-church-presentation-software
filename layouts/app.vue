<template>
  <div v-if="!loadingResources" class="app-ctn max-h-[100vh] overflow-hidden">
    <Navbar :app-version="appVersion" />
    <slot />
  </div>
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
</template>

<script setup lang="ts">
import kjvBible from "../public/kjv.json"
// import nkjvBible from "../public/nkjv.json"
// import nivBible from "../public/niv.json"
// import ampBible from "../public/amp.json"
import hymns from "../public/hymns.json"
import { useAppStore } from "~/store/app"

useHead({
  title: "Cloud of Worshippers",
})
defineProps({
  appVersion: String,
})

const appStore = useAppStore()
const loadingResources = ref<boolean>(true)
const downloadProgress = ref<number>(5)

const downloadEssentialResources = async () => {
  loadingResources.value = true
  downloadProgress.value = 1

  // Download KJV Bible
  // const kjvBible = await useS3File("kjv.json")
  if (useNuxtApp().$kjvBible) {
    useNuxtApp().provide("kjvBible", kjvBible || "")
    downloadProgress.value = 2
  }

  // // Download NKJV Bible
  // // const nkjvBible = await useS3File("nkjv.json")
  // useNuxtApp().provide("nkjvBible", nkjvBible || "")
  // downloadProgress.value = 3

  // // Download NIV Bible
  // // const nivBible = await useS3File("niv.json")
  // useNuxtApp().provide("nivBible", nivBible || "")
  // downloadProgress.value = 4

  // // Download AMP Bible
  // // const ampBible = await useS3File("amp.json")
  // useNuxtApp().provide("ampBible", ampBible || "")
  // downloadProgress.value = 5

  // Download all hymns
  // const hymns = await useS3File("hymns.json")

  if (useNuxtApp().$hymns) {
    useNuxtApp().provide("hymns", hymns || "")
    downloadProgress.value = 6
  }

  setTimeout(() => {
    downloadProgress.value = 7
    loadingResources.value = false
  }, 500)
}

const retrieveAllMediaFilesFromDB = async () => {
  const slides = [...appStore.activeSlides]
  slides.forEach(async (slide) => {
    if (slide.type === slideTypes.media) {
      const mediaObj = await useIndexedDB()
        .media.where({ id: slide.id })
        .toArray()
      if (mediaObj[0]) {
        const fileUrl = URL.createObjectURL(mediaObj[0].content)
        slide.data.url = fileUrl
        slide.background = fileUrl
        appStore.setActiveSlides(slides)
      }
    }
  })
}

downloadEssentialResources()
retrieveAllMediaFilesFromDB()
</script>

<style scoped></style>
