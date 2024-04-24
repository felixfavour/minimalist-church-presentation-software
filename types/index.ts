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
  data?: Song | Scripture | Hymn // for song/bible/hymn/file, Object mapped to Slide only on client
  slideStyle?: SlideStyle
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

export interface BibleVerse {
  book: string
  chapter: string
  verse: string
  scripture: string
}

export interface Hymn {
  number: string
  title: string
  chorus: string
  verses: Array<string>
  author: string
  source: string
  meta: string
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
  blur?: number
  brightness?: number
  alignment?: string
  font?: string
}

export interface AppSettings {
  appVersion: string,
  defaultBibleVersion: string,
  defaultBackground: {
    hymn: { backgroundType: string, background: string },
    bible: { backgroundType: string, background: string },
    text: { backgroundType: string, background: string },
  },
  slideStyles: SlideStyle
}
