<template>
  <div class="main pointer-events-none max-h-[100vh] overflow-hidden">
    <LiveProjectionOnly full-screen :slide="activeSlide" />
  </div>
</template>
<script setup>
import { useAppStore } from "@/store/app"
const appStore = useAppStore()
const { activeSlide } = storeToRefs(appStore)
</script>

<style scoped></style>
