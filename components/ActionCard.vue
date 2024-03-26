<template>
  <button
    class="action-card flex gap-3 p-2 py-4 border-t first:border-t-0 border-gray-100 hover:rounded-md hover:bg-primary-50 transition-all cursor-pointer text-left w-[100%]"
    @click="
      useGlobalEmit(
        action?.action,
        `${action?.bibleBookIndex}:${action?.bibleChapterAndVerse}`
      )
    "
  >
    <IconWrapper :name="action?.icon" class="mt-1 text-primary" rounded-bg />
    <div class="texts">
      <h4 class="font-semibold">
        {{ action?.name }} {{ action?.bibleChapterAndVerse }}
      </h4>
      <p class="font-light text-xs mt-1">{{ action.desc }}</p>
    </div>
  </button>
</template>

<script setup>
// import { QuickAction } from "~/types"

const props = defineProps({
  action: Object,
})
</script>

<style scoped></style>
