<template>
  <div class="main max-h-[100vh] overflow-hidden" :id="liveSlideId">
    <LiveProjectionOnly
      :full-screen="true"
      :slide="liveSlide"
      :slide-label="false"
      :slide-styles="settings.slideStyles"
    />
  </div>
</template>
<script setup>
import { useAppStore } from "@/store/app"
const appStore = useAppStore()
const { liveSlideId, activeSlide, activeSlides, settings } =
  storeToRefs(appStore)

const liveSlide = computed(() => {
  return activeSlides.value.find((slide) => slide.id === liveSlideId.value)
})

onMounted(() => {
  const toast = useToast()
  toast.add({
    icon: "i-bx-info-circle",
    title: "Double tap display to go full screen",
  })
})
</script>

<style scoped></style>
