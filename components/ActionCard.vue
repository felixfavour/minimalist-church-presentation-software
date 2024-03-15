<template>
  <div
    class="action-card flex gap-3 p-2 py-4 border-t first:border-t-0 border-gray-100 hover:rounded-md hover:bg-primary-50 transition-all cursor-pointer"
  >
    <IconWrapper :name="action.icon" class="mt-1 text-primary" rounded-bg />
    <div class="texts">
      <h4 class="font-semibold">{{ action.name }}</h4>
      <p class="font-light text-xs mt-1">{{ action.desc }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  action: Object,
})
</script>

<style scoped></style>
