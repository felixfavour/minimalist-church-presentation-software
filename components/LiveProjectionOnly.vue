<template>
  <div
    class="live-output w-[100%] min-h-[220px] rounded-md relative overflow-hidden border bg-cover bg-no-repeat transition-all backdrop-blur-0 bg-black"
    :class="{ 'h-[100vh] rounded-none border-none min-h-[100%]': fullScreen }" :style="useSlideBackground(slide)">
    <!-- VIDEO BACKGROUND -->
    <video ref="video" v-if="slide?.backgroundType === backgroundTypes.video" :src="slide?.background" autoplay loop muted
      playsinline="true" class="h-[100%] w-[100%] object-cover absolute inset-0"></video>

    <div v-if="!fullScreen || slideLabel" class="overlay-gradient absolute inset-0"></div>
    <div v-if="!fullScreen || slideLabel" class="heading p-3 absolute z-10 inset-0">
      <h5 class="font-semibold text-white">
        {{ slide?.name || "No Live Slide" }}
      </h5>
      <LiveSlideIndicator :visible="!!slide?.name" class="mr-4 mt-4" />
    </div>

    <!-- MAIN FOREGROUND CONTENT -->
    <LiveContent :slide="slide" class="relative" :class="fullScreen ? '' : 'min-h-[220px] rounded-md'"
      :padding="fullScreen ? '6' : '0'"
      :style="`backdrop-filter: blur(${slideStyles.blur}px) brightness(${slideStyles.brightness}%);`" />
  </div>
</template>

<script setup lang="ts">
import type { Slide, SlideStyle } from "~/types"
const appMounted = ref<boolean>(false)
const video = ref<HTMLVideoElement | null>(null)

const props = defineProps<{
  slideLabel: Boolean
  slide: Slide
  fullScreen: Boolean
  slideStyles: SlideStyle
}>()

watch(() => props.slide, () => {
  if (appMounted) {
    video.value?.play()
  }
})

onMounted(() => {
  appMounted.value = true
  video.value?.play()
})
</script>

<style scoped></style>
