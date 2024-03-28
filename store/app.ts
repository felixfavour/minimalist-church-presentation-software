import { defineStore } from 'pinia'
import { Slide, SlideStyle } from '~/types/index'
import type { Emitter } from 'mitt'

// console.log(usePinia())

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      activeSlides: [] as Array<Slide>,
      liveOutputSlidesId: null as Array<string> | null,
      liveSlideId: null as string | null,
      emitter: null as Emitter | null,
      slideStyles: { blur: 0.5, brightness: 50 } as SlideStyle
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
    },
    setSlideStyles(styles: SlideStyle) {
      this.slideStyles = styles
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