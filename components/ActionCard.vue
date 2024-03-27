<template>
  <button
    class="action-card flex gap-3 p-2 py-4 border-t first:border-t-0 border-gray-100 hover:rounded-md hover:bg-primary-50 transition-all cursor-pointer text-left w-[100%]"
    :class="{ 'pointer-events-none opacity-30': action?.unreleased }"
    @click="useGlobalEmit(action?.action, emitParameter)"
  >
    <IconWrapper :name="action?.icon" class="mt-1 text-primary" rounded-bg />
    <div class="texts">
      <h4 class="font-semibold">
        {{ action.name || '' }} {{ action.bibleChapterAndVerse || '' }}
      </h4>
      <p class="font-light text-xs mt-1">{{ action.desc || '' }}</p>
    </div>
  </button>
</template>
<script setup lang="ts">
import type {QuickAction} from "~/types"

const props = defineProps<{
  action: QuickAction
}>()

const emitParameter = computed(() => {
  if (props.action.action === "new-bible") {
    return `${props.action?.bibleBookIndex}:${
      props.action?.bibleChapterAndVerse || "1:1"
    }`
  }
  return ""
})
</script>

<style scoped></style>
