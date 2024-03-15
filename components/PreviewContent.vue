<template>
  <AppSection heading="Preview and Edit Content" class="flex-[2]">
    <div class="main">
      <div
        class="slides-ctn grid grid-cols-3 gap-3 h-[390px] overflow-auto mb-4"
      >
        <SlideCard
          v-for="slide in slides"
          :key="slide.name"
          :slide="slide"
          grid-type
          @click="takeSlideLive(slide)"
        />
      </div>
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
const liveSlide = ref()

const takeSlideLive = (slide) => {
  liveSlide.value = slide
}
</script>

<style scoped></style>
