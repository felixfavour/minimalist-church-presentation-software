<template>
  <!-- GRID TYPE CARD -->
  <div
    v-if="gridType"
    class="slide-card border-2 border-transparent flex items-center justify-center text-left gap-3 p-2 h-[120px] rounded-md bg-primary hover:bg-primary-700 transition-all cursor-pointer relative overflow-hidden"
    :class="{ 'border-black': selected }"
  >
    <button class=" " @click="$emit('click')">
      <div class="slide-preview text-white overflow-hidden md-preview">
        <LiveContent :slide="slide" padding="0" content-visible />
      </div>
      <div
        class="overlay-gradient absolute inset-0"
        :class="{ 'border-4 border-primary': selected }"
      ></div>
      <div
        class="texts flex items-center gap-2 text-white absolute top-1 right-2 left-2"
      >
        <h4 class="font-medium ws-nowrap mt-1">{{ slide?.name }}</h4>
        <SlideChip :slide-type="slide?.type" dark-mode class="mt-1" />
      </div>
    </button>
    <!-- DELETE SLIDE BUTTON -->
    <ConfirmDialog
      class="absolute bottom-2 right-2"
      button-icon="i-bx-trash"
      header="Delete slide"
      label="Are you sure you want to delete this slide? This action is not reversible"
      @confirm="$emit('delete', slide?.id)"
    >
    </ConfirmDialog>
  </div>

  <!-- LIST TYPE CARD -->
  <button
    v-else
    class="group slide-card flex w-[100%] text-left gap-3 p-2 border-t first:border-t-0 border-gray-100 rounded-md hover:bg-primary-50 transition-all cursor-pointer relative"
    :class="{ 'bg-red-100': live }"
    @click="$emit('click')"
  >
    <div
      class="slide-preview w-24 min-w-24 h-16 bg-primary-600 text-white rounded-md overflow-hidden sm-preview"
    >
      <LiveContent :slide="slide" padding="0" content-visible />
    </div>
    <div class="texts flex-col justify-between">
      <h4 class="font-medium mt-2">{{ slide?.name }}</h4>
      <SlideChip :slide-type="slide?.type" class="mt-1" />
    </div>
    <LiveSlideIndicator :visible="live" class="mr-2 mt-4" />
    <!-- DELETE SLIDE BUTTON -->
    <ConfirmDialog
      class="absolute bottom-2 right-2 invisible group-hover:visible"
      button-icon="i-bx-trash"
      header="Delete slide"
      label="Are you sure you want to delete this slide? This action is not reversible"
      @confirm="$emit('delete', slide?.id)"
    >
    </ConfirmDialog>
  </button>
</template>

<script setup lang="ts">
import type { Slide } from "~/types"

const props = defineProps<{
  slide: Slide
  live: boolean
  gridType: boolean
  selected: boolean
}>()
</script>

<style scoped></style>
