<template>
  <!-- GRID TYPE CARD -->
  <button
    v-if="gridType"
    class="slide-card flex text-left gap-3 p-2 border border-gray-100 rounded-md bg-primary hover:bg-primary-700 transition-all cursor-pointer relative overflow-hidden h-[120px]"
    @click="$emit('click')"
  >
    <div class="overlay-gradient absolute inset-0"></div>
    <div class="texts flex items-center gap-2 text-white absolute top-1">
      <h4 class="font-medium ws-nowrap">{{ slide.name }}</h4>
      <p
        class="text-xs font-medium mt-1 rounded-full bg-slate-100 text-black px-3 py-1 flex gap-1 capitalize ws-nowrap"
      >
        <IconWrapper :name="getIconBySlideType(slide.type)" size="4" />
        {{ slide.type }}
      </p>
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
      <p
        class="text-xs font-medium mt-1 rounded-full bg-gray-100 px-3 py-1 flex gap-1 capitalize"
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
  gridType: Boolean,
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
