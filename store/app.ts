import { defineStore } from 'pinia'
import { Slide } from '~/types/index'
import { Emitter } from 'mitt'

// console.log(usePinia())

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      // activeSlides: [] as Array<Slide>,
      // activeSlide: null as Slide | null,
      liveOutputSlides: null as Array<Slide> | null,
      liveSlide: null as Slide | null,
      emitter: null as Emitter | null
    }
  },
  actions: {
    setLiveOutputSlides(slides: Array<Slide>) {
      this.liveOutputSlides = slides
    },
    setLiveSlide(slide: Slide) {
      this.liveSlide = slide
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