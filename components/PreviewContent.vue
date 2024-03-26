<template>
  <AppSection heading="Preview and Edit Content" class="flex-[2]">
    <div
      class="slides-ctn overflow-auto mb-4 rounded-md transition"
      :class="[
        windowHeight / 3 > 300 ? 'slides-ctn-3-rows' : 'slides-ctn-2-rows',
        slides?.length === 0 ? 'bg-primary-100' : '',
      ]"
    >
      <div v-if="slides?.length > 0" class="grid grid-cols-3 gap-3">
        <SlideCard
          v-for="slide in slides"
          :key="slide.id"
          :slide="slide"
          :live="false"
          grid-type
          @click="makeSlideActive(slide)"
        />
      </div>
      <EmptyState
        v-else
        icon="i-tabler-device-desktop-plus"
        sub="No slides yet"
        action="new-slide"
        action-text="Create new slide"
      />
    </div>
    <EditLiveContent :slide="activeSlide" @slide-update="onUpdateSlide" />
  </AppSection>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app"
import type { Slide } from "~/types"
const appStore = useAppStore()
const toast = useToast()

const windowHeight = ref<number>(0)
const slides = ref<Array<Slide>>([])
const activeSlide = ref<Slide>()

const makeSlideActive = (slide: Slide, goLive: boolean = false) => {
  activeSlide.value = slide
  if (goLive) {
    appStore.setLiveOutputSlides(slides.value)
    appStore.setLiveSlide(activeSlide.value)
  }
}

onMounted(() => {
  windowHeight.value = document.documentElement.offsetHeight
  addEventListener("resize", () => {
    windowHeight.value = document.documentElement.offsetHeight
  })
})

// LISTEN TO EVENTS
const emitter = appStore.emitter
emitter.on("new-slide", () => {
  createNewSlide()
})

emitter.on("new-bible", (data: string) => {
  const bible = useBible(data)
  if (bible) {
    createNewBibleSlide(bible)
  }
})

const preSlideCreation = (): Slide => {
  // Update slide names to be correctly indexed
  slides.value?.forEach((slide, index) => {
    slide.id = (index + 1).toString()
    slide.name = `Slide ${index + 1}`
  })
  const tempSlide: Slide = {
    id: (slides.value?.length + 1 || 1).toString(),
    name: `Slide ${slides.value?.length + 1 || 1}`,
    type: slideTypes.text,
    layout: slideLayoutTypes.heading_sub,
    contents: [],
  }
  return tempSlide
}

const createNewSlide = () => {
  const tempSlide = { ...preSlideCreation() }
  slides.value?.push(tempSlide)
  makeSlideActive(tempSlide)
  toast.add({ title: "New Slide created", icon: "i-bx-slideshow" })
}

const createNewBibleSlide = (bible: Object) => {
  const tempSlide = { ...preSlideCreation() }
  tempSlide.layout = slideLayoutTypes.bible
  tempSlide.type = slideTypes.bible
  tempSlide.scripture = bible?.shortFormat

  // Calculate font-size of scripture content
  let fontSize = useScreenFontSize(bible?.scripture)

  tempSlide.contents = [
    `<p class="scripture-content" style="font-size: ${fontSize}vw">${bible?.scripture}</>`,
    `<p class="scripture-label"><b>${bible?.reference?.toUpperCase()}</b> • ${
      bible?.version
    }</p>`,
  ]

  slides.value?.push(tempSlide)
  makeSlideActive(tempSlide, true)
  toast.add({ title: "Bible Slide created", icon: "i-bx-bible" })
}

const onUpdateSlide = (slide: Slide) => {
  makeSlideActive(slide)
  const slideIndex = slides.value?.findIndex(
    (slideInner: Slide) => slide.id === slideInner.id
  )
  slides.value?.splice(slideIndex || 0, 1, slide)

  updateLiveOutput(slide)
}

const updateLiveOutput = (updatedSlide: Slide) => {
  appStore.setLiveOutputSlides(slides.value || [])

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
