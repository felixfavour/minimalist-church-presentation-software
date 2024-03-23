<template>
  <AppSection heading="Preview and Edit Content" class="flex-[2]">
    <div class="main">
      <div
        class="slides-ctn grid grid-cols-3 gap-3 overflow-auto mb-4"
        :class="
          windowHeight / 3 > 300 ? 'slides-ctn-3-rows' : 'slides-ctn-2-rows'
        "
      >
        <SlideCard
          v-for="slide in slides"
          :key="slide.id"
          :slide="slide"
          :live="false"
          grid-type
          @click="makeSlideActive(slide)"
        />
      </div>
    </div>
    <EditLiveContent :slide="activeSlide" @slide-update="onUpdateSlide" />
  </AppSection>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app"
import type { Slide } from "~/types"
const appStore = useAppStore()

const windowHeight = ref<number>(0)
const slides = ref<Array<Slide> | null>(
  appStore.liveOutputSlides || [
    {
      id: "1",
      name: "Slide 1",
      type: slideTypes.lyrics,
      layout: slideLayoutTypes.full_text,
      contents: [],
      background: "",
      backgroundType: "",
    },
    {
      id: "2",
      name: "Slide 2",
      type: slideTypes.lyrics,
      layout: slideLayoutTypes.full_text,
      contents: [],
      background: "",
      backgroundType: "",
    },
    {
      id: "3",
      name: "Slide 3",
      type: slideTypes.lyrics,
      layout: slideLayoutTypes.full_text,
      contents: [],
      background: "",
      backgroundType: "",
    },
    {
      id: "4",
      name: "Slide 4",
      type: slideTypes.sermon,
      layout: slideLayoutTypes.full_text,
      contents: [],
      background: "",
      backgroundType: "",
    },
    {
      id: "5",
      name: "Slide 5",
      type: slideTypes.sermon,
      layout: slideLayoutTypes.full_text,
      contents: [],
      background: "",
      backgroundType: "",
    },
    {
      id: "6",
      name: "Slide 6",
      type: slideTypes.bible,
      layout: slideLayoutTypes.full_text,
      contents: [],
      background: "",
      backgroundType: "",
    },
    {
      id: "7",
      name: "Slide 7",
      type: slideTypes.sermon,
      layout: slideLayoutTypes.full_text,
      contents: [],
      background: "",
      backgroundType: "",
    },
    {
      id: "8",
      name: "Slide 8",
      type: slideTypes.misc,
      layout: slideLayoutTypes.full_text,
      contents: [],
      background: "",
      backgroundType: "",
    },
    {
      id: "9",
      name: "Slide 9",
      type: slideTypes.carousel,
      layout: slideLayoutTypes.full_text,
      contents: [],
      background: "",
      backgroundType: "",
    },
    {
      id: "10",
      name: "Slide 10",
      type: slideTypes.misc,
      layout: slideLayoutTypes.full_text,
      contents: [],
      background: "",
      backgroundType: "",
    },
  ]
)
const activeSlide = ref<Slide>()

const makeSlideActive = (slide: Slide) => {
  activeSlide.value = slide
}

onMounted(() => {
  windowHeight.value = document.documentElement.offsetHeight
  addEventListener("resize", () => {
    windowHeight.value = document.documentElement.offsetHeight
  })
})

const onUpdateSlide = (slide: Slide) => {
  makeSlideActive(slide)
  const slideIndex = slides.value.findIndex(
    (slideInner: Slide) => slide.id === slideInner.id
  )
  slides.value.splice(slideIndex, 1, slide)

  updateLiveOutput(slide)
}

const updateLiveOutput = (updatedSlide: Slide) => {
  appStore.setLiveOutputSlides(slides.value)

  // If the current slide in the live output is being edited, then update LiveOutput immediately
  if (updatedSlide.id === appStore.liveSlide?.id) {
    appStore.setLiveSlide(updatedSlide)
  }
}
</script>

<style scoped>
.slides-ctn-3-rows {
  height: 390px;
}
.slides-ctn-2-rows {
  height: 260px;
}
</style>
