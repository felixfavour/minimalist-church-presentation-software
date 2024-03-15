<template>
  <section
    class="flex-1 rounded-xl border border-primary-100 h-[100vh] max-h-[calc(100vh-80px)] overflow-hidden"
  >
    <div class="heading p-2 px-3 bg-primary-100 border">
      <h2 class="font-medium text-sm flex items-center top-0 bottom-[auto]">
        {{ heading }}
      </h2>
    </div>
    <div class="slot-ctn p-3 text-sm">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  heading: String,
})
</script>

<style scoped></style>
