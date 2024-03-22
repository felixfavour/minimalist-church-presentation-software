<template>
  <div class="main pointer-events-none max-h-[100vh] overflow-hidden">
    <LiveProjectionOnly
      :full-screen="true"
      :slide="liveSlide"
      :slide-label="false"
    />
  </div>
</template>
<script setup>
import { useAppStore } from "@/store/app"
const appStore = useAppStore()
const { liveSlide } = storeToRefs(appStore)

watch(liveSlide, () => {
  console.log("content", liveSlide.value.contents?.at(1))
})
</script>

<style scoped></style>
