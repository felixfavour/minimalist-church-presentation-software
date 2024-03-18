<template>
  <div class="slide-layout-selection flex p-2 gap-2">
    <UButton
      v-for="layout in layouts"
      :key="layout"
      @click="$emit('select', layout)"
      class="group/item w-[80px] h-[80px] overflow-hidden text-black shadow-none bg-gray-100 hover:bg-primary-100 transition"
    >
      <div
        v-if="layout === slideLayoutTypes.heading_sub"
        class="text-center w-[100%] flex flex-col gap-1 group"
      >
        <p
          class="h-4 w-[100%] bg-gray-300 rounded-md group-hover/item:bg-primary-300 group-active/item:bg-primary-300"
        ></p>
        <p
          class="h-9 w-[100%] bg-gray-300 rounded-md group-hover/item:bg-primary-300 group-active/item:bg-primary-300"
        ></p>
      </div>
      <div
        v-else-if="layout === slideLayoutTypes.full_text"
        class="text-center w-[100%] flex flex-col gap-1"
      >
        <p
          class="h-14 w-[100%] bg-gray-300 rounded-md group-hover/item:bg-primary-300 group-active/item:bg-primary-300"
        ></p>
      </div>
      <div v-else class="text-center w-[100%] flex gap-1">
        <p
          class="h-14 w-[100%] bg-gray-300 rounded-md group-hover/item:bg-primary-300 group-active/item:bg-primary-300"
        ></p>
        <p
          class="h-14 w-[100%] bg-gray-300 rounded-md group-hover/item:bg-primary-300 group-active/item:bg-primary-300"
        ></p>
      </div>
    </UButton>
  </div>
</template>

<script setup>
const layouts = Object.values(slideLayoutTypes)
const props = defineProps({
  value: {
    type: String,
    default: slideLayoutTypes.heading_sub,
  },
})
</script>

<style scoped></style>
