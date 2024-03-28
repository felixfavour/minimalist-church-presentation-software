export interface Slide {
  id: string
  name: string
  type: string
  layout: string
  contents: Array<string>
  backgroundType?: string
  background?: string
  scripture?: string
}

export interface QuickAction {
  icon: string
  name: string
  desc: string
  action: string
  bibleBookIndex: string
  bibleChapterAndVerse: string
  unreleased: boolean
}

export interface Scripture {
  label: string
  labelShortFormat: string
  version: string
  content: string
}

export interface SlideStyle {
  blur: number
  brightness: number
}
