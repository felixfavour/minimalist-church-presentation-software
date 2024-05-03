<template>
  <div class="app-ctn max-h-[100vh] overflow-hidden">
    <Navbar :app-version="appVersion" />
    <slot />
  </div>
</template>

<script setup>
useHead({
  title: "Cloud of Worshippers",
})
defineProps({
  appVersion: String,
})

// const router = useRouter()
// const token = useCookie("token")
// if (!token.value) {
//   router.push("/login")
// }
</script>

<style scoped></style>
