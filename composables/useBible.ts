import kjvBible from '../public/large_assets/kjv.json'

const useBible = (passage: string) => {
  const toast = useToast()

  const passageDissected = passage.split(':')
  const book = passageDissected?.[0] || "1"
  const chapter = passageDissected?.[1] || "1"
  const verse = passageDissected?.[2] || "1"
  let scripture = ''

  try {
    scripture = kjvBible.find(passage => passage.book === book && passage.chapter === chapter && passage.verse === verse).scripture
    return {
      reference: `${bibleBooks?.[Number(book) - 1]} ${chapter}:${verse}`,
      scripture,
      version: 'KJV',
      shortFormat: passage
    }
  } catch (err) {
    toast.add({ title: 'Bible verse does not exist', icon: 'i-bx-error', color: 'red' })
  }

  return null
}

export default useBible