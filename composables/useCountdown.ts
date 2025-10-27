import { ref } from 'vue'
import type { Slide, Countdown } from '~/types'
import useTimeStringToMilli from './useTimeStringToMilli'
import useMilliToTimeString from './useMilliToTimeString'
import useSlideContent from './useSlideContent'

export default function useCountdown() {
  const { updateLiveOutput } = useSlides()
  const activeCountdownInterval = ref<boolean>(false)
  const countdownTimeLeft = ref<number>(0)
  const countdownStartTime = ref<number>(0)
  const countdownDuration = ref<number>(0)
  const countdownRAF = ref<number>(0)

  const updateCountdownSlide = (
    slide: Slide,
    timeRemaining: number,
    isPlaying: boolean = true
  ): Slide => {
    const tempSlide = { ...slide }
    tempSlide.data = {
      ...tempSlide.data,
      timeLeft: useMilliToTimeString(timeRemaining),
    } as Countdown
    tempSlide.slideStyle = {
      ...tempSlide.slideStyle,
      isMediaPlaying: isPlaying,
    }
    tempSlide.contents = useSlideContent(tempSlide, tempSlide?.data!!)
    console.log('updating', tempSlide.contents)
    updateLiveOutput(tempSlide)
    return tempSlide
  }

  const clearCountdown = () => {
    if (countdownRAF.value) {
      cancelAnimationFrame(countdownRAF.value)
    }
    activeCountdownInterval.value = false
    countdownTimeLeft.value = 0
  }

  const startCountdown = (slide: Slide, restartCountdown: boolean = false) => {
    const countdown = slide?.data as Countdown
    if (countdown?.time) {
      const duration = useTimeStringToMilli(
        restartCountdown
          ? (slide.data as Countdown)?.time
          : (slide.data as Countdown)?.timeLeft
      )

      if (!activeCountdownInterval.value || restartCountdown) {
        // Stop any existing animation
        if (countdownRAF.value) {
          cancelAnimationFrame(countdownRAF.value)
        }

        // Reset or initialize countdown state
        if (restartCountdown) {
          countdownTimeLeft.value = duration
          countdownDuration.value = duration
        } else {
          countdownTimeLeft.value = countdownTimeLeft.value === 0 ? duration : countdownTimeLeft.value
          countdownDuration.value = duration
        }

        // Record start time
        countdownStartTime.value = performance.now()
        const startTimeLeft = countdownTimeLeft.value

        // Animation function
        const animate = (currentTime: number) => {
          const elapsed = currentTime - countdownStartTime.value
          const remaining = Math.max(0, startTimeLeft - elapsed)

          // Update only when we cross a second boundary to maintain the same visual update rate
          if (Math.floor(remaining / 1000) !== Math.floor(countdownTimeLeft.value / 1000)) {
            countdownTimeLeft.value = remaining
            updateCountdownSlide(slide, remaining)
          }

          if (remaining > 0) {
            countdownRAF.value = requestAnimationFrame(animate)
            activeCountdownInterval.value = true
          } else {
            countdownTimeLeft.value = 0
            const updatedSlide = updateCountdownSlide(slide, 0, false)
            activeCountdownInterval.value = false
            return updatedSlide
          }
        }

        // Start the animation
        countdownRAF.value = requestAnimationFrame(animate)
        activeCountdownInterval.value = true
        return updateCountdownSlide(slide, duration, true)
      } else {
        // Pause the countdown
        cancelAnimationFrame(countdownRAF.value)
        activeCountdownInterval.value = false
        return updateCountdownSlide(slide, countdownTimeLeft.value, false)
      }
    }
  }

  return {
    startCountdown,
    updateCountdownSlide,
    clearCountdown,
    countdownTimeLeft
  }
}
