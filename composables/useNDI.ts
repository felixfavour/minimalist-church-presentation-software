import { ref, onMounted, onUnmounted } from 'vue'

export const useNDI = () => {
  const ndiSources = ref<Array<{ name: string, urlAddress: string }>>([])
  const selectedNdiSource = ref<string | null>(null)
  const isNdiEnabled = ref(true)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Fetch available NDI sources from our API endpoint
  const fetchNdiSources = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/ndi')
      const data = await response.json()
      
      if (data.status === 'success') {
        ndiSources.value = data.sources || []
      } else {
        error.value = data.message || 'Failed to fetch NDI sources'
      }
    } catch (err) {
      console.error('Error fetching NDI sources:', err)
      error.value = 'Failed to connect to NDI service'
    } finally {
      isLoading.value = false
    }
  }

  // Select an NDI source to use
  const selectNdiSource = (sourceUrl: string) => {
    selectedNdiSource.value = sourceUrl
    isNdiEnabled.value = true
  }

  // Disable NDI output
  const disableNdi = () => {
    selectedNdiSource.value = null
    isNdiEnabled.value = false
  }

  // Toggle NDI output
  const toggleNdi = () => {
    isNdiEnabled.value = !isNdiEnabled.value
  }

  onMounted(() => {
    // Fetch NDI sources when component is mounted
    fetchNdiSources()
  })

  return {
    ndiSources,
    selectedNdiSource,
    isNdiEnabled,
    isLoading,
    error,
    fetchNdiSources,
    selectNdiSource,
    disableNdi,
    toggleNdi
  }
}
