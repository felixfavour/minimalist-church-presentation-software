<template>
  <AppSection
    heading="Quick Actions"
    :sub-heading="page"
    class="max-w-[330px]"
    @header-click="page = ''"
  >
    <Transition name="fade-sm">
      <!-- ACTIONS HOME SECTION -->
      <div v-if="page === ''" class="main min-h-[90vh]" ref="quickActions">
        <UInput
          icon="i-bx-search"
          placeholder="Search scripture, hymns, actions"
          v-model="searchInput"
          color="gray"
        />

        <!-- BASIC ACTIONS -->
        <div
          v-if="searchInput.length < 2"
          class="actions-ctn mt-2 overflow-y-auto max-h-[85vh]"
        >
          <ActionCard
            v-for="(action, index) in actions?.filter((a) => !a.searchableOnly)"
            :key="action.name"
            :action="action"
            :class="{
              'bg-primary-50 rounded-md': index === focusedActionIndex,
            }"
            @click="focusedActionIndex = index"
          />
        </div>

        <!-- SEARCHING ACTIONS -->
        <div v-else class="actions-ctn mt-2 overflow-y-auto max-h-[85vh]">
          <ActionCard
            v-for="(action, index) in searchedActions"
            :key="action.name"
            :action="{ ...action, bibleChapterAndVerse }"
            :class="{
              'bg-primary-50 rounded-md': index === focusedActionIndex,
            }"
          />
        </div>
      </div>

      <!-- SONG SECTION -->
      <SongsList v-else-if="page === 'song'" @close="page = ''" />
    </Transition>
  </AppSection>
</template>

<script setup lang="ts">
import type { Hymn, QuickAction } from "~/types"
import type { Emitter } from "mitt"
import { useAppStore } from "~/store/app"
import { quickActionsArr } from "~/utils/constants"
import fuzzysort from "fuzzysort"

const searchInput = ref<string>("")
const focusedActionIndex = ref<number>(0)
const quickActions = ref<HTMLDivElement | null>(null)
const appStore = useAppStore()
const page = ref<string>("") // song
const hymns = useNuxtApp().$hymns as Array<Hymn>
const emitter = useNuxtApp().$emitter as Emitter<any>

const actions = quickActionsArr.concat(
  bibleBooks?.map((book, index) => {
    const bibleBookIndex = index + 1 // Does not start from 0, starts from 1
    return {
      icon: "i-bx-bible",
      name: `${book}`,
      desc: `Open the book of ${book}`,
      action: "new-bible",
      meta: `${book} 0:0 1:1 2:2 3:3 4:4 5:5 6:6 7:7 8:8 9:9 10:10 -`,
      searchableOnly: true,
      bibleBookIndex,
      type: slideTypes.bible,
    }
  }),
  hymns?.map((hymn: Hymn) => {
    return {
      icon: "i-bx-church",
      name: `${hymn.title}`,
      desc: `verse and chorus included`,
      action: "new-hymn",
      meta: `hymn ${hymn.meta}`,
      searchableOnly: true,
      hymnIndex: hymn.number,
      type: slideTypes.hymn,
    }
  })
)

emitter.on("new-song", () => {
  page.value = "song"
})

onMounted(() => {
  quickActions.value?.addEventListener("keydown", (e) => {
    if (e.defaultPrevented) {
      e.preventDefault()
      return
    }
    switch (e.key) {
      case "ArrowDown":
        focusedActionIndex.value < searchedActions.value.length - 1
          ? (focusedActionIndex.value += 1)
          : null
        break
      case "ArrowUp":
        focusedActionIndex.value > 0 ? (focusedActionIndex.value -= 1) : null
        break
      case "Enter":
        const action = searchedActions.value?.[focusedActionIndex.value]
        useGlobalEmit(
          action.action,
          `${action.bibleBookIndex}:${bibleChapterAndVerse.value}`
        )
        break
      default:
        return
    }
  })
})

const bibleChapterAndVerse = computed(() => {
  const regex = /\b\d+:\d+\b/g
  return searchInput.value.match(regex)?.[0]
})

const searchedActions = computed(() => {
  focusedActionIndex.value = 0
  const colonIndex = searchInput.value?.indexOf(":")
  const searchInputBeforeColon =
    colonIndex === -1
      ? searchInput.value
      : searchInput.value?.substring(0, colonIndex)

  let results = fuzzysort.go(searchInputBeforeColon, actions, {
    keys: ["name", "desc", "meta"],
  })
  results = results?.map((result) => result.obj)

  // If true, then show Bible types first.
  if (bibleChapterAndVerse.value) {
    results.sort((a, b) => {
      if (a.type === "bible" && b.type !== "bible") {
        return -1
      } else if (a.type !== "bible" && b.type === "bible") {
        return 1
      } else {
        return 0
      }
    })
  }
  return results?.slice(0, 10)
})

watch(page, () => {
  focusedActionIndex.value = 0
  searchInput.value = ""
})
</script>

<style scoped></style>
