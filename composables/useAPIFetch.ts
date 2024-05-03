import { useFetch } from "#app"
import { UseFetchOptions } from "@vueuse/core"

type useFetchType = typeof useFetch

// wrap useFetch with configuration needed to talk to our API
export const useAPIFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()
  console.log(config.public.BASE_URL)
  options.baseURL = config.public.BASE_URL as string

  return useFetch(path, options)
}