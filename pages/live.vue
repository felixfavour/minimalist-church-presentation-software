<template>
  <div class="main max-h-[100vh] overflow-hidden">
    <LiveProjectionOnly :full-screen="true" :slide="liveSlide" :slide-label="false" :slide-styles="slideStyles" />
  </div>
</template>
<script setup>
import { useAppStore } from "@/store/app"
const appStore = useAppStore()
const { liveSlideId, activeSlide, activeSlides, slideStyles } = storeToRefs(appStore)

const liveSlide = computed(() => {
  return activeSlides.value.find(slide => slide.id === liveSlideId.value)
})
</script>

<style scoped></style>
