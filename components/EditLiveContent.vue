<template>
  <div class="main relative min-h-[400px] h-[45vh]">
    <div>
      <div
        class="toolbar w-[100%] p-2 px-4 bg-primary-100 rounded-t-md flex items-center justify-between overflow-hidden"
      >
        <TransitionGroup name="list">
          <div
            v-for="slide in animatedSlides"
            :key="slide?.id"
            class="slide-name flex items-center gap-2 top-1 text-primary-900"
          >
            <h4 class="font-medium ws-nowrap">{{ slide?.name }}</h4>
            <SlideChip
              :slide-type="slide?.type"
              class="text-primary-900 bg-primary text-white"
            />
          </div>
        </TransitionGroup>
        <div class="actions flex items-center">
          <div
            v-if="
              slide?.type === slideTypes?.bible ||
              slide?.type === slideTypes?.hymn ||
              slide?.type === slideTypes?.lyrics
            "
            class="button-group bg-primary-200 rounded-md mx-1 flex items-center gap-1 h-[36px] px-1"
          >
            <UTooltip text="Previous verse" :popper="{ arrow: true }">
              <UButton
                variant="ghost"
                class="p-1"
                icon="i-bx-chevron-left"
                @click="$emit('previous-verse')"
              />
            </UTooltip>
            <UInput
              placeholder="Verse"
              size="xs"
              variant="none"
              v-model="verse"
              inputClass="bg-white border-0 shadow-none outline-none w-[16ch] text-center"
              @keydown.enter="$emit('goto-verse', verse)"
            />
            <UTooltip text="Next verse" :popper="{ arrow: true }">
              <UButton
                variant="ghost"
                class="p-1"
                icon="i-bx-chevron-right"
                @click="$emit('next-verse')"
              />
            </UTooltip>
            <UButton
              v-if="slide?.type === slideTypes?.hymn"
              class="rounded-md"
              size="xs"
              @click="$emit('goto-chorus', verse)"
            >
              Chorus
            </UButton>
          </div>
          <!-- <div class="button-group bg-primary-200 rounded-md mx-1">
            <UTooltip text="Increase font size" :popper="{ arrow: true }">
              <UButton variant="ghost" icon="i-mdi-format-font-size-increase" />
            </UTooltip>
            <UTooltip text="Decrease font size" :popper="{ arrow: true }">
              <UButton variant="ghost" icon="i-mdi-format-font-size-decrease" />
            </UTooltip>
          </div> -->
          <UPopover
            v-if="slide?.layout !== slideLayoutTypes.bible"
            v-model:open="layoutPopoverOpen"
          >
            <UTooltip text="Switch slide layout" :popper="{ arrow: true }">
              <UButton
                variant="ghost"
                icon="i-mingcute-layout-3-line"
                :disabled="!slide"
              />
            </UTooltip>
            <template #panel>
              <SlideLayoutSelection
                :value="slide?.layout"
                @select="onSelectLayout"
              />
            </template>
          </UPopover>
          <div
            class="button-group flex rounded-md mx-1 p-1"
            :class="{
              'bg-primary-200': slide?.layout !== slideLayoutTypes.bible,
            }"
          >
            <UPopover v-model:open="bgEditBgPopoverOpen">
              <UTooltip text="Style background" :popper="{ arrow: true }">
                <UButton
                  variant="ghost"
                  class="px-1.5"
                  icon="i-bx-slider"
                  :disabled="!slide"
                />
              </UTooltip>
              <template #panel>
                <BgStyle />
              </template>
            </UPopover>
            <UPopover v-model:open="bgImagePopoverOpen">
              <UTooltip text="Add background image" :popper="{ arrow: true }">
                <UButton
                  variant="ghost"
                  class="px-1.5"
                  icon="i-bx-image-add"
                  :disabled="!slide"
                />
              </UTooltip>
              <template #panel>
                <BgImageSelection
                  :value="slide?.background"
                  @select="onSelectBackground(backgroundTypes.image, $event)"
                />
              </template>
            </UPopover>
            <UPopover v-model:open="bgVideoPopoverOpen">
              <UTooltip text="Add background video" :popper="{ arrow: true }">
                <UButton
                  variant="ghost"
                  class="px-1.5"
                  icon="i-bx-film"
                  :disabled="!slide"
                />
              </UTooltip>
              <template #panel>
                <BgVideoSelection
                  :value="slide?.background"
                  @select="onSelectBackground(backgroundTypes.video, $event)"
                />
              </template>
            </UPopover>
            <UPopover v-model:open="bgColorPopoverOpen">
              <UTooltip text="Add background color" :popper="{ arrow: true }">
                <UButton
                  variant="ghost"
                  class="px-1.5"
                  icon="i-mdi-square-rounded"
                  :disabled="!slide"
                />
              </UTooltip>
              <template #panel>
                <BgColorSelection
                  :value="slide?.background"
                  @select="onSelectBackground(backgroundTypes.solid, $event)"
                />
              </template>
            </UPopover>
          </div>
          <!-- <UButton
          class="px-2 pr-3 ml-1 text-xs"
          icon="i-bx-play-circle"
          @click="$emit('update-live-output-slides')"
          >Promote to Live</UButton
        > -->
        </div>
      </div>
      <TipTapToolbar :editor="focusedEditor" />
    </div>

    <!-- MAIN CONTENT -->
    <EmptyState
      v-if="!slide"
      icon="i-bx-slideshow"
      sub="Select slide above to start editing"
      action=""
      action-text=""
    />
    <div
      v-else
      class="h-[100%] relative text-white bg-primary-900 bg-cover bg-no-repeat transition-all rounded-b-md overflow-hidden"
      :style="useSlideBackground(slide)"
    >
      <!-- VIDEO BACKGROUND -->
      <video
        v-if="slide?.backgroundType === backgroundTypes.video"
        :src="slide?.background"
        class="h-[100%] w-[100%] object-cover absolute inset-0"
      ></video>
      <div class="bg-black opacity-30 absolute inset-0"></div>
      <TipTap
        v-if="slide"
        :slide="slide"
        @update="onUpdateSlideContent"
        @change-focused-editor="focusedEditor = $event"
        :layout="slide?.layout"
        editable
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Editor } from "@tiptap/core"
import type { Slide } from "~/types"

const props = defineProps<{
  slide: Slide
}>()

const focusedEditor = ref<Editor | undefined>()

const emit = defineEmits(["slide-update", "update-live-output-slides"])

const layoutPopoverOpen = ref<boolean>(false)
const bgEditBgPopoverOpen = ref<boolean>(false)
const bgImagePopoverOpen = ref<boolean>(false)
const bgVideoPopoverOpen = ref<boolean>(false)
const bgColorPopoverOpen = ref<boolean>(false)
const slideContents = ref<Array<string>>([])
const verse = ref<string | undefined>(props.slide?.title)

const animatedSlides = computed(() => {
  if (props.slide) {
    return [props.slide]
  }
  return null
})

watch(
  () => props.slide,
  () => {
    // Update slide title when Slide is updated
    verse.value = props.slide?.title

    // Remove toolbar when Slide is updated, if slide.type is not text
    if (props.slide?.type !== slideTypes.text) {
      focusedEditor.value = undefined
    }
  },
  { immediate: true }
)

const onSelectLayout = (data: string) => {
  layoutPopoverOpen.value = false
  const tempSlide: Slide = {
    ...props.slide,
    layout: data,
  }
  emit("slide-update", tempSlide)
}

const onSelectBackground = (backgroundType: string, data: string) => {
  bgImagePopoverOpen.value = false
  bgVideoPopoverOpen.value = false
  bgColorPopoverOpen.value = false

  const tempSlide: Slide = {
    ...props.slide,
    background: data,
    backgroundType,
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
  // emit("update-live-output-slides")
}
</script>

<style scoped></style>
