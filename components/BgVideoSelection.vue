<template>
  <div class="bg-image-selection p-2 gap-2 grid grid-cols-3">
    <UButton
      v-for="video in backgroundVideos"
      :key="video"
      @click="$emit('select', video)"
      class="min-w-[80px] h-[60px] p-0 text-black bg-cover transition-all overflow-hidden relative"
    >
      <video
        class="bg-image w-[100%] h-[100%] transition rounded-md opacity-100 hover:opacity-30 object-cover"
        :class="{ 'opacity-30': video === value }"
        :src="video"
        muted
        autoplay
      ></video>
      <IconWrapper
        v-if="video === value"
        name="i-bx-check"
        size="5"
        :rounded-bg="true"
        class="absolute text-primary-500 scale-50 bottom-2 right-2"
      />
    </UButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string
}>()
const backgroundVideos = [
  "/large_assets/video-bg-1.mp4",
  "/large_assets/video-bg-2.mp4",
  "/large_assets/video-bg-3.mp4",
]
</script>
