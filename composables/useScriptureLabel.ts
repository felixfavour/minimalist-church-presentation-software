/**
 * Function to return scripture in format (book:chapter:verse) from format like (Book chapter:verse)
 * @param label 
 * @returns 
 */
function useScriptureLabel(label: string) {
  const book = label?.slice(0, label?.lastIndexOf(' '))
  const bookIndex = bibleBooks.findIndex(bibleBook => bibleBook.toLowerCase() === book.toLowerCase()) + 1
  const bibleChapterAndVerse = label?.slice(label?.lastIndexOf(' ') + 1)
  return `${bookIndex}:${bibleChapterAndVerse}`
}

export default useScriptureLabel

