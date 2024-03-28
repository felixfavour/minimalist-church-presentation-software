import { Scripture } from '~/types'
import kjvBible from '../public/large_assets/kjv.json'
import useScriptureLabel from './useScriptureLabel'

const useScripture = (label: string = '1:1:1', version: string = 'KJV'): Scripture | null => {

  // console.log('label', label)
  // console.log('label', label)
  const toast = useToast()

  const shortLabelSplitted = label.split(':')
  const book = shortLabelSplitted?.[0] || "1"
  const chapter = shortLabelSplitted?.[1] || "1"
  const verse = shortLabelSplitted?.[2] || "1"
  let scripture = ''

  try {
    // console.log(passageSplitted)
    scripture = kjvBible?.find((scripture: any) => scripture.book === book && scripture.chapter === chapter && scripture.verse === verse).scripture
    return {
      label: `${bibleBooks?.[Number(book) - 1]} ${chapter}:${verse}`,
      content: scripture,
      version,
      labelShortFormat: label
    }
  } catch (err) {
    toast.add({ title: 'Scripture not found', icon: 'i-bx-error', color: 'red' })
  }

  return null
}

export default useScripture

