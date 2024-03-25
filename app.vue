<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import mitt from "mitt"
import { useAppStore } from "./store/app"
const appStore = useAppStore()

const emitter = mitt()
appStore.setEmitter(emitter)
</script>

<style>
.text-2xs {
  font-size: 0.7rem;
  line-height: 0.9rem;
}
</style>
