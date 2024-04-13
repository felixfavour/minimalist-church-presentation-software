<template>
  <AppSection heading="Live Output" class="max-w-[330px]">
    <div class="main">
      <div
        v-if="liveOutputSlides?.length === 0 || !liveOutputSlides"
        class="ctn h-[calc(100vh-80px-220px-80px)] overflow-auto mb-4 overflow-x-hidden"
      >
        <EmptyState
          icon="i-bx-slideshow"
          sub="No slides yet"
          action=""
          action-text=""
        />
      </div>
      <draggable
        v-show="!(liveOutputSlides?.length === 0 || !liveOutputSlides)"
        v-model="liveOutputSlides"
        group="slides"
        class="slides-ctn h-[calc(100vh-80px-220px-80px)] overflow-auto mb-4 overflow-x-hidden"
        item-key="name"
      >
        <!-- SLIDE CARD (DUPLICATED FROM THE SLIDECARD.VUE, TO MAKE DRAGGABLE WORK AS IT COULD NOT WORK IN COMPONENT) -->
        <template #item="{ element: slide }">
          <button
            class="group slide-card flex w-[100%] text-left gap-3 p-2 border-t first:border-t-0 border-gray-100 rounded-md hover:bg-primary-50 transition-all cursor-pointer relative"
            :class="{ 'bg-red-100': liveSlide?.id === slide?.id }"
            @click="appStore.setLiveSlide(slide?.id || '0')"
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
            <LiveSlideIndicator
              :visible="liveSlide?.id === slide?.id"
              class="mr-2 mt-4"
            />
            <!-- DELETE SLIDE BUTTON -->
            <div class="actions absolute bottom-2 right-2 flex gap-1">
              <ConfirmDialog
                button-icon="i-bx-trash"
                button-styles="px-1.5 text-primary-500 hover:bg-primary-white"
                header="Delete slide"
                label="Are you sure you want to delete this slide? This action is not reversible"
                @confirm="deleteSlide(slide?.id)"
              >
              </ConfirmDialog>
            </div>
          </button>
        </template>
      </draggable>
      <LiveProjectionOnly
        slide-label
        :slide="liveSlide"
        :full-screen="false"
        :slide-styles="settings.slideStyles"
        class="lg-preview"
      />
    </div>
  </AppSection>
</template>

<script setup lang="ts">
import draggable from "vuedraggable"
import { useAppStore } from "~/store/app"
import type { Slide } from "~/types"

const appStore = useAppStore()
const toast = useToast()
const { liveOutputSlidesId, liveSlideId, settings } = storeToRefs(appStore)

const liveSlide = computed(() => {
  return appStore.activeSlides.find((slide) => slide.id === liveSlideId.value)
})

const liveOutputSlides = computed({
  get() {
    const tempSlides = liveOutputSlidesId.value?.map((id) =>
      appStore.activeSlides.find((slide) => slide.id === id)
    ) as Slide[]
    return tempSlides
  },
  set(newVal) {
    appStore.setActiveSlides(newVal)
    toast.add({ icon: "i-bx-slideshow", title: "Slide order has been updated" })
  },
})

const deleteSlide = (slideId: string) => {
  const slides = appStore.activeSlides || []
  const tempSlide = appStore.activeSlides.find((s) => s.id === slideId)
  const slideIndex = slides.findIndex((s) => s.id === slideId)
  slides.splice(slideIndex, 1)
  appStore.setActiveSlides(slides)
  toast.add({ title: `${tempSlide?.name} deleted`, icon: "i-bx-trash" })
}
</script>
