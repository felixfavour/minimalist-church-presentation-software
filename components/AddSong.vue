<template>
  <div class="add-song-main my-4">
    <form class="flex flex-col gap-3">
      <UFormGroup label="Title" size="lg">
        <UInput placeholder="Hallelujah Eh" v-model="title" />
      </UFormGroup>
      <UFormGroup label="Artist" size="lg">
        <UInput placeholder="Nathaniel Bassey" v-model="artist" />
      </UFormGroup>
      <UFormGroup label="Lyrics" size="lg">
        <UTextarea
          placeholder="Hallelujah Eh! It's the sound of Victory"
          variant="none"
          rows="12"
          color="gray"
          resize="vertical"
          v-model="lyrics"
        />
      </UFormGroup>

      <UButton
        block
        icon="i-bx-plus"
        size="lg"
        class="mt-4"
        :disabled="!(artist && title && lyrics)"
        :loading="loading"
        @click="addSong"
      >
        Add Song
      </UButton>
    </form>
  </div>
</template>
<script setup lang="ts">
import type { Song } from "~/types"
const loading = ref<boolean>(false)
const artist = ref<string>("")
const title = ref<string>("")
const lyrics = ref<string>("")
const toast = useToast()

const addSong = async () => {
  try {
    loading.value = true
    const db = useIndexedDB()

    const songId = useURLFriendlyString(`${artist.value} ${title.value}`)
    const song: Song = {
      id: songId,
      title: title.value,
      artist: artist.value,
      lyrics: lyrics.value,
    }
    await db.library.add({ id: songId, type: "song", content: song }, songId)
    toast.add({ icon: "i-bx-save", title: "Song saved to Library" })
  } catch (err: any) {
    if (err.name === "ConstraintError") {
      toast.add({
        icon: "i-bx-error",
        title: "Can't add a song twice",
        color: "red",
      })
    } else if (err.name === "DataCloneError") {
      // toast.add({ icon: 'i-bx-save', title: 'Item added to Library' })
    } else {
      console.log(err)
    }
  } finally {
    loading.value = false
  }
}
</script>
