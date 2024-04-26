<template>
  <button
    class="group slide-card flex w-[100%] text-left gap-3 p-2 border-t first:border-t-0 border-gray-100 dark:border-primary-950 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900 transition-all cursor-pointer relative"
    :id="slide?.id"
    @click="useGlobalEmit(`new-${slide?.type}`, (slide?.type === slideTypes.media ? { ...slide?.data, fromSaved: true } : { ...slide, fromSaved: true }))">
    <div class="slide-preview w-24 min-w-24 h-16 text-white overflow-hidden sm-preview relative">
      <LiveContentWithBackground :slide="slide" :slide-styles="settings.slideStyles" />
    </div>
    <div class="texts flex-col justify-between">
      <h4 class="font-medium mt-2">{{ slide?.name }}</h4>
      <SlideChip :slide-type="slide?.type" class="mt-1" />
    </div>
    <!-- DELETE SLIDE BUTTON -->
    <div class="actions absolute bottom-2 right-2 flex gap-1">
      <!-- <UTooltip text="Preview/Edit Slide" :popper="{ placement: 'top' }">
        <UButton icon="i-bx-edit" size="xs" variant="ghost" class="px-1 text-primary-500 hover:bg-primary-white"
          @click.stop.prevent="useGlobalEmit('new-active-slide', slide)" />
      </UTooltip> -->
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

.slide-card.selectable .actions {
  display: none;
}
</style>
