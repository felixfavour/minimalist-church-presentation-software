<template>
  <div class="profile-modal-ctn flex">
    <div class="profile-modal text-center max-w-52">
      <div class="avatar-ctn bg-primary-100 dark:bg-primary-800 p-4">
        <UAvatar
          alt="Favour Felix"
          size="xl"
          class="border border-primary-200"
        />

        <h5 class="name font-medium text-md mt-4">{{ user?.fullname }}</h5>
      </div>
      <div
        v-if="church?.name && church?.type"
        class="texts text-center p-4 border-t dark:border-primary-950"
      >
        <div class="church flex gap-2">
          <div class="text-left">
            <p class="text-md font-semibold">
              {{ church?.type }}
              <span class="text-gray-500 text-xs font-normal block">{{
                church?.name
              }}</span>
            </p>
          </div>
        </div>
      </div>

      <div
        class="actions p-4 flex flex-col gap-2 border-t dark:border-primary-950"
      >
        <UButton
          to="https://cloudofworshippers.featurebase.app"
          target="_blank"
          icon="i-bxs-heart"
          variant="outline"
          block
          >Share Feedback</UButton
        >
        <ConfirmDialog
          button-label="Sign out"
          button-icon="i-bx-log-out"
          button-color="red"
          button-variant="solid"
          button-size="md"
          no-tooltip
          header="Sign out"
          button-styles="p-1 px-2 text-xs"
          label="Are you sure you want to sign out of your account?"
          @confirm="authStore.signOut()"
        />
      </div>
    </div>
    <!-- <div class="advert bg-primary-900 p-4 w-20"></div> -->
  </div>
</template>

<script setup lang="ts">
import type { Church, User } from "~/store/auth"
import { useAuthStore } from "~/store/auth"

defineProps<{
  value: string
  user: User
  church: Church
}>()

const authStore = useAuthStore()
</script>
