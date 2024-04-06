import { Song } from '~/types'
import useURLFriendlyString from './useURLFriendlyString'

const addIdToReturnedSongs = (songs: Array<Song>) => {
  return songs?.map((song) => ({
    ...song,
    id: useURLFriendlyString(`${song.artist} ${song.title}`),
  }))
}

const useIndexedDB = () => {
  const request = window.indexedDB.open('cloud_of_worshippers', 1)

  request.onerror = (event) => {
    console.log('DB operation failed', event?.target?.errorCode)
  };
  request.onsuccess = (event) => {
    console.log('DB operation successful', event)
  };

  request.onupgradeneeded = (event) => {
    console.log('DB upgrade began', event)
    const db = event?.target?.result

    // Create songs object in DB
    const objectStore = db.createObjectStore('songs', { keypath: 'id' })
    objectStore.createIndex('title', 'title', { unique: false })
    objectStore.createIndex('artist', 'artist', { unique: false })
    console.log('DB upgrade Ended', event)
  }


  return null
}

export default useIndexedDB

