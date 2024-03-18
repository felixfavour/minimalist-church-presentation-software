<template>
  <div class="main pointer-events-none max-h-[100vh] overflow-hidden">
    <LiveProjectionOnly full-screen :slide-label="false" :slide="activeSlide" />
  </div>
</template>
<script setup>
import { useAppStore } from "@/store/app"
const appStore = useAppStore()
const { activeSlide } = storeToRefs(appStore)
</script>

<style scoped></style>
