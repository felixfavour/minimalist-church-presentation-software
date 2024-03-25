<template>
  <AppSection heading="Preview and Edit Content" class="flex-[2]">
    <div
      class="slides-ctn overflow-auto mb-4 bg-primary-100 rounded-md"
      :class="
        windowHeight / 3 > 300 ? 'slides-ctn-3-rows' : 'slides-ctn-2-rows'
      "
    >
      <div v-if="slides" class="grid grid-cols-3 gap-3">
        <SlideCard
          v-for="slide in slides"
          :key="slide.id"
          :slide="slide"
          :live="false"
          grid-type
          @click="makeSlideActive(slide)"
        />
      </div>
      <EmptyState
        v-else
        icon="i-tabler-device-desktop-plus"
        sub="No slides yet"
        action="new-slide"
        action-text="Create new slide"
      />
    </div>
    <EditLiveContent :slide="activeSlide" @slide-update="onUpdateSlide" />
  </AppSection>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app"
import type { Slide } from "~/types"
const appStore = useAppStore()

const windowHeight = ref<number>(0)
const slides = ref<Array<Slide> | null>(appStore.liveOutputSlides)
const activeSlide = ref<Slide>()

const makeSlideActive = (slide: Slide) => {
  activeSlide.value = slide
}

onMounted(() => {
  windowHeight.value = document.documentElement.offsetHeight
  addEventListener("resize", () => {
    windowHeight.value = document.documentElement.offsetHeight
  })
})

const onUpdateSlide = (slide: Slide) => {
  makeSlideActive(slide)
  const slideIndex = slides.value?.findIndex(
    (slideInner: Slide) => slide.id === slideInner.id
  )
  slides.value?.splice(slideIndex || 0, 1, slide)

  updateLiveOutput(slide)
}

const updateLiveOutput = (updatedSlide: Slide) => {
  appStore.setLiveOutputSlides(slides.value || [])

  // If the current slide in the live output is being edited, then update LiveOutput immediately
  if (updatedSlide.id === appStore.liveSlide?.id) {
    appStore.setLiveSlide(updatedSlide)
  }
}
</script>

<style scoped>
.slides-ctn-3-rows {
  height: 390px;
}
.slides-ctn-2-rows {
  height: 260px;
}
</style>
