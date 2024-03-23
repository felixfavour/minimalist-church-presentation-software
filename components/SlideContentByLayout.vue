<template>
  <div
    v-if="slide?.layout === slideLayoutTypes.heading_sub"
    class="slide-layout-ctn flex flex-col gap-2 h-[100%] justify-center"
  >
    <div class="content" v-html="slide?.contents?.[0]"></div>
    <div class="content" v-html="slide?.contents?.[1]"></div>
  </div>
  <div
    v-else-if="slide?.layout === slideLayoutTypes.full_text"
    class="slide-layout-ctn flex flex-col gap-2 h-[100%] justify-center"
  >
    <div class="content" v-html="slide?.contents?.[1]"></div>
  </div>
  <div
    v-else
    class="slide-layout-ctn flex gap-4 h-[100%] justify-around items-center"
  >
    <div class="content" v-html="slide?.contents?.[1]"></div>
    <div class="content" v-html="slide?.contents?.[2]"></div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from "~/types"

const props = defineProps<{
  slide: Slide
}>()
</script>
