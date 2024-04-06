<template>
  <AppSection heading="Live Output" class="max-w-[330px]">
    <div class="main">
      <div
        class="slides-ctn h-[calc(100vh-80px-220px-80px)] overflow-auto mb-4 overflow-x-hidden"
      >
        <EmptyState
          v-if="liveOutputSlides?.length === 0 || !liveOutputSlides"
          icon="i-bx-slideshow"
          sub="No slides yet"
          action=""
          action-text=""
        />
        <SlideCard
          v-else
          v-for="slide in liveOutputSlides"
          :key="slide?.id"
          :slide="slide"
          :grid-type="false"
          :live="liveSlide?.id === slide?.id"
          @click="appStore.setLiveSlide(slide?.id || '0')"
          @delete="deleteSlide"
        />
      </div>
      <LiveProjectionOnly
        slide-label
        :slide="liveSlide"
        :full-screen="false"
        :slide-styles="settings.slideStyles"
        class="lg-preview"
      />
    </div>
  </AppSection>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app"

const appStore = useAppStore()
const toast = useToast()
const { liveOutputSlidesId, liveSlideId, settings } = storeToRefs(appStore)

const liveSlide = computed(() => {
  return appStore.activeSlides.find((slide) => slide.id === liveSlideId.value)
})

const liveOutputSlides = computed(() => {
  return liveOutputSlidesId.value?.map((id) =>
    appStore.activeSlides.find((slide) => slide.id === id)
  )
})

const deleteSlide = (slideId: string) => {
  const slides = appStore.activeSlides || []
  const tempSlide = appStore.activeSlides.find((s) => s.id === slideId)
  const slideIndex = slides.findIndex((s) => s.id === slideId)
  slides.splice(slideIndex, 1)
  appStore.setActiveSlides(slides)
  toast.add({ title: `${tempSlide?.name} deleted`, icon: "i-bx-trash" })
}
</script>
