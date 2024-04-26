import Dexie from 'dexie'
import useURLFriendlyString from './useURLFriendlyString'
import type { Table } from 'dexie'
import type { Slide, Song } from '~/types'

const addIdToReturnedSongs = (songs: Array<Song>) => {
  return songs?.map((song) => ({
    ...song,
    id: useURLFriendlyString(`${song.artist} ${song.title}`),
  }))
}


class WorshipCloudDatabase extends Dexie {
  public songs!: Table<Song>
  public media!: Table<{ id: string, content: any }>
  public library!: Table<{ id: string, type: String, content: Slide | Song }, string>

  public constructor() {
    super('WorshipCloudDatabase')
    this.version(2).stores({
      songs: 'id,lyrics,title,album,cover,artist,verses',
      media: 'id,content', // id === slide.id
      library: 'id,type,content'
    })
  }
}

const useIndexedDB = () => {
  const db = new WorshipCloudDatabase()
  return db
}

export default useIndexedDB

