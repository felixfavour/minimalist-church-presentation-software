<template>
  <AppSection heading="Live Output">
    <div class="main">
      <div
        class="slides-ctn h-[calc(100vh-80px-220px-80px)] overflow-auto mb-4 overflow-x-hidden"
      >
        <SlideCard
          v-for="slide in liveOutputSlides"
          :key="slide.id"
          :slide="slide"
          :grid-type="false"
          :live="liveSlide?.id === slide?.id"
          @click="appStore.setLiveSlide(slide)"
        />
      </div>
      <LiveProjectionOnly
        slide-label
        :slide="liveSlide"
        :full-screen="false"
        class="lg-preview"
      />
    </div>
  </AppSection>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app"

const appStore = useAppStore()
const { liveOutputSlides, liveSlide } = storeToRefs(appStore)
</script>
