<template>
  <div
    class="verse-preview absolute bg-primary-100 dark:bg-primary-800 right-0 left-0 top-12 z-20 py-2 overflow-auto shadow-lg rounded-b-md"
  >
    <!-- <div class="border border-primary"></div> -->
    <UButton
      block
      variant="ghost"
      v-show="verseTemp.trim()"
      v-for="(verseTemp, index) in slide?.type === slideTypes.bible
        ? nearBibleVerses
        : relatedData?.verses"
      :key="`verse-${index}`"
      class="item rounded-none flex px-4 py-3 justify-start border-t border-primary-200 dark:border-primary-950 hover:bg-primary-300 dark:hover:bg-primary-900 cursor-pointer w-[100%] text-left items-start font-normal text-black dark:text-white"
      :class="{
        'bg-primary-300 dark:bg-primary-900': `Verse ${index + 1}` === verse,
      }"
      @click="$emit('goto-verse', `Verse ${index + 1}`)"
    >
      <div class="flex-initial min-w-20 text-xs font-semibold">
        {{
          slide?.type === slideTypes.bible ? verseTemp : `Verse ${index + 1}`
        }}
      </div>
      <div class="flex-initial w-[100%] text-xs">
        {{
          slide?.type === slideTypes.bible
            ? useScripture(useScriptureLabel(verseTemp))?.content
            : verseTemp
        }}
      </div>
    </UButton>
  </div>
</template>
<script setup lang="ts">
import type { Slide } from "~/types"

const props = defineProps<{
  slide: Slide
  verse: string
}>()

// Return connected Hymn / Song object related
const relatedData = computed(() => {
  switch (props.slide?.type) {
    case slideTypes.hymn:
      const hymn = useHymn(props.slide?.songId)
      return hymn
    case slideTypes.song:
      const song = useSong(props.slide?.data, 4)
      return song
  }
  return {}
})

// Return bible verses in proximity to currentVerse
const nearBibleVerses = computed(() => {
  if (props.slide?.type === slideTypes.bible) {
    const verseLineup = []
    // const currentChapter = Number(verse.value?.split(":")?.[0]?.at(-1))
    const currentVerse = Number(props.verse?.split(":")?.[1])

    for (let i = 0; i < 3; i++) {
      let prevVerse: string | number = currentVerse - i
      if (prevVerse > 0) {
        prevVerse = `${props.verse?.split(":")?.[0]}:${
          prevVerse < 1 ? 1 : prevVerse
        }`
        verseLineup.push(prevVerse)
      }
    }
    for (let i = 1; i < 3; i++) {
      let nextVerse: string | number = currentVerse + i
      if (nextVerse > 0) {
        nextVerse = `${props.verse?.split(":")?.[0]}:${nextVerse}`
        verseLineup.push(nextVerse)
      }
    }
    verseLineup.sort()
    return verseLineup
  }
  return []
})
</script>
