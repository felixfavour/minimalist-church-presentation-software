<template>
  <div class="main relative">
    <div
      class="toolbar w-[100%] p-2 px-4 bg-primary-100 rounded-md flex items-center justify-between overflow-hidden"
    >
      <TransitionGroup name="list">
        <div
          v-for="slide in slides"
          :key="slide?.name"
          class="slide-name flex items-center gap-2 top-1 text-primary-900"
        >
          <h4 class="font-medium ws-nowrap">{{ slide?.name }}</h4>
          <SlideChip
            :slide-type="slide?.type"
            class="text-primary-900 bg-primary text-white"
          />
        </div>
      </TransitionGroup>
      <div class="actions flex items-center">
        <div
          v-if="slide?.type === slideTypes?.bible"
          class="button-group bg-primary-200 rounded-md mx-1 flex items-center gap-1"
        >
          <UTooltip text="Previous verse" :popper="{ arrow: true }">
            <UButton variant="ghost" icon="i-bx-chevron-left" />
          </UTooltip>
          <UInput
            placeholder="Bible verse"
            size="xs"
            variant="none"
            inputClass="bg-white border-0 shadow-none outline-none w-[16ch] text-center"
          />
          <UTooltip text="Next verse" :popper="{ arrow: true }">
            <UButton variant="ghost" icon="i-bx-chevron-right" />
          </UTooltip>
        </div>
        <div class="button-group bg-primary-200 rounded-md mx-1">
          <UTooltip text="Increase font size" :popper="{ arrow: true }">
            <UButton variant="ghost" icon="i-mdi-format-font-size-increase" />
          </UTooltip>
          <UTooltip text="Decrease font size" :popper="{ arrow: true }">
            <UButton variant="ghost" icon="i-mdi-format-font-size-decrease" />
          </UTooltip>
        </div>
        <UTooltip text="Add background image" :popper="{ arrow: true }">
          <UButton variant="ghost" icon="i-bx-image-add" />
        </UTooltip>
        <UTooltip text="Add background video" :popper="{ arrow: true }">
          <UButton variant="ghost" icon="i-bx-film" />
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  slide: Object,
})

const slides = computed(() => {
  return [props.slide]
})
</script>

<style scoped></style>
