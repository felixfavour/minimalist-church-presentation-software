<template>
  <div class="main relative h-[calc(100vh-390px-160px)]">
    <div
      class="toolbar w-[100%] p-2 px-4 bg-primary-100 rounded-md flex items-center justify-between overflow-hidden"
    >
      <TransitionGroup name="list">
        <div
          v-for="slide in slides"
          :key="slide?.name"
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
          v-if="slide?.type === slideTypes?.bible"
          class="button-group bg-primary-200 rounded-md mx-1 flex items-center gap-1"
        >
          <UTooltip text="Previous verse" :popper="{ arrow: true }">
            <UButton variant="ghost" icon="i-bx-chevron-left" />
          </UTooltip>
          <UInput
            placeholder="Bible verse"
            size="xs"
            variant="none"
            inputClass="bg-white border-0 shadow-none outline-none w-[16ch] text-center"
          />
          <UTooltip text="Next verse" :popper="{ arrow: true }">
            <UButton variant="ghost" icon="i-bx-chevron-right" />
          </UTooltip>
        </div>
        <div class="button-group bg-primary-200 rounded-md mx-1">
          <UTooltip text="Increase font size" :popper="{ arrow: true }">
            <UButton variant="ghost" icon="i-mdi-format-font-size-increase" />
          </UTooltip>
          <UTooltip text="Decrease font size" :popper="{ arrow: true }">
            <UButton variant="ghost" icon="i-mdi-format-font-size-decrease" />
          </UTooltip>
        </div>
        <UPopover v-model:open="layoutPopoverOpen">
          <UTooltip text="Switch slide layout" :popper="{ arrow: true }">
            <UButton variant="ghost" icon="i-mingcute-layout-3-line" />
          </UTooltip>
          <template #panel>
            <SlideLayoutSelection
              :value="selectedLayout"
              @select="
                (data) => {
                  selectedLayout = data
                  layoutPopoverOpen = false
                }
              "
            />
          </template>
        </UPopover>
        <div class="button-group bg-primary-200 rounded-md mx-1">
          <UTooltip text="Add background image" :popper="{ arrow: true }">
            <UButton variant="ghost" class="px-1.5" icon="i-bx-image-add" />
          </UTooltip>
          <UTooltip text="Add background video" :popper="{ arrow: true }">
            <UButton variant="ghost" class="px-1.5" icon="i-bx-film" />
          </UTooltip>
          <UTooltip text="Add background color" :popper="{ arrow: true }">
            <UButton
              variant="ghost"
              class="px-1.5"
              icon="i-mdi-square-rounded"
            />
          </UTooltip>
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <div
      v-if="!slide"
      class="h-[88%] mt-4 flex flex-col items-center justify-center gap-4 text-gray-500"
    >
      <IconWrapper name="i-bx-slideshow" size="14" />
      <h2 class="text-md font-semibold max-w-[150px] text-center">
        Select slide above to start editing
      </h2>
    </div>
    <Transition name="fade">
      <TipTap
        v-if="slide"
        @update="appStore.setActiveSlide($event)"
        :layout="selectedLayout"
      />
    </Transition>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app.ts"
const props = defineProps({
  slide: Object,
})

const appStore = useAppStore()
const selectedLayout = ref(slideLayoutTypes.heading_sub)
const layoutPopoverOpen = ref(false)

const slides = computed(() => {
  return [props.slide]
})
</script>

<style scoped></style>
