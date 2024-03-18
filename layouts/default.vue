<template>
  <div class="app-ctn max-h-[100vh] overflow-hidden">
    <Navbar />
    <slot />
  </div>
</template>

<script setup>
useHead({
  title: "Cloud of Worshippers",
})
</script>

<style scoped></style>
