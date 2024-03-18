<template>
  <div
    class="live-output w-[100%] min-h-[220px] rounded-md relative overflow-hidden border bg-cover bg-no-repeat"
    :class="{ 'h-[100vh] rounded-none border-none': fullScreen }"
    style="
      background-image: url(https://media.istockphoto.com/id/1333460374/photo/african-megacity-lagos-nigeria.jpg?s=612x612&w=0&k=20&c=Gu5TRHGNLRRF43YFMlDFnpkk7TBz00U8olxUqsoeiw8=);
    "
  >
    <div
      v-if="!fullScreen || slideLabel"
      class="overlay-gradient absolute inset-0"
    ></div>
    <div
      v-if="!fullScreen || slideLabel"
      class="heading p-3 absolute z-1 inset-0"
    >
      <h5 class="font-semibold text-white">
        {{ slide?.name || "No Live Slide" }}
        <span v-html="activeSlide"></span>
      </h5>
      <LiveSlideIndicator :visible="!!slide?.name" class="mr-4 mt-4" />
    </div>

    <div class="live-content">
      <div class="test" v-html="slide"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  slideLabel: {
    type: Boolean,
    default: true,
  },
  slide: Object,
  fullScreen: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped></style>
