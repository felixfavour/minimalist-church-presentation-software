<template>
  <div
    class="main h-[100%] mt-4 flex flex-col items-center justify-center gap-4 live-content"
  >
    <div
      v-for="(content, index) in slide?.contents"
      :key="`content-${index}`"
      class="content"
    >
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from "~/types"

const props = defineProps<{
  slide: Slide
}>()

const emit = defineEmits(["slide-update", "update-live-output-slides"])

const layoutPopoverOpen = ref<boolean>(false)
const slideContents = ref<Array<string>>([])

const animatedSlides = computed(() => {
  return [props.slide]
})

const onSelectLayout = (data: string) => {
  layoutPopoverOpen.value = false
  const tempSlide: Slide = {
    ...props.slide,
    layout: data,
  }
  emit("slide-update", tempSlide)
}

const onUpdateSlideContent = (editorIndex: number, content: string) => {
  slideContents.value[editorIndex] = content
  const tempSlide: Slide = {
    ...props.slide,
    contents: [...slideContents.value],
  }
  emit("slide-update", tempSlide)
}
</script>

<style scoped></style>
