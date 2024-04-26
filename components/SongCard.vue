<template>
  <button
    class="action-card flex gap-3 p-2 py-4 border-t first:border-t-0 border-gray-100 dark:border-primary-950 hover:rounded-md hover:bg-primary-50 dark:hover:bg-primary-800 transition-all cursor-pointer text-left w-[100%]"
    @click="useGlobalEmit(`new-song`, { ...song, fromSaved: saved })">
    <IconWrapper name="i-bx-music" class="mt-1 text-primary" rounded-bg />
    <div class="texts">
      <h4 class="font-semibold">
        {{ song?.title || "" }}
      </h4>
      <p class="font-light text-xs mt-1">
        {{ song?.artist || song?.author || "" }}
      </p>
    </div>
  </button>
</template>
<script setup lang="ts">
import type { Hymn, Song } from "~/types"

const props = defineProps<{
  type: String
  saved: boolean
  song: Song | Hymn
}>()
</script>

<style scoped></style>
