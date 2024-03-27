import { defineStore } from 'pinia'
import { Slide } from '~/types/index'
import type { Emitter } from 'mitt'

// console.log(usePinia())

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      activeSlides: [] as Array<Slide>,
      // activeSlideId: null as string | null,
      liveOutputSlidesId: null as Array<string> | null,
      liveSlideId: null as string | null,
      emitter: null as Emitter | null
    }
  },
  actions: {
    setActiveSlides(slides: Array<Slide>) {
      this.activeSlides = slides
      this.liveOutputSlidesId = slides?.map(slide => slide.id)
    },
    // setActiveSlideId(slideId: string) {
    //   this.activeSlideId = slideId
    // },
    setLiveOutputSlidesId(slides: Array<string>) {
      this.liveOutputSlidesId = slides
    },
    setLiveSlide(slide: string) {
      this.liveSlideId = slide
    },
    setEmitter(emitter: Emitter) {
      this.emitter = emitter
    }
  },
  persist: {
    storage: persistedState.localStorage
  },
  share: {
    enable: true,
    initialize: true
  }
}) 