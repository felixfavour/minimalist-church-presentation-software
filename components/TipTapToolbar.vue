<template>
  <div v-if="editor" class="my-2 flex gap-1 w-[100%] overflow-auto absolute z-10 bg-white p-1 right-0 left-0 top-[45px]">
    <UButton @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'bg-primary text-white': editor.isActive('bold') }" icon="i-bx-bold" variant="ghost" />
    <UButton @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'bg-primary text-white': editor.isActive('italic') }" icon="i-bx-italic" variant="ghost" />
    <UButton @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'bg-primary text-white': editor.isActive('strike') }" icon="i-bx-strikethrough" variant="ghost" />
    <UButton @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'bg-primary text-white': editor.isActive('code') }" icon="i-bx-code" variant="ghost" />
    <div class="button-group bg-primary-100 rounded-md mx-1 p-1 flex items-center gap-1">
      <UButton v-for="headingSize in 4" :key="`heading-size-${headingSize}`" @click="
        editor.chain().focus().toggleHeading({ level: headingSize }).run()
        " :class="{
    'bg-primary text-white': editor.isActive('heading', {
      level: headingSize,
    }),
  }" :icon="`i-lucide-heading-${headingSize}`" variant="ghost" />
    </div>
    <UButton @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'bg-primary text-white': editor.isActive('paragraph') }" icon="i-bx-paragraph" variant="ghost" />
    <UButton @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'bg-primary text-white': editor.isActive('bulletList') }" icon="i-bx-list-ul" variant="ghost" />
    <UButton @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'bg-primary text-white': editor.isActive('orderedList') }" icon="i-bx-list-ol" variant="ghost" />
    <div class="button-group bg-primary-100 rounded-md mx-1 p-1 flex items-center gap-1">
      <UButton @click="editor.chain().focus().setTextAlign('left').run()" :class="{
        'bg-primary text-white': editor.isActive({ textAlign: 'left' }),
      }" icon="i-bi-text-left" variant="ghost" />
      <UButton @click="editor.chain().focus().setTextAlign('center').run()" :class="{
        'bg-primary text-white': editor.isActive({ textAlign: 'center' }),
      }" icon="i-bi-text-center" variant="ghost" />
      <UButton @click="editor.chain().focus().setTextAlign('right').run()" :class="{
        'bg-primary text-white': editor.isActive({ textAlign: 'right' }),
      }" icon="i-bi-text-right" variant="ghost" />
    </div>
    <UButton @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'bg-primary text-white': editor.isActive('codeBlock') }" icon="i-bx-code-curly" variant="ghost" />
    <UButton @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'bg-primary text-white': editor.isActive('blockquote') }" icon="i-bx-bxs-quote-right" variant="ghost" />
  </div>
</template>

<script setup>
const props = defineProps({
  editor: Object,
})
</script>

<style scoped></style>
