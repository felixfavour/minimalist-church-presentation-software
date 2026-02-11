import type { BibleVerse } from '~/types'
import { bibleBooks, chaptersPerBook } from '~/utils/constants'

/**
 * Composable for navigating between Bible chapters
 * Handles sequential navigation like Genesis 1 -> Genesis 2 or Genesis 50 -> Exodus 1
 */
export default function useChapterNavigation() {
  /**
   * Get the next chapter reference from a current scripture reference
   * @param shortLabel - Scripture in short format (e.g., "1:1:31" for Genesis 1:31)
   * @param version - Bible version
   * @returns Next chapter reference in short format or null if at the end of the Bible
   */
  const getNextChapter = async (
    shortLabel: string,
    version: string = 'KJV'
  ): Promise<string | null> => {
    const parts = shortLabel.split(':')
    const currentBook = Number(parts[0])
    const currentChapter = Number(parts[1])

    // Check if we're at the last book and last chapter
    if (currentBook === bibleBooks.length && currentChapter >= chaptersPerBook[currentBook - 1]) {
      return null // End of Bible (Revelation 22)
    }

    // Check if we need to move to the next book
    if (currentChapter >= chaptersPerBook[currentBook - 1]) {
      // Move to chapter 1 of next book
      return `${currentBook + 1}:1:1`
    }

    // Move to next chapter in same book
    return `${currentBook}:${currentChapter + 1}:1`
  }

  /**
   * Get the previous chapter reference from a current scripture reference
   * @param shortLabel - Scripture in short format (e.g., "2:1:1" for Exodus 1:1)
   * @param version - Bible version
   * @returns Previous chapter reference in short format or null if at the beginning of the Bible
   */
  const getPreviousChapter = async (
    shortLabel: string,
    version: string = 'KJV'
  ): Promise<string | null> => {
    const parts = shortLabel.split(':')
    const currentBook = Number(parts[0])
    const currentChapter = Number(parts[1])

    // Check if we're at the first book and first chapter
    if (currentBook === 1 && currentChapter <= 1) {
      return null // Beginning of Bible (Genesis 1)
    }

    // Check if we need to move to the previous book
    if (currentChapter <= 1) {
      // Move to last chapter of previous book
      const previousBook = currentBook - 1
      const lastChapterOfPreviousBook = chaptersPerBook[previousBook - 1]
      return `${previousBook}:${lastChapterOfPreviousBook}:1`
    }

    // Move to previous chapter in same book
    return `${currentBook}:${currentChapter - 1}:1`
  }

  /**
   * Check if navigation to next chapter is possible
   * @param shortLabel - Scripture in short format
   * @returns true if next chapter exists
   */
  const hasNextChapter = (shortLabel: string): boolean => {
    const parts = shortLabel.split(':')
    const currentBook = Number(parts[0])
    const currentChapter = Number(parts[1])

    // At the end of the Bible
    if (currentBook === bibleBooks.length && currentChapter >= chaptersPerBook[currentBook - 1]) {
      return false
    }

    return true
  }

  /**
   * Check if navigation to previous chapter is possible
   * @param shortLabel - Scripture in short format
   * @returns true if previous chapter exists
   */
  const hasPreviousChapter = (shortLabel: string): boolean => {
    const parts = shortLabel.split(':')
    const currentBook = Number(parts[0])
    const currentChapter = Number(parts[1])

    // At the beginning of the Bible
    if (currentBook === 1 && currentChapter <= 1) {
      return false
    }

    return true
  }

  /**
   * Get the last verse number in a specific chapter
   * This function queries the database to find the actual last verse
   * @param book - Book number (1-66)
   * @param chapter - Chapter number
   * @param version - Bible version
   * @returns Last verse number or 1 as fallback
   */
  const getLastVerseInChapter = async (
    book: number,
    chapter: number,
    version: string = 'KJV'
  ): Promise<number> => {
    try {
      const db = useIndexedDB()
      const bibleData = (await db.bibleAndHymns.get(version))?.data as unknown as BibleVerse[]

      if (!bibleData) {
        return 1
      }

      // Find all verses in this chapter
      const versesInChapter = bibleData.filter(
        (verse: BibleVerse) =>
          Number(verse.book) === book && Number(verse.chapter) === chapter
      )

      if (versesInChapter.length === 0) {
        return 1
      }

      // Get the highest verse number
      const lastVerse = Math.max(
        ...versesInChapter.map((v: BibleVerse) => Number(v.verse))
      )

      return lastVerse
    } catch (err) {
      console.error('Error getting last verse:', err)
      return 1
    }
  }

  /**
   * Determine if we should navigate to next chapter based on current verse
   * @param shortLabel - Current scripture reference in short format
   * @param version - Bible version
   * @returns true if at the last verse of a chapter
   */
  const isAtLastVerse = async (
    shortLabel: string,
    version: string = 'KJV'
  ): Promise<boolean> => {
    const parts = shortLabel.split(':')
    const book = Number(parts[0])
    const chapter = Number(parts[1])
    const verse = Number(parts[2])

    const lastVerse = await getLastVerseInChapter(book, chapter, version)
    return verse >= lastVerse
  }

  /**
   * Get next verse, automatically moving to next chapter if needed
   * @param shortLabel - Current scripture in short format
   * @param version - Bible version
   * @returns Next verse reference or null if at end of Bible
   */
  const getNextVerse = async (
    shortLabel: string,
    version: string = 'KJV'
  ): Promise<string | null> => {
    const parts = shortLabel.split(':')
    const book = Number(parts[0])
    const chapter = Number(parts[1])
    const verse = Number(parts[2])

    // Check if we're at the last verse of the chapter
    const atLastVerse = await isAtLastVerse(shortLabel, version)

    if (atLastVerse) {
      // Move to next chapter
      return await getNextChapter(shortLabel, version)
    }

    // Move to next verse in same chapter
    return `${book}:${chapter}:${verse + 1}`
  }

  /**
   * Get previous verse, automatically moving to previous chapter if needed
   * @param shortLabel - Current scripture in short format
   * @param version - Bible version
   * @returns Previous verse reference or null if at beginning of Bible
   */
  const getPreviousVerse = async (
    shortLabel: string,
    version: string = 'KJV'
  ): Promise<string | null> => {
    const parts = shortLabel.split(':')
    const book = Number(parts[0])
    const chapter = Number(parts[1])
    const verse = Number(parts[2])

    // If at verse 1, move to previous chapter's last verse
    if (verse <= 1) {
      const prevChapter = await getPreviousChapter(shortLabel, version)
      if (!prevChapter) return null

      const prevParts = prevChapter.split(':')
      const prevBook = Number(prevParts[0])
      const prevChapterNum = Number(prevParts[1])

      // Get the last verse of the previous chapter
      const lastVerse = await getLastVerseInChapter(prevBook, prevChapterNum, version)
      return `${prevBook}:${prevChapterNum}:${lastVerse}`
    }

    // Move to previous verse in same chapter
    return `${book}:${chapter}:${verse - 1}`
  }

  return {
    getNextChapter,
    getPreviousChapter,
    hasNextChapter,
    hasPreviousChapter,
    getLastVerseInChapter,
    isAtLastVerse,
    getNextVerse,
    getPreviousVerse,
  }
}
