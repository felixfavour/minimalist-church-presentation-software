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

      <!-- LYRICS SECTION -->
      <div
        v-else-if="page === 'lyrics'"
        class="lyrics-main min-h-[90vh]"
        ref="quickActions"
      >
        <div class="flex gap-2">
          <UInput
            icon="i-bx-search"
            placeholder="Search songs, artists, albums"
            v-model="searchInput"
            class="w-[100%]"
          />
          <UButton icon="i-bx-x" color="primary" @click="page = ''"></UButton>
        </div>

        <!-- BASIC SONGS -->
        <div
          v-if="searchInput.length < 2"
          class="actions-ctn mt-2 overflow-y-auto max-h-[85vh]"
        >
          <SongCard
            v-for="(song, index) in songs"
            :key="song.id"
            :song="song"
            :class="{
              'bg-primary-50 rounded-md': index === focusedActionIndex,
            }"
            @click="focusedActionIndex = index"
          />
        </div>

        <!-- SEARCHING SONGS -->
        <div v-else class="actions-ctn mt-2 overflow-y-auto max-h-[85vh]">
          <SongCard
            v-for="(song, index) in searchedSongs"
            :key="song.id"
            :song="song"
            :class="{
              'bg-primary-50 rounded-md': index === focusedActionIndex,
            }"
            @click="focusedActionIndex = index"
          />
        </div>
      </div>
    </Transition>
  </AppSection>
</template>

<script setup>
import { useAppStore } from "~/store/app"
import fuzzysort from "fuzzysort"
const searchInput = ref("")
const focusedActionIndex = ref(0)
const quickActions = ref(null)
const appStore = useAppStore()
const page = ref("") // lyrics

const actions = [
  {
    icon: "i-bx-bible",
    name: "Display Bible",
    desc: "Select and open scriptures",
    action: "new-bible",
    // meta: bibleBooks.toString(),
    meta: "",
    bibleBookIndex: 1,
    type: slideTypes.bible,
  },
  {
    icon: "i-bx-church",
    name: "Display Hymns",
    desc: "Find verses and chorus to all hymns",
    action: "new-hymn",
    meta: "",
    type: slideTypes.hymn,
  },
  {
    icon: "i-bx-music",
    name: "Display Lyrics",
    desc: "Find lyrics to any song, native too",
    action: "new-lyrics",
    meta: "",
    type: slideTypes.lyrics,
  },
  {
    icon: "i-bx-slideshow",
    name: "Create Slide",
    desc: "Create slides for sermons and more",
    action: "new-slide",
    meta: "",
    type: slideTypes.text,
  },
  {
    icon: "i-bx-search",
    name: "Search Bible",
    desc: "Find scriptures with familiar words",
    action: "new-bible-search",
    meta: "",
    unreleased: true,
    type: slideTypes.bible,
  },
  {
    icon: "i-bx-image",
    name: "Add Media",
    desc: "Display video or image media",
    action: "new-media",
    meta: "",
    unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-carbon-overlay",
    name: "Add Overlay",
    desc: "Place one-third of a slide over another",
    action: "new-overlay",
    meta: "",
    unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-ph-file-ppt",
    name: "Import Slides",
    desc: "Extract from other apps like PowerPoint",
    action: "new-transcribe",
    meta: "power point Google slides",
    unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-carousel",
    name: "Add Slideshow/Carousel",
    desc: "Find scriptures with familiar words",
    action: "new-carousel",
    meta: "",
    unreleased: true,
    type: slideTypes.text,
  },
  {
    icon: "i-material-symbols-speech-to-text",
    name: "Transcribe Sermon",
    desc: "Start transcribing preacher sermons",
    action: "new-transcribe",
    meta: "",
    unreleased: true,
    // type: slideTypes.text
  },
  {
    icon: "i-bx-time",
    name: "Add Countdown Timer",
    desc: "Find scriptures with familiar words",
    action: "new-timer",
    meta: "",
    unreleased: true,
    type: slideTypes.text,
  },
].concat(
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
  hymnTitles?.map((title) => {
    const hymnIndex = title.slice(0, title.indexOf(" "))
    const hymnTitle = title?.slice(title.indexOf(" "))
    return {
      icon: "i-bx-church",
      name: `${hymnTitle}`,
      desc: `verse and chorus included`,
      action: "new-hymn",
      meta: `hymn ${title}`,
      searchableOnly: true,
      hymnIndex,
      type: slideTypes.hymn,
    }
  })
)

const songs = [
  {
    lyrics:
      "[VERSE 1]\nWhere’s darkness at the sight of light\nEvaporated at the glimpse of light\nYou’re the light that makes my face shine bright\nAs I look your face\nI become the light\nWhere’s darkness at the sight of light\nEvaporated at the glimpse of light\nYou’re the light that makes my face\nShine bright so bright\nAs I look your face, I become the light\n[Chorus]\nImole De oh! Okunkun parade\nImole De oh! Okunkun parade\nImole De oh! Okunkun parade\nImole De oh! Okunkun parade\n[VERSE 2]\nWhere’s darkness at the sight of light\nEvaporated at the glimpse of light\nYou’re the light that makes my face shine bright\nAs I look your face, I become the light",
    title: "Imole De",
    album: "",
    cover:
      "https://images.genius.com/584041567278778fe32f06408686d63d.599x599x1.png",
    artist: "Dunsin Oyekan",
  },
  {
    lyrics:
      "[Intro]\nFirst it was fragrance\nThen it turned to fire\nMy worship is my weapon\nThis is how I win my battle\n[Verse]\nThe fragrance of my worship\nRose up to the Father\nNoises, Thunderings, Earthquakes\nWere the response to my worship\nThe fragrance of my worship\nRose up to the Father\nNoises, Thunderings, Lightnings\nWere the response to my worship\nThe fragrance of my worship\nRose up to the Father\nNoises, Thunderings, Earthquakes\nWere the response to my worship\nThe fragrance of my worship\nRose up to the Father\nNoises, Thunderings, Lightnings\nWere the response to my worship",
    title: "Fragrance to fire",
    album: "",
    cover:
      "https://images.genius.com/584041567278778fe32f06408686d63d.599x599x1.png",
    artist: "Dunsin Oyekan",
  },
  {
    lyrics:
      "Na na na na na na\nE eh na na e eh\nUna na\nNa na na na na na na\nNa na na na na\nBlessed art Thou\nSon of David\nBlessed art Thou\nRoot of Jesse\nBlessed art Thou\nSon of David (hmmmmm)\nBlessed art thou\nRoot of Jesse\nYou are eminently glorious\nImmaculately beautiful\nI can go on and on\nOn and on\nBut my words are not enough\nMy vocabularies will fail Me\nBut permit me to cry out\nIBA ooh IBA ooh IBA",
    title: "IBA",
    album: "",
    cover:
      "https://images.genius.com/584041567278778fe32f06408686d63d.599x599x1.png",
    artist: "Dunsin Oyekan",
  },
  {
    lyrics:
      '[Nathaniel Bassey]\nOne day I saw a door\nOpened in heaven\nThen I heard a voice\nLike a trumpet sound\nAnd He said to me, "Come on up higher"\n"And behold the things that are yet to be"\nThen I beheld a sight of majestic beauty\nAll around the world, who is seated on the throne\nThe creatures and the four and twenty elders\nWorshipping the One who lives forevermore\nSinging\n"Holy, holy, holy, holy, holy, holy are you Lord"\n"Holy, holy, holy, holy, holy, holy are you Lord"\n"Holy, holy, holy, holy, holy, holy are you Lord"\n"Holy, holy, holy, holy, holy, holy are you Lord"\nThen I heard the cries\n"Who is worthy to take the book and to open up the seal?"\n"Worthy is the Lamb, Lion of Judah"\n"He has prevailed and opened up the seal"\n"Holy, holy, holy are you Lord"\n"Holy, holy, holy are you Lord"\n"Holy, holy, holy are you Lord"\n"Holy, holy, holy are you Lord"',
    title: "Holy (Ft. Jumoke Oshoboke)",
    album: "The King is Coming",
    cover:
      "https://images.genius.com/c41320603ba793f7dbb8e6544ae2a51c.300x300x1.jpg",
    artist: "Nathaniel Bassey",
  },
  {
    lyrics:
      "[Intro]\n[Verse 1: Nathaniel Bassey]\nYou are the first and the last\nThat's why we call you Alpha, Omega\nYou own the world, you fill the universe\nYou made the things we see and cannot see\nYour love is great, your mercy sure\nYour grace has done more than I could have done\nWhen I was bound, you came and rescued me\nYou gave me light and took the darkness\n[Verse 1: All]\nYou are the first and the last\nThat's why we call you Alpha, Omega\nYou own the world, you fill the universe\nYou made the things we see and cannot see\nYour love is great, your mercy sure\nYour grace has done more than I could have done\nWhen I was bound, you came and rescued me\nYou gave me light and took my darkness\n[Chorus]\nYou surround me with many victories\nJehovah Nissi, you're my banner\nYou go before me, you fight my battles\nJehovah Nissi\nJehovah Nissi",
    title: "Jehovah Nissi",
    album: "The King is Coming",
    cover:
      "https://images.genius.com/c41320603ba793f7dbb8e6544ae2a51c.300x300x1.jpg",
    artist: "Nathaniel Bassey",
  },
  {
    lyrics:
      "The King is coming\nIn glory and in majesty\nEvery eye will see the King\nThe King is coming\nIn glory and in majesty\nEvery eye will see the King\nThe King is coming\nIn glory and in majesty\nEvery eye will see the King\nThe King is coming\nIn glory and in majesty\nEvery eye will see the King\nThe tomb is empty\nHe died for me and rose again\nEvery eye will see the King\nThe tomb is empty\nHe died for me and rose again\nEvery eye will see the King\nThe King is coming\nIn glory and in majesty\nEvery eye will see the King",
    title: "The King is Coming",
    album: "The King is Coming",
    cover:
      "https://images.genius.com/c41320603ba793f7dbb8e6544ae2a51c.300x300x1.jpg",
    artist: "Nathaniel Bassey",
  },
  {
    lyrics:
      "Holy Spirit, carry me oh\nCarry me oh\nHoly Spirit, carry me oh\nCarry me oh\nOn wings of eagles, carry me oh\nCarry me oh\nTo the place of prayer, carry me oh\nCarry me oh\nHoly Spirit, carry me oh\nCarry me oh\nTo the place of power, carry me oh\nCarry me oh\nHoly Spirit, carry me oh\nCarry me oh\nTo deep, deep waters, carry me oh\nCarry me oh\nTo realms of glory, carry me oh\nCarry me oh\nHoly Spirit, carry me oh\nCarry me oh\nHoly Spirit, guide me oh\nGuide me oh\nI need direction Holy Spirit, guide me oh\nGuide me oh",
    title: "Carry Me (Ft. BEMIGHO OMAYUKU & PAT AKEM-VINGIR)",
    album: "The King is Coming",
    cover:
      "https://images.genius.com/c41320603ba793f7dbb8e6544ae2a51c.300x300x1.jpg",
    artist: "Nathaniel Bassey",
  },
]

const emitter = useNuxtApp().$emitter
emitter.on("new-lyrics", () => {
  page.value = "lyrics"
})

onMounted(() => {
  quickActions.value.addEventListener("keydown", (e) => {
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

const searchedSongs = computed(() => {
  focusedActionIndex.value = 0
  let results = fuzzysort.go(searchInput.value, songs, {
    keys: ["title", "artist"],
  })
  results = results?.map((result) => result.obj)
  return results
})

watch(page, () => {
  focusedActionIndex.value = 0
  searchInput.value = ""
})
</script>

<style scoped></style>
