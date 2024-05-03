<template>
  <div class="profile-modal-ctn flex">
    <div class="profile-modal text-center max-w-48">
      <div class="avatar-ctn bg-primary-100 dark:bg-primary-800 p-4">
        <UAvatar
          alt="Favour Felix"
          size="xl"
          class="border border-primary-200"
        />

        <h5 class="name font-medium text-md mt-4">Favour Felix</h5>
      </div>
      <div class="texts text-center p-4 border-t dark:border-primary-950">
        <div class="church flex gap-2">
          <div class="text-left">
            <p class="text-xs">
              Foursquare Gospel Church In Nigeria
              <span class="text-gray-500">(Salvation Chapel)</span>
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
          @confirm="logOut"
        />
      </div>
    </div>
    <!-- <div class="advert bg-primary-900 p-4 w-20"></div> -->
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string
}>()
const backgroundImages = [
  "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1740",
  "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1740",
  "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1740",
  "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1740",
  "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1740",
  "https://images.unsplash.com/photo-1491396023581-4344e51fec5c?q=80&w=1740",
  "https://images.unsplash.com/photo-1518289646039-3e6c87a5aaf6?q=80&w=1740",
  "https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=1740",
  "https://images.unsplash.com/photo-1579267205095-6b30ba87edba?q=80&w=1740",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1740",
  "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=1740",
  "https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=1740",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1740",
]

const logOut = () => {
  const token = useCookie("token")
  token.value = undefined
  navigateTo("/login")
}
</script>
