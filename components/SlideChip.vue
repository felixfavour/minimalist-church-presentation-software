<template>
  <p
    class="text-xs font-medium rounded-full bg-gray-100 px-2 py-1 flex gap-1 capitalize"
    :class="{ 'bg-white text-black': darkMode }"
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
</script>

<style></style>
