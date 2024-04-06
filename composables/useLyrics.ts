import type { Song } from '~/types'
import songsObj from '../public/songs.json'
import useURLFriendlyString from './useURLFriendlyString'

const addIdToReturnedSongs = (songs: Array<Song>) => {
  return songs?.map((song) => ({
    ...song,
    id: useURLFriendlyString(`${song.artist} ${song.title}`),
  }))
}

const useLyrics = (song: Song, linesPerDisplay: number = 4): Song | null => {
  const toast = useToast()

  try {

    // Divide songs into verses
    const verses = []
    let tempVerse = ''
    let lineCount = 0
    const lyricLines = song.lyrics?.split('\n')

    for (let i = 0; i < lyricLines.length; i++) {
      let line = lyricLines[i]
      if (line.toLocaleLowerCase().includes('[verse') || line.toLocaleLowerCase().includes('[intro]') || line.toLocaleLowerCase().includes('[chorus]')) {
        continue
      }
      line = line.replaceAll("â", "'").replaceAll('solo: ', '')
      tempVerse += `${line}\n`
      lineCount += 1

      if (lineCount === linesPerDisplay) {
        verses.push(tempVerse)
        lineCount = 0
        tempVerse = ''
      }

      if ((lyricLines.length - i) === 1) {
        verses.push(tempVerse)
      }
    }

    song.verses = verses
    return song
  } catch (err) {
    toast.add({ title: 'Song not found', icon: 'i-bx-music', color: 'red' })
  }
  return null
}

export default useLyrics

