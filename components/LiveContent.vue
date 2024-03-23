<template>
  <div class="live-content tiptap border-none h-[100%]">
    <div
      v-if="slide?.layout === slideLayoutTypes.heading_sub"
      class="flex flex-col gap-2 h-[88%] justify-center px-12"
    >
      <div class="content" v-html="slide?.contents?.[0]"></div>
      <div class="content" v-html="slide?.contents?.[1]"></div>
    </div>
    <div
      v-else-if="slide?.layout === slideLayoutTypes.full_text"
      class="flex flex-col gap-2 h-[88%] justify-center px-12"
    >
      <div class="content" v-html="slide?.contents?.[1]"></div>
    </div>
    <div v-else class="grid grid-cols-2 gap-4 h-[88%] items-center px-12">
      <div
        class="content border-r border-gray-100 pr-8"
        v-html="slide?.contents?.[1]"
      ></div>
      <div class="content pl-8" v-html="slide?.contents?.[2]"></div>
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
