<template>
  <!-- GRID TYPE CARD -->
  <div
    v-if="gridType"
    class="slide-card gap-3 h-[120px] rounded-md bg-primary hover:bg-primary-700 transition-all cursor-pointer relative overflow-hidden"
    :class="[selected ? 'border-black' : 'border-transparent']"
  >
    <button class=" " @click="$emit('click')">
      <div class="slide-preview text-white overflow-hidden md-preview">
        <LiveContentWithBackground
          :slide="slide"
          :slide-styles="settings.slideStyles"
        />
      </div>
      <div
        class="overlay-gradient absolute inset-0"
        :class="{ 'border-4 border-primary': selected }"
      ></div>
      <div
        class="texts flex items-center gap-2 text-white absolute top-1 right-2 left-2"
      >
        <h4 class="font-medium ws-nowrap mt-1 text-left text-xs">
          {{ slide?.name }}
        </h4>
        <SlideChip :slide-type="slide?.type" class="mt-1" dark-mode />
      </div>
    </button>

    <!-- DELETE AND DUPLICATE SLIDE BUTTON -->
    <div class="actions absolute bottom-2 right-2 flex gap-1">
      <UTooltip v-if="slide.type === slideTypes.text" text="Duplicate Slide">
        <UButton
          icon="i-bx-copy"
          size="xs"
          variant="ghost"
          class="px-1.5 text-white hover:bg-primary-500"
          @click.stop.prevent="$emit('duplicate')"
        >
        </UButton>
      </UTooltip>

      <ConfirmDialog
        button-icon="i-bx-trash"
        header="Delete slide"
        button-styles="px-1.5 text-white hover:bg-primary"
        label="Are you sure you want to delete this slide? This action is not reversible"
        @confirm="$emit('delete', slide?.id)"
      >
      </ConfirmDialog>
    </div>
  </div>

  <!-- LIST TYPE CARD -->
  <button
    v-else
    class="group slide-card flex w-[100%] text-left gap-3 p-2 border-t first:border-t-0 border-gray-100 dark:border-primary-950 rounded-md hover:bg-primary-50 transition-all cursor-pointer relative"
    :class="{ 'bg-red-100': live }"
    @click="$emit('click')"
  >
    <div
      class="slide-preview w-24 min-w-24 h-16 text-white overflow-hidden sm-preview relative"
    >
      <LiveContentWithBackground
        :slide="slide"
        :slide-styles="settings.slideStyles"
      />
    </div>
    <div class="texts flex-col justify-between">
      <h4 class="font-medium mt-2">{{ slide?.name }}</h4>
      <SlideChip :slide-type="slide?.type" class="mt-1" />
    </div>
    <LiveSlideIndicator :visible="live" class="mr-2 mt-4" />
    <!-- DELETE SLIDE BUTTON -->
    <div class="actions absolute bottom-2 right-2 flex gap-1">
      <ConfirmDialog
        button-icon="i-bx-trash"
        button-styles="px-1.5 text-primary-500 hover:bg-primary-white"
        header="Delete slide"
        label="Are you sure you want to delete this slide? This action is not reversible"
        @confirm="$emit('delete', slide?.id)"
      >
      </ConfirmDialog>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Slide } from "~/types"
import { useAppStore } from "~/store/app"

const appStore = useAppStore()
const { settings } = storeToRefs(appStore)

const props = defineProps<{
  slide: Slide
  live: boolean
  gridType: boolean
  selected: boolean
}>()
</script>

<style scoped>
.slide-card .actions {
  visibility: hidden;
  opacity: 0;
  transform: translateX(10px);
  transition: 0.3s;
}
.slide-card:hover .actions {
  visibility: visible;
  opacity: 1;
  transform: translateX(0);
}
</style>
