<template>
  <AppSection heading="Live Output">
    <div class="main">
      <div
        class="slides-ctn h-[calc(100vh-80px-220px-80px)] overflow-auto mb-4"
      >
        <SlideCard
          v-for="slide in slides"
          :key="slide.name"
          :slide="slide"
          :live="liveSlide?.name === slide?.name"
          @click="takeSlideLive(slide)"
        />
      </div>
      <LiveProjectionOnly :slide="liveSlide" />
    </div>
  </AppSection>
</template>

<script setup>
const slides = ref([
  {
    name: "Slide 1",
    type: slideTypes.lyrics,
  },
  {
    name: "Slide 2",
    type: slideTypes.lyrics,
  },
  {
    name: "Slide 3",
    type: slideTypes.lyrics,
  },
  {
    name: "Slide 4",
    type: slideTypes.sermon,
  },
  {
    name: "Slide 5",
    type: slideTypes.sermon,
  },
  {
    name: "Slide 6",
    type: slideTypes.bible,
  },
  {
    name: "Slide 7",
    type: slideTypes.sermon,
  },
  {
    name: "Slide 8",
    type: slideTypes.misc,
  },
  {
    name: "Slide 9",
    type: slideTypes.carousel,
  },
  {
    name: "Slide 10",
    type: slideTypes.misc,
  },
])
const liveSlide = ref(slides.value[0])

const takeSlideLive = (slide) => {
  liveSlide.value = slide
}
</script>

<style scoped></style>
