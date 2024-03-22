import { defineStore } from 'pinia'
import { Slide } from '~/types/index'

// console.log(usePinia())

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      liveOutputSlides: [] as Array<Slide>,
      liveSlide: null as Slide | null
    }
  },
  actions: {
    setLiveOutputSlides(slides: Array<Slide>) {
      this.liveOutputSlides = slides
    },
    setLiveSlide(slide: Slide) {
      this.liveSlide = slide
    }
  },
  share: {
    enable: true,
    initialize: true
  }
}) 