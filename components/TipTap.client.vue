<template>
  <div
    v-if="slide.layout === slideLayoutTypes.heading_sub"
    class="flex flex-col gap-2 h-[88%] mt-4 justify-center rounded-md px-12"
  >
    <!-- <TipTapToolbar :editor="focusedEditor" /> -->

    <TiptapEditorContent :editor="editorOne" />
    <TiptapEditorContent :editor="editorTwo" />
  </div>
  <div
    v-else-if="slide.layout === slideLayoutTypes.full_text"
    class="flex flex-col gap-2 h-[88%] mt-4 justify-center rounded-md px-12"
  >
    <!-- <TipTapToolbar :editor="focusedEditor" /> -->

    <TiptapEditorContent :editor="editorTwo" />
  </div>
  <div
    v-else
    class="grid grid-cols-2 gap-2 h-[88%] mt-4 items-center rounded-md px-12"
  >
    <!-- <TipTapToolbar :editor="focusedEditor" /> -->

    <TiptapEditorContent :editor="editorTwo" />
    <TiptapEditorContent :editor="editorThree" />
  </div>
</template>

<script setup lang="ts">
import type { Slide } from "~/types"
import TiptapTextAlign from "@tiptap/extension-text-align"
import TiptapPlaceholder from "@tiptap/extension-placeholder"

const props = defineProps<{
  slide: Slide
  editable: boolean
}>()

const emit = defineEmits(["update", "change-focused-editor"])

watch(
  () => props.slide,
  (newVal, oldVal) => {
    if (newVal?.id !== oldVal?.id) {
      editorOne.value?.commands.setContent(newVal?.contents[0])
      editorTwo.value?.commands.setContent(newVal?.contents[1])
      editorThree.value?.commands.setContent(newVal?.contents[2])
    }
  }
)

const editorOne = ref(
  useEditor({
    content: props.slide.contents[0] || "",
    editable: props.editable,
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
    // onUpdate: ({ editor }) => {
    //   emit("update", 0, editor.getHTML())
    //   // if (!editor.getHTML().includes("<h1>")) {
    //   //   editor.chain().focus().toggleHeading({ level: 1 }).run()
    //   // }
    // },
    onBlur: ({ editor }) => {
      emit("update", 0, editor.getHTML())
      // if (!editor.getHTML().includes("<h1>")) {
      //   editor.chain().focus().toggleHeading({ level: 1 }).run()
      // }
    },
    onFocus: ({ editor }) => {
      emit("change-focused-editor", editor)
    },
  })
)
// editorOne.value.chain().focus().toggleHeading({ level: 1 }).run()
const editorTwo = ref(
  useEditor({
    content: props.slide.contents[1] || "",
    editable: props.editable,
    extensions: [
      TiptapStarterKit,
      TiptapTextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TiptapPlaceholder.configure({
        placeholder: "Full (richtext) content goes here",
      }),
    ],
    // onUpdate: ({ editor }) => {
    //   emit("update", 1, editor.getHTML())
    // },
    onBlur: ({ editor }) => {
      emit("update", 1, editor.getHTML())
    },
    onFocus: ({ editor }) => {
      emit("change-focused-editor", editor)
    },
  })
)
// editorOne.value.chain().focus().toggleHeading({ level: 1 }).run()
const editorThree = ref(
  useEditor({
    content: props.slide.contents[2] || "",
    editable: props.editable,
    extensions: [
      TiptapStarterKit,
      TiptapTextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TiptapPlaceholder.configure({
        placeholder: "Full (richtext) content goes here",
      }),
    ],
    // onUpdate: ({ editor }) => {
    //   emit("update", 2, editor.getHTML())
    // },
    onBlur: ({ editor }) => {
      emit("update", 2, editor.getHTML())
    },
    onFocus: ({ editor }) => {
      emit("change-focused-editor", editor)
    },
  })
)
</script>
