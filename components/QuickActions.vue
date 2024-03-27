<template>
  <AppSection heading="Quick Actions">
    <div class="main" ref="quickActions">
      <UInput
        icon="i-bx-search"
        placeholder="Search actions"
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
          :class="{ 'bg-primary-50 rounded-md': index === focusedActionIndex }"
          @click="focusedActionIndex = index"
        />
      </div>

      <!-- SEARCHING ACTIONS -->
      <div v-else class="actions-ctn mt-2 overflow-y-auto max-h-[85vh]">
        <ActionCard
          v-for="(action, index) in searchedActions"
          :key="action.name"
          :action="{ ...action, bibleChapterAndVerse }"
          :class="{ 'bg-primary-50 rounded-md': index === focusedActionIndex }"
        />
      </div>
    </div>
  </AppSection>
</template>

<script setup>
import fuzzysort from "fuzzysort"
const searchInput = ref("")
const focusedActionIndex = ref(0)
const quickActions = ref(null)

const actions = [
  {
    icon: "i-bx-bible",
    name: "Display Bible",
    desc: "Select and open scriptures",
    action: "new-bible",
    // meta: bibleBooks.toString(),
    meta: "",
    bibleBookIndex: 1,
  },
  {
    icon: "i-bx-music",
    name: "Display Lyrics",
    desc: "Find lyrics to any song, native too",
    action: "new-lyrics",
    meta: "",
  },
  {
    icon: "i-bx-slideshow",
    name: "Create Slide",
    desc: "Create slides for sermons and more",
    action: "new-slide",
    meta: "",
  },
  {
    icon: "i-bx-search",
    name: "Search Bible",
    desc: "Find scriptures with familiar words",
    action: "new-bible-search",
    meta: "",
    unreleased: true,
  },
  {
    icon: "i-bx-carousel",
    name: "Add Slideshow/Carousel",
    desc: "Find scriptures with familiar words",
    action: "new-carousel",
    meta: "",
    unreleased: true,
  },
  {
    icon: "i-bx-time",
    name: "Add Countdown Timer",
    desc: "Find scriptures with familiar words",
    action: "new-timer",
    meta: "",
    unreleased: true,
  },
].concat(
  bibleBooks?.map((book, index) => {
    const bibleBookIndex = index + 1 // Does not start from 0, starts from 1
    return {
      icon: "i-bx-bible",
      name: `Open ${book}`,
      desc: `Open the book of ${book}`,
      action: "new-bible",
      meta: `${book} 0:0 1:1 2:2 3:3 4:4 5:5 6:6 7:7 8:8 9:9 10:10 -`,
      searchableOnly: true,
      bibleBookIndex: bibleBookIndex,
    }
  })
)

onMounted(() => {
  quickActions.value.addEventListener("keydown", (e) => {
    if (e.defaultPrevented) {
      e.preventDefault()
      return
    }
    switch (e.key) {
      case "ArrowDown":
        focusedActionIndex.value < searchedActions.value.length
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
        // console.log(
        //   action.action,
        //   `${action.bibleBookIndex}:${bibleChapterAndVerse.value}`
        // )
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

  const results = fuzzysort.go(searchInputBeforeColon, actions, {
    keys: ["name", "desc", "meta"],
  })
  return results?.map((result) => result.obj)
})
</script>

<style scoped></style>
