import type { BibleVerse } from '~/types'

/**
 * Composable for navigating between scripture chapters
 * Handles chapter boundaries and book boundaries
 */
export default function useChapterNavigation() {
  const db = useIndexedDB()
  
  // Cache Bible data by version to avoid repeated database queries
  const bibleDataCache = new Map<string, BibleVerse[]>()
  
  /**
   * Get Bible data for a version (with caching)
   */
  const getBibleData = async (version: string): Promise<BibleVerse[]> => {
    if (bibleDataCache.has(version)) {
      return bibleDataCache.get(version)!
    }
    
    const data = (await db.bibleAndHymns.get(version))?.data as unknown as BibleVerse[]
    if (data) {
      bibleDataCache.set(version, data)
    }
    return data
  }

  /**
   * Get the maximum verse number for a given chapter
   */
  const getMaxVerseInChapter = async (
    book: number,
    chapter: number,
    version: string
  ): Promise<number> => {
    try {
      const bibleData = await getBibleData(version)
      
      // Find all verses in this chapter
      const chapterVerses = bibleData?.filter(
        (verse: BibleVerse) =>
          Number(verse.book) === book && Number(verse.chapter) === chapter
      )
      
      if (!chapterVerses || chapterVerses.length === 0) {
        return 0
      }
      
      // Get the maximum verse number
      return Math.max(...chapterVerses.map(v => Number(v.verse)))
    } catch (err) {
      console.error('Error getting max verse:', err)
      return 0
    }
  }

  /**
   * Check if a chapter exists in a book
   */
  const chapterExists = async (
    book: number,
    chapter: number,
    version: string
  ): Promise<boolean> => {
    const maxVerse = await getMaxVerseInChapter(book, chapter, version)
    return maxVerse > 0
  }

  /**
   * Get the next chapter reference
   * Handles chapter and book boundaries
   * Returns null if at the end of the Bible (Revelation 22)
   */
  const getNextChapter = async (
    currentLabel: string,
    version: string
  ): Promise<string | null> => {
    const parts = currentLabel.split(':')
    const book = Number(parts[0])
    const chapter = Number(parts[1])
    
    // Try next chapter in current book
    const nextChapterNum = chapter + 1
    const nextChapterExists = await chapterExists(book, nextChapterNum, version)
    
    if (nextChapterExists) {
      return `${book}:${nextChapterNum}:1`
    }
    
    // Try first chapter of next book
    const nextBook = book + 1
    if (nextBook <= 66) { // Bible has 66 books
      const firstChapterExists = await chapterExists(nextBook, 1, version)
      if (firstChapterExists) {
        return `${nextBook}:1:1`
      }
    }
    
    return null // End of Bible
  }

  /**
   * Get the previous chapter reference
   * Handles chapter and book boundaries
   * Returns null if at the beginning of the Bible (Genesis 1)
   */
  const getPreviousChapter = async (
    currentLabel: string,
    version: string
  ): Promise<string | null> => {
    const parts = currentLabel.split(':')
    const book = Number(parts[0])
    const chapter = Number(parts[1])
    
    // If not in first chapter, go to previous chapter
    if (chapter > 1) {
      const prevChapterNum = chapter - 1
      const maxVerse = await getMaxVerseInChapter(book, prevChapterNum, version)
      if (maxVerse > 0) {
        return `${book}:${prevChapterNum}:${maxVerse}`
      }
    }
    
    // Try last chapter of previous book
    if (book > 1) {
      const prevBook = book - 1
      
      // Get Bible data (using cache)
      const bibleData = await getBibleData(version)
      const prevBookVerses = bibleData?.filter(
        (verse: BibleVerse) => Number(verse.book) === prevBook
      )
      
      if (prevBookVerses && prevBookVerses.length > 0) {
        // Find the maximum chapter number
        const maxChapter = Math.max(...prevBookVerses.map(v => Number(v.chapter)))
        // Find max verse in that chapter directly from filtered data
        const lastChapterVerses = prevBookVerses.filter(
          v => Number(v.chapter) === maxChapter
        )
        const maxVerse = Math.max(...lastChapterVerses.map(v => Number(v.verse)))
        return `${prevBook}:${maxChapter}:${maxVerse}`
      }
    }
    
    return null // Beginning of Bible
  }

  /**
   * Get the next verse reference with chapter boundary handling
   */
  const getNextVerse = async (
    currentLabel: string,
    version: string
  ): Promise<string | null> => {
    const parts = currentLabel.split(':')
    const book = Number(parts[0])
    const chapter = Number(parts[1])
    let verse = Number(parts[2])
    
    // Handle verse ranges (e.g., "1-5")
    if (parts[2]?.includes('-')) {
      const rangeParts = parts[2].split('-')
      verse = Number(rangeParts[1]) // Use end of range
    }
    
    const maxVerse = await getMaxVerseInChapter(book, chapter, version)
    
    if (verse < maxVerse) {
      // Next verse in current chapter
      return `${book}:${chapter}:${verse + 1}`
    }
    
    // At chapter boundary, move to next chapter
    return await getNextChapter(currentLabel, version)
  }

  /**
   * Get the previous verse reference with chapter boundary handling
   */
  const getPreviousVerse = async (
    currentLabel: string,
    version: string
  ): Promise<string | null> => {
    const parts = currentLabel.split(':')
    const book = Number(parts[0])
    const chapter = Number(parts[1])
    let verse = Number(parts[2])
    
    // Handle verse ranges (e.g., "1-5")
    if (parts[2]?.includes('-')) {
      const rangeParts = parts[2].split('-')
      verse = Number(rangeParts[0]) // Use start of range
    }
    
    if (verse > 1) {
      // Previous verse in current chapter
      return `${book}:${chapter}:${verse - 1}`
    }
    
    // At chapter boundary, move to previous chapter
    return await getPreviousChapter(currentLabel, version)
  }

  return {
    getMaxVerseInChapter,
    chapterExists,
    getNextChapter,
    getPreviousChapter,
    getNextVerse,
    getPreviousVerse,
  }
}
