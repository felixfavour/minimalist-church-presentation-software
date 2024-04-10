<template>
  <p
    class="text-xs font-medium rounded-full bg-gray-100 px-2 py-1 flex gap-1 capitalize"
    :class="[
      {
        'bg-white text-black': darkMode,
      },
      getBGBySlideType(slideType),
    ]"
  >
    <IconWrapper :name="getIconBySlideType(slideType)" size="4" />
    {{ slideType }}
  </p>
</template>

<script setup>
const props = defineProps({
  slideType: String,
  darkMode: Boolean,
})
const getIconBySlideType = (slideType) => {
  switch (slideType) {
    case slideTypes.song:
      return "i-bx-music"
    case slideTypes.hymn:
      return "i-bx-church"
    case slideTypes.sermon:
      return "i-bx-slideshow"
    case slideTypes.bible:
      return "i-bx-bible"
    case slideTypes.text:
      return "i-bx-cloud"
    case slideTypes.carousel:
      return "i-bx-carousel"
  }
  return ""
}
const getBGBySlideType = (slideType) => {
  switch (slideType) {
    case slideTypes.song:
      return "bg-green-100 border border-green-500 text-green-700"
    case slideTypes.hymn:
      return "bg-pink-100 border border-pink-500 text-pink-700"
    case slideTypes.bible:
      return "bg-primary-200 border border-primary-500 text-primary-700"
    case slideTypes.text:
      return "bg-cyan-100 border border-cyan-500 text-cyan-700"
  }
  return ""
}
</script>

<style></style>
