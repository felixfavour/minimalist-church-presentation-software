<template #default="{ defaultProps }">
  <div class="flex mt-4 gap-2 px-4">
    <QuickActions />
    <PreviewContent />
    <LiveOutput />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "app",
})
useHead({
  link: [
    {
      rel: "manifest",
      href: "/live-manifest.json",
    },
  ],
})
import { useAppStore } from "~/store/app"
import { ref } from "vue"
import { useDebounceFn, useOnline } from "@vueuse/core"
import type { Emitter } from "mitt"
import type { Slide } from "~/types"

const appStore = useAppStore()
const emitter = useNuxtApp().$emitter as Emitter<any>
const socket = ref<WebSocket>()
const MAX_RETRIES = 10
let retryCount = 0

const uploadOfflineSlides = useDebounceFn(() => {
  useGlobalEmit(appWideActions.uploadOfflineSlides)
}, 2000)

const connectWebSocket = async () => {
  const nuxtApp = useNuxtApp()
  socket.value = await useSocket(
    appStore.currentState.activeSchedule?._id || ""
  )
  if (!nuxtApp.$socket) {
    nuxtApp.provide("socket", socket.value)
  }

  socket.value.onopen = (event) => {
    retryCount = 0
    console.log("websocket connection opened")
  }

  socket.value.onmessage = (event) => {
    const { data, action, message } = JSON.parse(event.data)
    // console.log(data)

    switch (data.action) {
      case "live-slide":
        break
      case "new-slide":
        break
      case "update-slide":
        break
      default:
      // DO SOMETHING
      // console.log("Unknown action:", data.action)
    }
  }

  socket.value.onclose = async () => {
    console.log("websocket connection closed")
    const online = useOnline()
    // if (retryCount < MAX_RETRIES && online.value) {
    if (retryCount < MAX_RETRIES) {
      retryCount++
      const retryDelay = retryCount * 3000
      console.log(`Reconnecting in ${retryDelay / 1000} seconds...`)
      setTimeout(connectWebSocket, retryDelay)
    } else {
      console.error("Max reconnect attempts reached. Unable to reconnect.")
    }
  }

  socket.value.onerror = (error) => {
    console.error("WebSocket connection error:", error)
    socket.value?.close() // Close on error to trigger the onclose event
  }
}

const sendLiveSlideToWebsocket = (slide: Slide) => {
  if (
    socket.value?.readyState === WebSocket.CLOSED ||
    socket.value?.readyState === WebSocket.CLOSING
  ) {
    console.error("Error sending live slide to websocket", "WebSocket closed")
    socket.value.close() // Close on error to trigger the onclose event
    connectWebSocket()
  } else {
    socket.value?.send(
      JSON.stringify({
        action: "live-slide",
        data: slide,
      })
    )
  }
}

watch(
  () => appStore.currentState.liveSlideId,
  (liveSlideId) => {
    const liveSlide = appStore.currentState.activeSlides.find(
      (slide) => slide.id === liveSlideId
    )
    if (liveSlide) {
      sendLiveSlideToWebsocket(liveSlide)
    }
  },
  { deep: true }
)

onMounted(async () => {
  const emailChange = useRoute().query.email_change

  // console.log("emailChange", emailChange)
  if (emailChange) {
    setTimeout(() => {
      useGlobalEmit(appWideActions.openSettings, "Profile Settings")
    }, 1000)
  }

  // APP-WIDE SHORTCUTS
  useCreateShortcut("/", () => useGlobalEmit(appWideActions.quickActionsFocus))

  // Prevent default action on specific keys
  document.addEventListener("keydown", function (event) {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === "y" || event.key === "Y" || event.key === "?")
    ) {
      event.preventDefault()
    }
  })

  useCreateShortcut(
    "z",
    () => {
      appStore.undo()
      uploadOfflineSlides()
    },
    { ctrlOrMeta: true }
  )

  useCreateShortcut(
    "y",
    () => {
      appStore.redo()
      uploadOfflineSlides()
    },
    {
      ctrlOrMeta: true,
    }
  )

  useCreateShortcut(
    "p",
    () => {
      useGlobalEmit("promote-active-slide-live")
    },
    {
      ctrlOrMeta: true,
    }
  )

  useCreateShortcut(
    "h",
    () => {
      useGlobalEmit("open-shortcuts")
    },
    {
      ctrlOrMeta: true,
    }
  )

  useCreateShortcut(
    ",",
    () => {
      useGlobalEmit("open-settings")
    },
    {
      ctrlOrMeta: true,
    }
  )

  // Connect to websocket
  if (appStore.currentState.activeSchedule) {
    connectWebSocket()
  }
})

emitter.on("refresh-slides", () => {
  if (
    socket.value?.readyState === WebSocket.CLOSED ||
    socket.value?.readyState === WebSocket.CLOSING
  ) {
    connectWebSocket()
  }
})
</script>
