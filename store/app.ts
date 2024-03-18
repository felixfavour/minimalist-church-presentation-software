import { defineStore } from 'pinia'

// console.log(usePinia())

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      activeSlide: null
    }
  },
  actions: {
    setActiveSlide(slide: Object) {
      this.activeSlide = slide
    }
  },
  share: {
    enable: true,
    initialize: true
  }
}) 