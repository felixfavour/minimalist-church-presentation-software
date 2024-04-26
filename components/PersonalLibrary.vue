<template>
  <div class="personal-library-main min-h-[90vh]" ref="quickActions">
    <UTabs :items="libraryTabs" @change="activeLibraryTab = $event">
      <template #default="{ item }">
        <div class="flex gap-2 capitalize">
          <IconWrapper :name="item.icon" size="4" />
          {{ item.label }}s
        </div>
      </template>
    </UTabs>
    <UButton class="mb-2 capitalize" size="lg" block icon="i-bx-plus">
      Add new {{ libraryTabs[activeLibraryTab].label }}
    </UButton>

    <div v-if="loading" class="actions-ctn mt-2 overflow-y-auto max-h-[calc(100vh-180px)]">
      <USkeleton v-for="i in 15" :key="i" class="w-[100%] h-[80px] mt-2"></USkeleton>
    </div>
    <template v-else>
      <div class="flex gap-2 come-up-1">
        <UInput icon="i-bx-search" :placeholder="`Search saved ${libraryTabs[activeLibraryTab].label}s`"
          v-model="searchInput" class="w-[100%]" @input="onSearchInput" @keyup.enter="null" />
        <UButton icon="i-bx-x" color="primary" @click="$emit('close')"></UButton>
      </div>
      <!-- SEARCHING SAVED SONGS -->
      <div v-if="activeLibraryTab === 0" class="actions-ctn mt-2 overflow-y-auto max-h-[calc(100vh-180px)] come-up-1">

        <EmptyState v-if="savedSongs?.length === 0" icon="i-tabler-database-search" sub="No songs saved yet."
          desc="Click the save icon on the Slide card to start saving" />
        <SongCard v-for="(song, index) in savedSongs" saved :key="song.content.id" :song="song.content" />
      </div>
      <!-- SEARCHING SAVED SLIDES -->
      <div v-if="activeLibraryTab === 1" class="actions-ctn mt-2 overflow-y-auto max-h-[calc(100vh-180px)] come-up-1">
        <EmptyState v-if="savedSlides?.length === 0" icon="i-tabler-database-search" sub="No slides saved yet."
          desc="Click the save icon on the Slide card to start saving" />
        <ListSlideCard v-for="(slide, index) in savedSlides" :key="slide.content.id" :slide="slide.content" />
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { Slide, Song } from "~/types"
import { useDebounceFn } from "@vueuse/core"
import { useObservable } from '@vueuse/rxjs'
import fuzzysort from "fuzzysort"
import { liveQuery } from "dexie";

const libraryTabs = [
  { label: 'song', icon: 'i-bx-music' },
  { label: 'slide', icon: 'i-bx-slideshow' }
]
const activeLibraryTab = ref<number>(0)
const searchInput = ref<string>("")
const loading = ref<boolean>(false)
const libraryItems = useObservable<{ type: string, content: Slide | Song }[]>(
  liveQuery(async () => {
    return await useIndexedDB().library.reverse().toArray()
  })
)
const searchedLibraryItems = ref<any[]>([])
const focusedActionIndex = ref(0)
const quickActions = ref<HTMLDivElement | null>(null)

const savedSongs = computed(() => {
  return libraryItems?.value?.filter(item => item.type === libraryTypes.song)
})

const savedSlides = computed(() => {
  return libraryItems?.value?.filter(item => item.type === libraryTypes.slide)
})

const onSearchInput = useDebounceFn(async () => {

}, 500)
</script>
