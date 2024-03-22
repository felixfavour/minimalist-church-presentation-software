export interface Slide {
  id: string
  name: string
  type: string
  layout: string
  contents: Array<string>
  backgroundType?: string
  background?: string
}