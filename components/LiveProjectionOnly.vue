<template>
  <div
    class="live-output w-[100%] min-h-[220px] rounded-md relative overflow-hidden border bg-cover bg-no-repeat transition-all"
    :class="{ 'h-[100vh] rounded-none border-none min-h-[100%]': fullScreen }"
    :style="useSlideBackground(slide)"
  >
    <!-- VIDEO BACKGROUND -->
    <video
      v-if="slide.backgroundType === backgroundTypes.video"
      :src="slide.background"
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

const props = defineProps<{
  slideLabel: Boolean
  slide: Slide
  fullScreen: Boolean
}>()
</script>

<style scoped></style>
