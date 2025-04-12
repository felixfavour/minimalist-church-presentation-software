<template>
  <div>
    <!-- NDI Controls -->
    <div class="ndi-controls mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">NDI Output</h3>
        <USwitch v-model="isNdiEnabled" @change="toggleNdi" />
      </div>
      
      <div v-if="isNdiEnabled" class="mt-3">
        <UFormGroup label="NDI Source Name">
          <UInput v-model="ndiSourceName" placeholder="Church Presentation" />
        </UFormGroup>
        
        <div class="mt-3 flex justify-end">
          <UButton 
            :loading="isLoading" 
            :disabled="!ndiSourceName" 
            color="primary" 
            @click="startNdiOutput"
          >
            Start NDI Output
          </UButton>
        </div>
      </div>
      
      <div v-if="error" class="mt-3 text-red-500 text-sm">
        {{ error }}
      </div>
    </div>
    
    <!-- Original LiveProjection component -->
     <div ref="liveProjectionRef">
        <LiveProjectionOnly
          :full-screen="fullScreen || false"
          :full-screen-height="fullScreenHeight || ''"
          :content-visible="contentVisible || false"
          :slide="slide || {}"
          :slide-label="slideLabel || false"
          :slide-styles="slideStyles || {}"
          :audio-muted="audioMuted || false"
        />
     </div>
    
    <!-- Hidden canvas for NDI capture -->
    <canvas 
      ref="ndiCanvas" 
      class="hidden" 
      width="1920" 
      height="1080"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import html2canvas from 'html2canvas';
import type { Slide, SlideStyle } from '~/types'
import { useNDI } from '~/composables/useNDI'

const props = defineProps<{
  fullScreen?: boolean
  fullScreenHeight?: string
  contentVisible?: boolean
  slide?: Slide
  slideLabel?: boolean
  slideStyles?: SlideStyle
  audioMuted?: boolean
  id?: string
}>()

// References
const liveProjectionRef = ref(null)
const ndiCanvas = ref<HTMLCanvasElement | null>(null)
const ndiContext = ref<CanvasRenderingContext2D | null>(null)

// NDI state
const { 
  isNdiEnabled, 
  error, 
  isLoading, 
  toggleNdi 
} = useNDI()

const ndiSourceName = ref('Church Presentation')
const ndiOutputActive = ref(false)
const captureInterval = ref<number | null>(null)

// Start NDI output
const startNdiOutput = async () => {
  if (!ndiSourceName.value) return
  
  try {
    isLoading.value = true
    
    // In a real implementation, this would use the Tauri API to call our Rust functions
    if (window.__TAURI__) {
      try {
        // Start NDI output using Tauri
        await window.__TAURI__.invoke('start_ndi_output', { 
          sourceName: ndiSourceName.value 
        })
        
        // Start the capture loop
        startCaptureLoop()
        
        ndiOutputActive.value = true
      } catch (err) {
        console.error('Tauri NDI error:', err)
        error.value = 'Failed to start NDI output via Tauri'
      }
    } else {
      // Fallback for web-only mode (no NDI support)
      console.log('NDI output would start here (web-only mode)')
      startCaptureLoop()
      ndiOutputActive.value = true
    }
    
    isLoading.value = false
  } catch (err) {
    console.error('Failed to start NDI output:', err)
    error.value = 'Failed to start NDI output'
    isLoading.value = false
  }
}

// Stop NDI output
const stopNdiOutput = () => {
  if (captureInterval.value) {
    window.clearInterval(captureInterval.value)
    captureInterval.value = null
  }
  
  if (window.__TAURI__) {
    try {
      // Stop NDI output using Tauri
      window.__TAURI__.invoke('stop_ndi_output')
    } catch (err) {
      console.error('Tauri NDI stop error:', err)
    }
  }
  
  ndiOutputActive.value = false
}

// Capture the LiveProjection component to a canvas
const captureToCanvas = () => {
  if (!liveProjectionRef.value || !ndiCanvas.value || !ndiContext.value) return
  
  try {
    // In a real implementation, this would:
    // 1. Use html2canvas or similar to capture the LiveProjection component
    html2canvas(liveProjectionRef.value, {
      useCORS: true,
      allowTaint: true
    }).then(capturedCanvas => {
      ndiContext.value?.drawImage(capturedCanvas, 0, 0)
    })
      
    // 3. Send the canvas data to the NDI service via Tauri
    
    if (ndiOutputActive.value) {
      // For demonstration, we'll just log that a frame would be captured
      console.log('NDI: Frame captured for', ndiSourceName.value)
      
      // In a real implementation with Tauri:
      // 1. Get the canvas data as base64
      const imageData = ndiCanvas.value.toDataURL('image/jpeg', 0.9)

      // Download image data
      // const link = document.createElement('a')
      // link.href = imageData
      // link.download = 'ndi_frame.jpg'
      // link.click()

      // // 2. Send it to Rust via Tauri
      console.log('window.__TAURI__', window.__TAURI__)
      if (window.__TAURI__) {
        window.__TAURI__.invoke('send_frame_to_ndi', { 
          frameData: imageData 
        })
      }
    }
  } catch (err) {
    console.error('Error capturing frame for NDI:', err)
  }
}

// Start the capture loop for NDI
const startCaptureLoop = () => {
  // // Capture at 30fps (approximately)
  // captureInterval.value = window.setInterval(captureToCanvas, 33)

  // Capture at 0.5fps (approximately)
  captureInterval.value = window.setInterval(captureToCanvas, 5000)
}

// Initialize canvas context
onMounted(() => {
  if (ndiCanvas.value) {
    ndiContext.value = ndiCanvas.value.getContext('2d')
  }
})

// Clean up on unmount
onUnmounted(() => {
  stopNdiOutput()
})

// Watch for NDI enabled state changes
watch(isNdiEnabled, (newValue) => {
  if (!newValue) {
    stopNdiOutput()
  }
})

// Add TypeScript interface for Tauri
declare global {
  interface Window {
    __TAURI__?: {
      invoke: (cmd: string, args?: any) => Promise<any>
    }
  }
}
</script>

<style scoped>
.hidden {
  position: absolute;
  left: -9999px;
  top: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
