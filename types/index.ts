export interface Slide {
  id: string
  name: string
  type: string
  layout: string
  contents: Array<string>
  backgroundType?: string
  background?: string
  title?: string // For hymn and song titles, also for scripture labels (e.g Ephesians 3:1)
  songId?: string // only for hymns/songs, could be [hymn.number] or [song.id]
  hasChorus?: boolean // only for hymns, to tell if the hymns include a chorus
}

export interface QuickAction {
  icon: string
  name: string
  desc: string
  type: string
  action: string
  unreleased: boolean
  bibleBookIndex?: string
  bibleChapterAndVerse?: string
  hymnIndex?: string
  searchableOnly?: boolean
}

export interface Scripture {
  label: string
  labelShortFormat: string
  version: string
  content: string
}

export interface Hymn {
  number: string
  title: string
  titleWithHymnNumber: string
  chorus: string
  verses: Array<string>
  sound: string
  category: string
}

export interface Song {
  id: string
  lyrics: string
  title: string
  album: string
  cover: string
  artist: string
  verses: Array<string>
}

export interface SlideStyle {
  blur: number
  brightness: number
}
