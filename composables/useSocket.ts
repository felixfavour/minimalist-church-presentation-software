import { useAppStore } from "~/store/app"

export const useSocket = async () => {
  let host = 'localhost'
  let port = 6787
  const promise = await useFetch('http://localhost:6788')
  host = JSON.parse(promise.data.value as string).ip
  let socket = new WebSocket(`ws://${host}:${port}/livestream`)
  return socket
}