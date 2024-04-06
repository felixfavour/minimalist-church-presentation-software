import type { Emitter } from 'mitt'
import { useAppStore } from '~/store/app'

const useGlobalEmit = (type: string, value?: string) => {
  const appStore = useAppStore()
  const toast = useToast()
  const emitter = (useNuxtApp().$emitter || appStore.emitter) as Emitter<any>

  try {
    emitter.emit(type, value)
  } catch (err) {
    toast.add({ title: 'An error occurred. Please reload', icon: 'i-bx-error', color: 'red' })
  }
}

export default useGlobalEmit