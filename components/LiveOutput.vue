<template>
  <AppSection heading="Live Output">
    <div class="main">
      <div class="slides-ctn h-[calc(100vh-80px-220px-80px)] overflow-auto mb-4 overflow-x-hidden">
        <EmptyState v-if="liveOutputSlides?.length === 0 || !liveOutputSlides" icon="i-bx-slideshow" sub="No slides yet"
          action="" action-text="" />
        <SlideCard v-else v-for="slide in liveOutputSlides" :key="slide?.id" :slide="slide" :grid-type="false"
          :live="liveSlide?.id === slide?.id" @click="appStore.setLiveSlide(slide?.id || '0')" />
      </div>
      <LiveProjectionOnly slide-label :slide="liveSlide" :full-screen="false" :slide-styles="slideStyles"
        class="lg-preview" />
    </div>
  </AppSection>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app"

const appStore = useAppStore()
const { liveOutputSlidesId, liveSlideId, slideStyles } = storeToRefs(appStore)

const liveSlide = computed(() => {
  return appStore.activeSlides.find(slide => slide.id === liveSlideId.value)
})

const liveOutputSlides = computed(() => {
  return liveOutputSlidesId.value?.map(id => appStore.activeSlides.find(slide => slide.id === id))
})
</script>
