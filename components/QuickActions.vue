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
    action: "new-bible",
  },
  {
    icon: "i-bx-music",
    name: "Display Lyrics",
    desc: "Find lyrics to any song, native too",
    action: "new-lyrics",
  },
  {
    icon: "i-bx-slideshow",
    name: "Create Slide",
    desc: "Create slides for sermons and more",
    action: "new-slide",
  },
  {
    icon: "i-bx-search",
    name: "Search Bible",
    desc: "Find scriptures with familiar words",
    action: "new-bible-search",
  },
  {
    icon: "i-bx-carousel",
    name: "Add Slideshow/Carousel",
    desc: "Find scriptures with familiar words",
    action: "new-carousel",
  },
  {
    icon: "i-bx-time",
    name: "Add Countdown Timer",
    desc: "Find scriptures with familiar words",
    action: "new-timer",
  },
]
</script>

<style scoped></style>
