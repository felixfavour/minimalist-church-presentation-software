<template>
  <section
    class="flex-1 rounded-xl border border-primary-100 h-[100vh] max-h-[calc(100vh-80px)] overflow-hidden"
  >
    <div class="heading p-2 px-3 bg-primary-100 border">
      <h2 class="font-medium text-sm flex items-center top-0 bottom-[auto]">
        <template v-if="subHeading">
          <UButton
            variant="ghost"
            class="p-1 px-2 text-black"
            @click="$emit('header-click')"
            >{{ heading }}</UButton
          >
          <IconWrapper name="i-bx-chevron-right" class="text-primary" />
          <span class="pl-2 text-gray-600 font-normal capitalize">{{
            subHeading
          }}</span>
        </template>
        <span v-else class="p-1 px-2">
          {{ heading }}
        </span>
      </h2>
    </div>
    <div :class="`slot-ctn p-3 text-sm ${slotCtnStyles || ''}`">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  heading: String,
  subHeading: String,
  slotCtnStyles: String,
})
</script>

<style scoped></style>
