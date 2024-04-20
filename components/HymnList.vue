<template>
  <div class="hymn-main min-h-[90vh]" ref="quickActions">
    <div class="flex gap-2">
      <UInput
        icon="i-bx-search"
        placeholder="Search hymns"
        v-model="searchInput"
        class="w-[100%]"
        @input="onSearchInput"
        @keyup.enter="getHymns($event.target.value)"
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
      <!-- BASIC SONGS -->
      <div
        v-if="searchInput.length < 2"
        class="actions-ctn mt-2 overflow-y-auto max-h-[calc(100vh-180px)]"
      >
        <SongCard
          v-for="(hymn, index) in hymns"
          :key="hymn?.number"
          :song="hymn"
          type="hymn"
          :class="{
            'bg-primary-50 dark:bg-primary-800 rounded-md':
              index === focusedActionIndex,
          }"
          @click="focusedActionIndex = index"
        />
      </div>

      <!-- SEARCHING SONGS -->
      <div
        v-else
        class="actions-ctn mt-2 overflow-y-auto max-h-[calc(100vh-180px)]"
      >
        <SongCard
          v-for="(hymn, index) in hymns"
          :key="hymn?.number"
          :song="hymn"
          type="hymn"
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
import type { Hymn, Song } from "~/types"
import { useDebounceFn } from "@vueuse/core"
import fuzzysort from "fuzzysort"

const allHymns = useNuxtApp().$hymns as Hymn[]
const searchInput = ref<string>("")
const loading = ref<boolean>(false)
const hymns = ref<Hymn[]>()
const searchedHymns = ref<Song[]>([])
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
        focusedActionIndex.value < searchedHymns.value.length - 1
          ? (focusedActionIndex.value += 1)
          : null
        break
      case "ArrowUp":
        focusedActionIndex.value > 0 ? (focusedActionIndex.value -= 1) : null
        break
      case "Enter":
        const action = searchedHymns.value?.[focusedActionIndex.value]
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

const getHymns = (query: string = "") => {
  if (query?.length >= 2) {
    let results = fuzzysort.go(query, allHymns, {
      keys: ["title", "meta"],
    })
    results = results?.map((result) => result.obj)
    hymns.value = results.slice(0, 15)
  } else {
    const rand = Math.floor(Math.random() * 1115 + 15)
    hymns.value = allHymns.slice(rand - 15, rand)
  }
}

getHymns()

const onSearchInput = useDebounceFn(async () => {
  getHymns(searchInput.value)
}, 500)
</script>
