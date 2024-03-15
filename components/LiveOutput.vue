<template>
  <AppSection heading="Live Output">
    <div class="main">
      <div
        class="slides-ctn h-[calc(100vh-80px-220px-80px)] overflow-auto mb-4"
      >
        <SlideCard
          v-for="slide in slides"
          :key="slide.name"
          :slide="slide"
          :live="liveSlide?.name === slide?.name"
          @click="takeSlideLive(slide)"
        />
      </div>
      <div
        class="live-output w-[100%] min-h-[220px] rounded-md relative overflow-hidden border"
        style="
          background-image: url(https://media.istockphoto.com/id/1333460374/photo/african-megacity-lagos-nigeria.jpg?s=612x612&w=0&k=20&c=Gu5TRHGNLRRF43YFMlDFnpkk7TBz00U8olxUqsoeiw8=);
        "
      >
        <div class="overlay-gradient absolute inset-0"></div>
        <div class="heading p-3 absolute z-1 inset-0">
          <h5 class="font-semibold text-white">
            {{ liveSlide?.name || "No Live Slide" }}
          </h5>
          <LiveSlideIndicator :visible="liveSlide?.name" class="mr-4 mt-4" />
        </div>
      </div>
    </div>
  </AppSection>
</template>

<script setup>
const slides = ref([
  {
    name: "Slide 1",
    type: slideTypes.lyrics,
  },
  {
    name: "Slide 2",
    type: slideTypes.lyrics,
  },
  {
    name: "Slide 3",
    type: slideTypes.lyrics,
  },
  {
    name: "Slide 4",
    type: slideTypes.sermon,
  },
  {
    name: "Slide 5",
    type: slideTypes.sermon,
  },
  {
    name: "Slide 6",
    type: slideTypes.bible,
  },
  {
    name: "Slide 7",
    type: slideTypes.sermon,
  },
  {
    name: "Slide 8",
    type: slideTypes.misc,
  },
  {
    name: "Slide 9",
    type: slideTypes.carousel,
  },
  {
    name: "Slide 10",
    type: slideTypes.misc,
  },
])
const liveSlide = ref()

const takeSlideLive = (slide) => {
  liveSlide.value = slide
}
</script>

<style scoped></style>
