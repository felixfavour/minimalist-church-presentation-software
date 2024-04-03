import { useAppStore } from '~/store/app'

const useGlobalEmit = (type: string, value?: string) => {
  const appStore = useAppStore()
  const toast = useToast()
  const emitter = appStore.emitter

  try {
    emitter.emit(type, value)
  } catch (err) {
    toast.add({ title: 'An error occurred. Please reload', icon: 'i-bx-error', color: 'red' })
  }
}

export default useGlobalEmit