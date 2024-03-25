import { defineStore } from 'pinia'
import { Slide } from '~/types/index'

// console.log(usePinia())

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      liveOutputSlides: null as Array<Slide> | null,
      liveSlide: null as Slide | null,
      emitter: null as Object | null
    }
  },
  actions: {
    setLiveOutputSlides(slides: Array<Slide>) {
      this.liveOutputSlides = slides
    },
    setLiveSlide(slide: Slide) {
      this.liveSlide = slide
    },
    setEmitter(emitter: Object) {
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