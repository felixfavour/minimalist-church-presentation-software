<template>
  <div
    class="live-output w-[100%] min-h-[220px] rounded-md relative overflow-hidden border bg-no-repeat transition-all backdrop-blur-0 bg-black dark:border-none"
    :class="{
      'h-[100vh] rounded-none border-none min-h-[100%]': fullScreen,
      'bg-cover': slide?.type !== slideTypes.media,
      'bg-center bg-contain': slide?.type === slideTypes.media,
    }"
    :style="useSlideBackground(slide)"
  >
    <!-- VIDEO BACKGROUND -->
    <video
      ref="video"
      v-if="slide?.backgroundType === backgroundTypes.video"
      :src="slide?.background"
      autoplay
      :loop="slide?.type !== slideTypes.media"
      :muted="fullScreen && slide?.type !== slideTypes.media"
      playsinline="true"
      :class="[
        'h-[100%] w-[100%] absolute inset-0',
        slide?.type === slideTypes.media ? 'object-contain' : 'object-cover',
      ]"
      crossorigin="anonymous"
    ></video>

    <div
      v-if="!fullScreen || slideLabel"
      class="overlay-gradient absolute inset-0"
    ></div>
    <div
      v-if="!fullScreen || slideLabel"
      class="heading p-3 absolute z-10 inset-0"
    >
      <h5 class="font-semibold text-white">
        {{ slide?.name || "No Live Slide" }}
      </h5>
      <LiveSlideIndicator :visible="!!slide?.name" class="mr-4 mt-4" />
    </div>

    <!-- MAIN FOREGROUND CONTENT -->
    <LiveContent
      :content-visible="foregroundContentVisible"
      :slide="slide"
      class="relative come-up-1"
      :class="fullScreen ? '' : 'min-h-[220px] rounded-md'"
      :padding="fullScreen ? '6' : '0'"
      :style="
        slide?.type === slideTypes.media
          ? ''
          : `backdrop-filter: blur(${slideStyles.blur}px) brightness(${slideStyles.brightness}%);`
      "
    />
  </div>
</template>

<script setup lang="ts">
import type { Slide, SlideStyle } from "~/types"
const appMounted = ref<boolean>(false)
const video = ref<HTMLVideoElement | null>(null)
const foregroundContentVisible = ref<boolean>(true)

const props = defineProps<{
  slideLabel: Boolean
  slide: Slide
  fullScreen: Boolean
  slideStyles: SlideStyle
}>()

watch(
  () => props.slide,
  (newVal, oldVal) => {
    if (appMounted) {
      video.value?.play()
      if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        foregroundContentVisible.value = false
        setTimeout(() => {
          foregroundContentVisible.value = true
        }, 100)
      }
    }
  }
)

onMounted(() => {
  appMounted.value = true
  video.value?.play()
})
</script>

<style scoped></style>
