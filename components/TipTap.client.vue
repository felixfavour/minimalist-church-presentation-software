<template>
  <div
    v-if="layout === slideLayoutTypes.heading_sub"
    class="flex flex-col gap-2 h-[88%] mt-4 justify-center rounded-md px-12"
  >
    <!-- <TipTapToolbar :editor="editorOne" /> -->
    <TiptapEditorContent :editor="editorOne" />

    <!-- <TipTapToolbar :editor="editorTwo" /> -->
    <TiptapEditorContent :editor="editorTwo" />
  </div>
  <div
    v-else-if="layout === slideLayoutTypes.full_text"
    class="flex flex-col gap-2 h-[88%] mt-4 justify-center rounded-md px-12"
  >
    <!-- <TipTapToolbar :editor="editorTwo" /> -->
    <TiptapEditorContent :editor="editorTwo" />
  </div>
  <div
    v-else
    class="grid grid-cols-2 gap-2 h-[88%] mt-4 justify-center rounded-md px-12"
  >
    <!-- <TipTapToolbar :editor="editorTwo" /> -->
    <TiptapEditorContent :editor="editorTwo" />

    <!-- <TipTapToolbar :editor="editorThree" /> -->
    <TiptapEditorContent :editor="editorThree" />
  </div>
</template>

<script setup>
import TiptapTextAlign from "@tiptap/extension-text-align"
import TiptapPlaceholder from "@tiptap/extension-placeholder"

const props = defineProps({
  layout: {
    type: String,
    default: slideLayoutTypes.heading_sub,
  },
})

console.log(props.layout)

const emit = defineEmits(["update"])
const editorOne = ref(
  useEditor({
    content: "",
    extensions: [
      TiptapStarterKit,
      TiptapTextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TiptapPlaceholder.configure({
        placeholder: "Your title here",
      }),
    ],
    onCreate: ({ editor }) => {
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    },
    onUpdate: ({ editor }) => {
      emit("update", editor.getHTML())
      if (!editor.getHTML().includes("<h1>")) {
        editor.chain().focus().toggleHeading({ level: 1 }).run()
      }
    },
  })
)
// editorOne.value.chain().focus().toggleHeading({ level: 1 }).run()
const editorTwo = ref(
  useEditor({
    content: "",
    extensions: [
      TiptapStarterKit,
      TiptapTextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TiptapPlaceholder.configure({
        placeholder: "Full content goes here",
      }),
    ],
    onUpdate: ({ editor }) => {
      emit("update", editor.getHTML())
    },
  })
)
// editorOne.value.chain().focus().toggleHeading({ level: 1 }).run()
const editorThree = ref(
  useEditor({
    content: "",
    extensions: [
      TiptapStarterKit,
      TiptapTextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TiptapPlaceholder.configure({
        placeholder: "Full content goes here",
      }),
    ],
    onUpdate: ({ editor }) => {
      emit("update", editor.getHTML())
    },
  })
)
</script>
