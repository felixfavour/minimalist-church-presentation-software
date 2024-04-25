<template>
  <div class="personal-library-main min-h-[90vh]" ref="quickActions">
    <div class="flex gap-2">
      <UInput
        icon="i-bx-search"
        placeholder="Search library"
        v-model="searchInput"
        class="w-[100%]"
        @input="onSearchInput"
        @keyup.enter="getLibraryItems($event.target.value)"
      />
      <UButton icon="i-bx-x" color="primary" @click="$emit('close')"></UButton>
    </div>

    <div
      v-if="loading"
      class="actions-ctn mt-2 overflow-y-auto max-h-[calc(100vh-180px)]"
    >
      <USkeleton
        v-for="i in 15"
        :key="i"
        class="w-[100%] h-[80px] mt-2"
      ></USkeleton>
    </div>
    <template v-else>
      <!-- SEARCHING BIBLE VERSES -->
      <div class="actions-ctn mt-2 overflow-y-auto max-h-[calc(100vh-180px)]">
        <ActionCard
          v-for="(verse, index) in libraryItems"
          :key="`verse ${index}`"
          action=""
          type="bible"
          :class="{
            'bg-primary-50 dark:bg-primary-800 rounded-md':
              index === focusedActionIndex,
          }"
          @click="focusedActionIndex = index"
        />
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { QuickAction, BibleVerse } from "~/types"
import { useDebounceFn } from "@vueuse/core"
import fuzzysort from "fuzzysort"

const searchInput = ref<string>("")
const loading = ref<boolean>(false)
const libraryItems = ref<BibleVerse[]>()
const searchedLibraryItems = ref<BibleVerse[]>([])
const focusedActionIndex = ref(0)
const quickActions = ref<HTMLDivElement | null>(null)

onMounted(() => {
  quickActions.value?.addEventListener("keydown", (e) => {
    if (e.defaultPrevented) {
      e.preventDefault()
      return
    }
    switch (e.key) {
      case "ArrowDown":
        focusedActionIndex.value < searchedLibraryItems.value.length - 1
          ? (focusedActionIndex.value += 1)
          : null
        break
      case "ArrowUp":
        focusedActionIndex.value > 0 ? (focusedActionIndex.value -= 1) : null
        break
      case "Enter":
        const action = searchedLibraryItems.value?.[focusedActionIndex.value]
        // useGlobalEmit(
        //   action.action,
        //   `${action.bibleBookIndex}:${bibleChapterAndVerse.value}`
        // )
        break
      default:
        return
    }
  })
})

const getLibraryItems = async (query: string = "") => {
  if (query?.length >= 2) {
    const library = await useIndexedDB()
      .library.where({ type: query })
      .toArray()
    libraryItems.value = library
  } else {
    // Set Library Items from IndexedDB
    const library = await useIndexedDB().library.reverse().limit(15).toArray()
    libraryItems.value = library
  }
}

getLibraryItems()

const onSearchInput = useDebounceFn(async () => {
  getLibraryItems(searchInput.value)
}, 500)
</script>
