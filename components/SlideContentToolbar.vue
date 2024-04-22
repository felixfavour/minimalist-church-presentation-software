<template>
  <div
    class="my-2 flex gap-1 w-[100%] absolute z-10 bg-white dark:bg-[#121212] py-1 right-0 left-0 top-[45px]"
  >
    <FontSelect
      v-if="slide?.type !== slideTypes?.text"
      size="lg"
      @change="$emit('update-bible-version', $event)"
    />
    <div class="button-group rounded-md p-1 flex items-center gap-1">
      <UButton
        @click="
          $emit('update-style', { ...slide.slideStyle, alignment: 'left' })
        "
        class="dark:text-primary-400 dark:hover:text-primary-500"
        :class="{
          'bg-primary text-white dark:text-primary-900':
            slide?.slideStyle?.alignment === 'left',
        }"
        icon="i-bi-text-left"
        variant="ghost"
      />
      <UButton
        @click="
          $emit('update-style', { ...slide.slideStyle, alignment: 'center' })
        "
        class="dark:text-primary-400 dark:hover:text-primary-500"
        :class="{
          'bg-primary text-white dark:text-primary-900':
            slide?.slideStyle?.alignment === 'center',
        }"
        icon="i-bi-text-center"
        variant="ghost"
      />
      <UButton
        @click="
          $emit('update-style', { ...slide.slideStyle, alignment: 'right' })
        "
        class="dark:text-primary-400 dark:hover:text-primary-500"
        :class="{
          'bg-primary text-white dark:text-primary-900':
            slide?.slideStyle?.alignment === 'right',
        }"
        icon="i-bi-text-right"
        variant="ghost"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from "~/types"
const props = defineProps<{
  slide: Slide
}>()
</script>

<style scoped></style>
