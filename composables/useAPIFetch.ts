import { useFetch } from "#app"
import { UseFetchOptions } from "@vueuse/core"

type useFetchType = typeof useFetch

// wrap useFetch with configuration needed to talk to our API
export const useAPIFetch: useFetchType = (path, options = {}) => {
  const token = useCookie('token')
  const config = useRuntimeConfig()
  options.baseURL = config.public.BASE_URL as string
  options.headers = {
    Authorization: `Bearer ${token.value}`
  }

  return useFetch(path, options)
}