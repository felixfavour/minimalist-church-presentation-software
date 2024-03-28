<template>
  <AppSection heading="Preview and Edit Content" class="flex-[2]">
    <div class="slides-ctn overflow-auto mb-4 rounded-md transition" :class="[
      windowHeight / 3 > 300 ? 'slides-ctn-3-rows' : 'slides-ctn-2-rows',
      slides?.length === 0 ? 'bg-primary-100' : '',
    ]">
      <div v-if="slides?.length > 0" class="grid grid-cols-3 gap-3">
        <SlideCard v-for="slide in slides" :key="slide.id" :slide="slide" :live="false" grid-type
          @click="makeSlideActive(slide)" @delete="deleteSlide" />
      </div>
      <EmptyState v-else icon="i-tabler-device-desktop-plus" sub="No slides yet" action="new-slide"
        action-text="Create new slide" />
    </div>
    <EditLiveContent :slide="activeSlide" @slide-update="onUpdateSlide" @next-verse="nextAction"
      @previous-verse="prevAction" @goto-verse="gotoScripture" @goto-chorus="gotoChorus" />
  </AppSection>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app"
import type { Hymn, Scripture, Slide } from "~/types"
const appStore = useAppStore()
const toast = useToast()

const windowHeight = ref<number>(0)
const slides = ref<Array<Slide>>(appStore.activeSlides || [])
const activeSlide = ref<Slide>()

watch(slides, () => {
  appStore.setActiveSlides(slides.value)
}, { deep: true })

const makeSlideActive = (slide: Slide, goLive: boolean = false) => {
  activeSlide.value = slide

  if (goLive) {
    appStore.setActiveSlides(slides.value)
    appStore.setLiveSlide(activeSlide.value.id)
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
  const scripture = useScripture(data)
  if (scripture) {
    createNewBibleSlide(scripture)
  }
})

emitter.on("new-hymn", (data: string) => {
  const hymn = useHymn(data)
  if (hymn) {
    createNewHymnSlide(hymn)
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

const deleteSlide = (slideId: string) => {
  preSlideCreation()
  const tempSlide = appStore.activeSlides.find((s) => s.id === slideId)
  const slideIndex = slides.value.findIndex((s) => s.id === slideId)
  slides.value.splice(slideIndex, 1)
  toast.add({ title: `${tempSlide?.name} deleted`, icon: "i-bx-trash" })
}

const onUpdateSlide = (slide: Slide) => {
  makeSlideActive(slide)
  const slideIndex = slides.value?.findIndex(
    (slideInner: Slide) => slide.id === slideInner.id
  )
  slides.value?.splice(slideIndex || 0, 1, slide)

  updateLiveOutput(slide)
}

const createNewBibleSlide = (scripture: Scripture) => {
  const tempSlide = { ...preSlideCreation() }
  tempSlide.layout = slideLayoutTypes.bible
  tempSlide.type = slideTypes.bible
  tempSlide.title = scripture?.label

  // Calculate font-size of scripture content
  let fontSize = useScreenFontSize(scripture?.content)

  tempSlide.contents = [
    `<p class="scripture-content" style="font-size: ${fontSize}vw">${scripture?.content}</>`,
    `<p class="scripture-label"><b>${scripture?.label}</b> • ${scripture?.version
    }</p>`,
  ]

  slides.value?.push(tempSlide)
  makeSlideActive(tempSlide, true)
  toast.add({ title: "Bible slide created", icon: "i-bx-bible" })
}

const createNewHymnSlide = (hymn: Hymn) => {
  const tempSlide = { ...preSlideCreation() }
  tempSlide.layout = slideLayoutTypes.bible
  tempSlide.type = slideTypes.hymn
  tempSlide.hymnNumber = hymn.number
  tempSlide.title = 'Verse 1'

  const currentHymnVerse = hymn.verses?.[0].trim()

  // Calculate font-size of scripture content
  let fontSize = useScreenFontSize(currentHymnVerse)

  tempSlide.contents = [
    `<p class="song-content" style="font-size: ${fontSize}vw">${currentHymnVerse?.replaceAll('\n', '<br>')}</>`,
    `<p class="song-label"><b>${hymn.title}</b> • HYMN</p>`,
  ]

  slides.value?.push(tempSlide)
  makeSlideActive(tempSlide, true)
  toast.add({ title: "Hymn slide created", icon: "i-bx-church" })
}

const updateLiveOutput = (updatedSlide: Slide) => {
  appStore.setActiveSlides(slides.value || [])

  // If the current slide in the live output is being edited, then update LiveOutput immediately
  if (updatedSlide.id === appStore.liveSlideId) {
    appStore.setLiveSlide(updatedSlide.id)
  }
}

const nextAction = () => {
  switch (activeSlide.value?.type) {
    case slideTypes.bible:
      return nextScripture()
    case slideTypes.hymn:
      return nextVerse()
  }
}

const prevAction = () => {
  switch (activeSlide.value?.type) {
    case slideTypes.bible:
      return previousScripture()
    case slideTypes.hymn:
      return previousVerse()
  }
}

const nextScripture = () => {
  const tempSlide = { ...activeSlide.value }
  const slideIndex = slides.value.findIndex((s) => s.id === tempSlide.id)
  const scriptureSplitted = useScriptureLabel(tempSlide.title || '1:1:1')?.split(":")
  const nextVerse = Number(scriptureSplitted?.[2]) + 1
  const nextScriptureLabel = `${tempSlide.title?.slice(0, tempSlide.title.lastIndexOf(' '))} ${scriptureSplitted?.[1]}:${nextVerse}`
  const nextScriptureShortLabel = `${scriptureSplitted?.[0]}:${scriptureSplitted?.[1]}:${nextVerse}`

  const scripture = useScripture(nextScriptureShortLabel)

  // Set scripture content
  if (scripture) {
    tempSlide.title = nextScriptureLabel
    // Calculate font-size of scripture content
    let fontSize = useScreenFontSize(scripture?.content)
    tempSlide.contents = [
      `<p class="scripture-content" style="font-size: ${fontSize}vw">${scripture?.content}</>`,
      `<p class="scripture-label"><b>${scripture?.label}</b> • ${scripture?.version
      }</p>`,
    ]
    activeSlide.value = tempSlide as Slide
    slides.value.splice(slideIndex, 1, tempSlide as Slide)
    updateLiveOutput(activeSlide.value)
  }
}

const previousScripture = () => {
  const tempSlide = { ...activeSlide.value }
  const slideIndex = slides.value.findIndex((s) => s.id === tempSlide.id)
  const scriptureSplitted = useScriptureLabel(tempSlide.title || '1:1:1')?.split(":")
  const previousVerse = Number(scriptureSplitted?.[2]) - 1
  const previousScriptureLabel = `${tempSlide.title?.slice(0, tempSlide.title.lastIndexOf(' '))} ${scriptureSplitted?.[1]}:${previousVerse}`
  const previousScriptureShortLabel = `${scriptureSplitted?.[0]}:${scriptureSplitted?.[1]}:${previousVerse}`

  const scripture = useScripture(previousScriptureShortLabel)
  if (scripture) {
    tempSlide.title = previousScriptureLabel
    // Calculate font-size of scripture content
    let fontSize = useScreenFontSize(scripture?.content)
    tempSlide.contents = [
      `<p class="scripture-content" style="font-size: ${fontSize}vw">${scripture?.content}</>`,
      `<p class="scripture-label"><b>${scripture?.label}</b> • ${scripture?.version
      }</p>`,
    ]
    activeSlide.value = tempSlide as Slide
    slides.value.splice(slideIndex, 1, tempSlide as Slide)
    updateLiveOutput(activeSlide.value)
  }
}

const gotoScripture = (title: string) => {
  const tempSlide = { ...activeSlide.value } as Slide
  const slideIndex = slides.value.findIndex((s) => s.id === tempSlide.id)
  const scriptureSplitted = useScriptureLabel(title || '1:1:1')?.split(":")
  const scriptureLabel = `${title?.slice(0, title.lastIndexOf(' '))} ${scriptureSplitted?.[1]}:${scriptureSplitted?.[2]}`
  const scriptureShortLabel = `${scriptureSplitted?.[0]}:${scriptureSplitted?.[1]}:${scriptureSplitted?.[2]}`

  const scripture = useScripture(scriptureShortLabel)
  if (scripture) {
    // Calculate font-size of scripture content
    tempSlide.title = scriptureLabel
    let fontSize = useScreenFontSize(scripture?.content)
    tempSlide.contents = [
      `<p class="scripture-content" style="font-size: ${fontSize}vw">${scripture?.content}</>`,
      `<p class="scripture-label"><b>${scripture?.label}</b> • ${scripture?.version
      }</p>`,
    ]
    activeSlide.value = tempSlide
    slides.value.splice(slideIndex, 1, tempSlide)
    updateLiveOutput(activeSlide.value)
  }
}

const nextVerse = () => {
  const tempSlide = { ...activeSlide.value } as Slide
  const slideIndex = slides.value.findIndex((s) => s.id === tempSlide.id)
  const hymn = useHymn(tempSlide.hymnNumber as string)
  const realTitle = `Verse ${Number(tempSlide.title?.split(' ')?.[1]) - 1}` // fake title is the one with the 0th index, but that is what is displayed in UI

  if (hymn) {
    const hymnVerseIndex = Number(realTitle?.split(' ')?.[1]) + 1
    const nextVerse = hymn?.verses?.[hymnVerseIndex]?.trim()

    if (nextVerse) {
      tempSlide.title = `Verse ${Number(tempSlide.title?.split(' ')?.[1]) + 1}`
      // Calculate font-size of content
      let fontSize = useScreenFontSize(nextVerse)
      tempSlide.contents = [
        `<p class="song-content" style="font-size: ${fontSize}vw">${nextVerse?.replaceAll('\n', '<br>')}</>`,
        `<p class="song-label"><b>${hymn?.title}</b> • HYMN</p>`,
      ]
      activeSlide.value = tempSlide
      slides.value.splice(slideIndex, 1, tempSlide)
      updateLiveOutput(activeSlide.value)

    }
  }
}

const previousVerse = () => {
  const tempSlide = { ...activeSlide.value } as Slide
  const slideIndex = slides.value.findIndex((s) => s.id === tempSlide.id)
  const hymn = useHymn(tempSlide.hymnNumber as string)
  const realTitle = `Verse ${Number(tempSlide.title?.split(' ')?.[1]) - 1}` // fake title is the one with the 0th index, but that is what is displayed in UI

  if (hymn) {
    const hymnVerseIndex = Number(realTitle?.split(' ')?.[1]) - 1
    const nextVerse = hymn?.verses?.[hymnVerseIndex]?.trim()

    if (nextVerse) {
      tempSlide.title = `Verse ${Number(tempSlide.title?.split(' ')?.[1]) - 1}`
      // Calculate font-size of content
      let fontSize = useScreenFontSize(nextVerse)
      tempSlide.contents = [
        `<p class="song-content" style="font-size: ${fontSize}vw">${nextVerse?.replaceAll('\n', '<br>')}</>`,
        `<p class="song-label"><b>${hymn?.title}</b> • HYMN</p>`,
      ]
      activeSlide.value = tempSlide
      slides.value.splice(slideIndex, 1, tempSlide)
      updateLiveOutput(activeSlide.value)

    }
  }
}

const gotoChorus = (title: string) => {
  const tempSlide = { ...activeSlide.value } as Slide
  const slideIndex = slides.value.findIndex((s) => s.id === tempSlide.id)
  const hymn = useHymn(tempSlide.hymnNumber as string)

  const chorus = hymn?.chorus as string

  // Calculate font-size of scripture content
  let fontSize = useScreenFontSize(chorus)

  tempSlide.contents = [
    `<p class="song-content" style="font-size: ${fontSize}vw">${chorus?.replaceAll('\n', '<br>')}</>`,
    `<p class="song-label"><b>${hymn?.title}</b> • HYMN</p>`,
  ]
  activeSlide.value = tempSlide
  slides.value.splice(slideIndex, 1, tempSlide)
  updateLiveOutput(activeSlide.value)
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
