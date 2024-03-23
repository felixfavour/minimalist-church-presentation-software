<template>
  <div
    class="live-output w-[100%] min-h-[220px] rounded-md relative overflow-hidden border bg-cover bg-no-repeat transition-all"
    :class="{ 'h-[100vh] rounded-none border-none min-h-[100%]': fullScreen }"
    :style="getSlideBackground()"
  >
    <!-- VIDEO BACKGROUND -->
    <video
      v-if="$props.slide.backgroundType === backgroundTypes.video"
      :src="$props.slide.background"
      autoplay
      loop
      class="h-[100%] w-[100%] object-cover absolute inset-0"
    ></video>

    <div
      v-if="!fullScreen || slideLabel"
      class="overlay-gradient absolute inset-0"
    ></div>
    <div
      v-if="!fullScreen || slideLabel"
      class="heading p-3 absolute z-1 inset-0"
    >
      <h5 class="font-semibold text-white">
        {{ slide?.name || "No Live Slide" }}
      </h5>
      <LiveSlideIndicator :visible="!!slide?.name" class="mr-4 mt-4" />
    </div>

    <!-- MAIN FOREGROUND CONTENT -->
    <LiveContent
      :slide="slide"
      class="relative"
      :class="fullScreen ? '' : 'min-h-[220px]'"
      :padding="fullScreen ? '6' : '0'"
    />
  </div>
</template>

<script setup lang="ts">
import type { Slide } from "~/types"
import { backgroundTypes } from "~/utils/constants"

const props = defineProps<{
  slideLabel: Boolean
  slide: Slide
  fullScreen: Boolean
}>()

const getSlideBackground = () => {
  switch (props.slide.backgroundType) {
    case backgroundTypes.solid:
      return `background-color: ${props.slide.background}`
    case backgroundTypes.gradient:
      return `background-color: ${props.slide.background}`
    case backgroundTypes.image:
      return `background-image: url(${props.slide.background})`
  }
  return "#000000"
}
</script>

<style scoped></style>
