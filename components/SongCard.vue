<template>
  <button
    class="action-card flex gap-3 p-2 py-4 border-t first:border-t-0 border-gray-100 hover:rounded-md hover:bg-primary-50 transition-all cursor-pointer text-left w-[100%]"
    @click="useGlobalEmit('new-lyrics', song.id)"
  >
    <IconWrapper name="i-bx-music" class="mt-1 text-primary" rounded-bg />
    <div class="texts">
      <h4 class="font-semibold">
        {{ song.title || "" }}
      </h4>
      <p class="font-light text-xs mt-1">{{ song?.artist || "" }}</p>
    </div>
  </button>
</template>
<script setup lang="ts">
import type { Song } from "~/types"

const props = defineProps<{
  song: Song
}>()
</script>

<style scoped></style>
