<template>
  <div>
    <UTooltip :text="header" :popper="{ placement: 'top' }">
      <UButton :icon="buttonIcon" :button-size="buttonSize || 'xs'" variant="ghost" :color="buttonColor"
        :class="buttonStyles" @click.stop.prevent="isOpen = true">{{ buttonLabel }}
      </UButton>
    </UTooltip>

    <UModal v-model="isOpen" :ui="{
      width: 'w-full sm:max-w-sm',
    }">
      <div class="p-6">
        <Placeholder>
          <div class="flex flex-col justify-center h-full">
            <h4 class="text-md font-medium">{{ header }}</h4>
            <p class="mt-2 text-xs">{{ label }}</p>
            <div class="flex items-center justify-end gap-2 mt-6">
              <UButton variant="outline" color="gray" @click="handleCancel">Cancel</UButton>
              <UButton :color="header?.split(' ')[0] === 'Delete' ? 'red' : 'primary'" @click="handleYesAction">{{
                header?.split(" ")[0]
              }}</UButton>
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
  buttonColor: string
  buttonSize: string
  buttonStyles: string
  header: string
  label: string
}>()
const emit = defineEmits(["confirm"])

const handleYesAction = () => {
  emit("confirm")
  isOpen.value = false
}

const handleCancel = () => {
  isOpen.value = false
}
</script>
