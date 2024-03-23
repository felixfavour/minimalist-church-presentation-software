<template>
  <div class="main max-h-[100vh] overflow-hidden">
    <LiveProjectionOnly
      :full-screen="true"
      :slide="liveSlide"
      :slide-label="false"
    />

    <!-- <TransitionGroup name="live">
      <LiveProjectionOnly
        v-for="slide in liveOutputSlides"
        :key="slide.id"
        :full-screen="true"
        :slide="slide"
        :slide-label="false"
        v-show="slide.id === liveSlide.id"
      />
    </TransitionGroup> -->
  </div>
</template>
<script setup>
import { useAppStore } from "@/store/app"
const appStore = useAppStore()
const { liveSlide, liveOutputSlides } = storeToRefs(appStore)
</script>

<style scoped></style>
