import { Song } from '~/types'
import useURLFriendlyString from './useURLFriendlyString'

const useLyrics = (songId: string, linesPerDisplay: number = 4): Song | null => {
  const toast = useToast()
  const songsObj = inject('songs')
  let songs = Object.values(songsObj) as Array<Song>

  // Give each song an ID with their title and artist
  songs = songs.map(song => ({
    ...song,
    id: useURLFriendlyString(`${song.artist} ${song.title}`)
  }))
  console.log(songs[0].id)


  try {
    const song = songs.find(song => song.id === songId) as Song

    // Divide songs into verses
    const verses = []
    let tempVerse = ''
    let lineCount = 0
    const lyricLines = song.lyrics?.split('\n')

    for (let i = 0; i < lyricLines.length; i++) {
      const line = lyricLines[i]
      if (line.toLocaleLowerCase().includes('[verse') || line.toLocaleLowerCase().includes('[intro]') || line.toLocaleLowerCase().includes('[chorus]')) {
        continue
      }
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

