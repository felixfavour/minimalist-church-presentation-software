<template>
  <section
    class="flex-1 rounded-xl border border-primary-100 dark:border-primary-900 h-[100vh] max-h-[calc(100vh-80px)] overflow-hidden"
  >
    <div
      class="heading p-2 px-3 bg-primary-100 dark:bg-primary-900 border dark:border-none rounded-t-lg"
    >
      <h2
        class="font-medium text-sm flex items-center top-0 bottom-[auto]"
        :class="[secondaryButtons ? 'justify-between' : '', headingStyles]"
      >
        <template v-if="subHeading">
          <UTooltip text="Go back">
            <UButton
              variant="ghost"
              class="p-1 px-2 text-black"
              @click="$emit('header-click')"
              >{{ heading }}</UButton
            >
          </UTooltip>
          <IconWrapper name="i-bx-chevron-right" class="text-primary" />
          <span
            class="pl-2 text-gray-600 dark:text-primary-200 font-normal capitalize"
            >{{ subHeading }}</span
          >
        </template>
        <span v-else class="p-1 px-2 whitespace-nowrap truncate">
          {{ heading }}
        </span>
        <div class="actions flex flex-row-reverse items-center gap-1">
          <div class="action-inner" v-for="secondaryButton in secondaryButtons">
            <ConfirmDialog
              v-if="secondaryButton.visible && secondaryButton.confirmAction"
              :button-label="secondaryButton.label"
              :button-icon="secondaryButton.icon"
              :button-color="secondaryButton.color"
              button-size="md"
              header="Delete selected slides"
              button-styles="p-1 px-2"
              label="Are you sure you want to delete all of the selected slides? This action is irreversible."
              @confirm="$emit(secondaryButton.action, slide?.id)"
            >
            </ConfirmDialog>
            <UButton
              v-if="secondaryButton.visible && !secondaryButton.confirmAction"
              class="p-1 px-2 whitespace-nowrap"
              :class="
                isLiveWindowActive && secondaryButton.action === 'go-live'
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              "
              size="md"
              :variant="secondaryButton?.variant || 'ghost'"
              :color="secondaryButton.color"
              :icon="secondaryButton.icon"
              :target="secondaryButton.action === 'go-live' ? false : false"
              :to="secondaryButton.action === 'go-live' ? '#' : '#'"
              @click="
                useGlobalEmit(
                  isLiveWindowActive &&
                    secondaryButton.action === appWideActions.goLive
                    ? ''
                    : secondaryButton.action
                )
              "
              >{{
                isLiveWindowActive &&
                secondaryButton.action === appWideActions.goLive
                  ? "You are live"
                  : secondaryButton.label
              }}</UButton
            >
          </div>
        </div>
      </h2>
    </div>
    <div :class="`slot-ctn p-3 text-sm ${slotCtnStyles || ''}`">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
import { useAppStore } from "@/store/app"
import { appWideActions } from "~/utils/constants"
const props = defineProps({
  heading: String,
  subHeading: String,
  slotCtnStyles: String,
  headingStyles: String,
  secondaryButtons: Array,
  isLiveWindowActive: Boolean,
})
const appStore = useAppStore()
const { activeLiveWindows } = storeToRefs(appStore)
</script>

<style scoped></style>
