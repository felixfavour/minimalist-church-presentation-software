<template>
  <div
    class="live-output w-[100%] min-h-[220px] rounded-md relative overflow-hidden border bg-cover bg-no-repeat"
    :class="{ 'h-[100vh] rounded-none border-none min-h-[100%]': fullScreen }"
  >
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
        <!-- <span v-html="slide"></span> -->
      </h5>
      <LiveSlideIndicator :visible="!!slide?.name" class="mr-4 mt-4" />
    </div>

    <LiveContent :slide="slide" :class="{ 'min-h-[220px]': !fullScreen }" />
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
      return `background-image: ${props.slide.background}`
    case backgroundTypes.video:
      return `VIDEO-TYPE`
  }
  return ""
}
</script>

<style scoped></style>
