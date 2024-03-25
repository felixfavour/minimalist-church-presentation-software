import { useAppStore } from '~/store/app'

const useGlobalEmit = (type: string, value?: string) => {
  const appStore = useAppStore()
  const emitter = appStore.emitter

  emitter.emit(type, value)
}

export default useGlobalEmit