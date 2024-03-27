<template>
  <div>
    <UButton :icon="buttonIcon" size="xs" variant="ghost" class="px-1.5" @click="isOpen = true">{{ buttonLabel }}
    </UButton>

    <UModal v-model="isOpen">
      <div class="p-6">
        <Placeholder class="h-48">
          <div class="flex flex-col justify-center h-full">
            <h4 class="text-lg font-medium">{{ header }}</h4>
            <p class="mt-2 text-sm">{{ label }}</p>
            <div class="flex items-center justify-end gap-2 mt-4">
              <UButton variant="outline" color="black" @click="handleCancel">Cancel</UButton>
              <UButton color="red" @click="handleYesAction">{{ header?.split(' ')[0] }}</UButton>
            </div>
          </div>
        </Placeholder>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const props = defineProps<{
  buttonIcon: string
  buttonLabel: string
  header: string
  label: string
}>()
const emit = defineEmits(['confirm'])

const handleYesAction = () => {
  emit('confirm')
  isOpen.value = false
}

const handleCancel = () => {
  isOpen.value = false
}
</script>


