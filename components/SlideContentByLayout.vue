<template>
  <div
    v-if="slide?.layout === slideLayoutTypes.heading_sub"
    class="slide-layout-ctn flex flex-col gap-2 h-[100%] justify-center"
    :style="`padding: ${padding || 0}vw`"
  >
    <div class="content" v-html="slide?.contents?.[0]"></div>
    <div class="content" v-html="slide?.contents?.[1]"></div>
  </div>
  <div
    v-else-if="slide?.layout === slideLayoutTypes.full_text"
    class="slide-layout-ctn flex flex-col gap-2 h-[100%] justify-center"
    :style="`padding: ${padding || 0}vw`"
  >
    <div class="content" v-html="slide?.contents?.[1]"></div>
  </div>
  <div
    v-else-if="slide?.layout === slideLayoutTypes.two_column"
    class="slide-layout-ctn flex gap-4 h-[100%] justify-around items-center"
    :style="`padding: ${padding || 0}vw`"
  >
    <div class="content" v-html="slide?.contents?.[0]"></div>
    <div class="content" v-html="slide?.contents?.[1]"></div>
  </div>
  <div
    v-else-if="slide?.layout === slideLayoutTypes.bible"
    class="slide-layout-ctn flex flex-col gap-2 h-[100%] justify-center"
    :style="`padding: ${padding || 0}vw`"
  >
    <div class="content" v-html="slide?.contents?.[0]"></div>
    <div class="content" v-html="slide?.contents?.[1]"></div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from "~/types"

const props = defineProps<{
  slide: Slide
  padding: string
}>()
</script>
