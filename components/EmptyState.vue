<template>
  <div
    class="h-[88%] mt-4 flex flex-col items-center justify-center gap-4 text-gray-500"
  >
    <IconWrapper :name="icon" size="14" />
    <h2 class="text-md font-semibold max-w-[150px] text-center">
      {{ sub }}
    </h2>
    <UButton v-if="action" :icon="actionIcon" @click="useGlobalEmit(action)">
      {{ actionText }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
  sub: string
  actionText: string
  action: string
}>()

const actionIcon = computed(() => {
  if (
    props.actionText?.toLowerCase().includes("create") ||
    props.actionText?.toLowerCase().includes("add")
  ) {
    return "i-bx-plus"
  }
  return ""
})
</script>
