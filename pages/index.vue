<template>
  <div class="flex mt-4 gap-2 px-4">
    <ClientOnly>
      <div class="absolute bg-white text-sm">
        {{ $pwa }}
      </div>
    </ClientOnly>
    <QuickActions />
    <PreviewContent />
    <LiveOutput />
  </div>
</template>
<script setup></script>

<style scoped></style>
