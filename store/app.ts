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
      bibleVersions: ['KJV', 'NKJV', 'NIV'] as Array<string>,
      settings: {
        defaultBibleVersion: 'KJV',
        defaultBackground: {
          hymn: {
            backgroundType: "video",
            background: '/large_assets/video-bg-3.mp4'
          },
          bible: {
            backgroundType: "image",
            background: 'https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=1740'
          },
          text: {
            backgroundType: "image",
            background: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1740'
          }
        },
      },
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
    },
    setBibleVersions(styles: SlideStyle) {
      this.slideStyles = styles
    },
    setDefaultBibleVersion(version: string) {
      this.settings = { ...this.settings, defaultBibleVersion: version }
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