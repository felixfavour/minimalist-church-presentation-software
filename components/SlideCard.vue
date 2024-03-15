<template>
  <button
    class="slide-card flex w-[100%] text-left gap-3 p-2 border-t first:border-t-0 border-gray-100 hover:rounded-md hover:bg-primary-50 transition-all cursor-pointer relative"
    @click="$emit('click')"
  >
    <div class="slide-preview w-24 min-w-24 h-16 bg-gray-100 rounded-md"></div>
    <div class="texts flex-col justify-between">
      <h4 class="font-medium mt-2">{{ slide.name }}</h4>
      <p
        class="font-light text-xs font-medium mt-1 rounded-full bg-gray-100 px-3 py-1 flex gap-1 capitalize"
      >
        <IconWrapper :name="getIconBySlideType(slide.type)" size="4" />
        {{ slide.type }}
      </p>
    </div>
    <LiveSlideIndicator :visible="live" class="mr-2 mt-4" />
  </button>
</template>

<script setup>
const props = defineProps({
  slide: Object,
  live: Boolean,
})

const getIconBySlideType = (slideType) => {
  switch (slideType) {
    case slideTypes.lyrics:
      return "i-bx-music"
    case slideTypes.sermon:
      return "i-bx-slideshow"
    case slideTypes.bible:
      return "i-bx-bible"
    case slideTypes.misc:
      return "i-bx-cloud"
    case slideTypes.carousel:
      return "i-bx-carousel"
  }
}
</script>

<style scoped></style>
