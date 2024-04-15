import type { Slide } from "~/types/index"
import { backgroundTypes } from "~/utils/constants"

const useSlideName = (slide: Slide) => {
  console.log(slide)
  switch (slide?.type) {
    case slideTypes.media:
      return slide?.data?.name
    case slideTypes.song:
      return slide?.data?.title
    case slideTypes.text:
      if (slideLayoutTypes.heading_sub === slide.layout) {
        return slide.contents?.[0]?.replaceAll('<br>', '\n')?.replaceAll('</p>', '\n')?.replace(/<[^>]*>/g, '')?.split('\n')?.[0]
      }
      return slide.contents?.[1]?.replaceAll('<br>', '\n')?.replaceAll('</p>', '\n')?.replace(/<[^>]*>/g, '')?.split('\n')?.[0]
    case slideTypes.hymn:
      return `Hymn ${slide?.songId}`
    default:
      return `${slide?.title}`
  }
  return ''
}

export default useSlideName