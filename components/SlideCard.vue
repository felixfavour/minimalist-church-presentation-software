<template>
  <!-- GRID TYPE CARD -->
  <button
    v-if="gridType"
    class="slide-card flex text-left gap-3 p-2 border border-gray-100 rounded-md bg-primary hover:bg-primary-700 transition-all cursor-pointer relative overflow-hidden h-[120px]"
    @click="$emit('click')"
  >
    <div class="overlay-gradient absolute inset-0"></div>
    <div class="texts flex items-center gap-2 text-white absolute top-1">
      <h4 class="font-medium ws-nowrap mt-1">{{ slide.name }}</h4>
      <SlideChip :slide-type="slide.type" dark-mode class="mt-1" />
    </div>
  </button>

  <!-- LIST TYPE CARD -->
  <button
    v-else
    class="slide-card flex w-[100%] text-left gap-3 p-2 border-t first:border-t-0 border-gray-100 hover:rounded-md hover:bg-primary-50 transition-all cursor-pointer relative"
    @click="$emit('click')"
  >
    <div class="slide-preview w-24 min-w-24 h-16 bg-gray-100 rounded-md"></div>
    <div class="texts flex-col justify-between">
      <h4 class="font-medium mt-2">{{ slide.name }}</h4>
      <SlideChip :slide-type="slide.type" class="mt-1" />
    </div>
    <LiveSlideIndicator :visible="live" class="mr-2 mt-4" />
  </button>
</template>

<script setup lang="ts">
import type { Slide } from "~/types"

const props = defineProps<{
  slide: Slide
  live: boolean
  gridType: boolean
}>()
</script>

<style scoped></style>
