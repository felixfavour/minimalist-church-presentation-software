import Dexie from 'dexie'
import { Song } from '~/types'
import useURLFriendlyString from './useURLFriendlyString'

const addIdToReturnedSongs = (songs: Array<Song>) => {
  return songs?.map((song) => ({
    ...song,
    id: useURLFriendlyString(`${song.artist} ${song.title}`),
  }))
}

const useIndexedDB = () => {
  const db = new Dexie('worshipcloud')
  db.version(1).stores({
    // slides: 'id,name,type,layout,contents,backgroundType,background,title,songId,hasChorus,data,slideStyle',
    songs: 'id,lyrics,title,album,cover,artist,verses',
    media: 'id,content', // id === slide.id
    library: '++id,type,content'
  })

  return db
}

export default useIndexedDB

