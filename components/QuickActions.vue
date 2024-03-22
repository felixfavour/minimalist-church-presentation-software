<template>
  <AppSection heading="Quick Actions">
    <div class="main">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Search actions"
        color="gray"
      />
      <div class="actions-ctn mt-2">
        <ActionCard
          v-for="action in actions"
          :key="action.name"
          :action="action"
        />
      </div>
    </div>
  </AppSection>
</template>

<script setup>
const actions = [
  {
    icon: "i-bx-bible",
    name: "Display Bible",
    desc: "Select and open scriptures",
  },
  {
    icon: "i-bx-music",
    name: "Display Lyrics",
    desc: "Find lyrics to any song, native too",
  },
  {
    icon: "i-bx-slideshow",
    name: "Create Slides",
    desc: "Create sermon slides and more",
  },
  {
    icon: "i-bx-search",
    name: "Search Bible",
    desc: "Find scriptures with familiar words",
  },
  {
    icon: "i-bx-carousel",
    name: "Add Slideshow/Carousel",
    desc: "Find scriptures with familiar words",
  },
  {
    icon: "i-bx-time",
    name: "Add Countdown Timer",
    desc: "Find scriptures with familiar words",
  },
]
</script>

<style scoped></style>
