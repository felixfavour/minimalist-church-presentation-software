export default defineAppConfig({
  ui: {
    primary: 'purple',
    icons: ['mdi', 'bx', 'bxs', 'bi', 'mingcute', 'tabler', 'ph', 'lucide'],
    tooltip: {
      rounded: 'rounded-md',
      background: 'bg-primary',
      color: 'text-white',
      shadow: 'none'
    },
    input: {
      wrapper: 'shadow-none',
      rounded: 'rounded-md',
      color: 'red',
      base: 'bg-gray-100 dark:bg-primary-900 dark:text-primary-900',
      variant: {
        outline: 'shadow-none text-gray-900 dark:text-primary-900 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400',
        none: 'shadow-none bg-gray-100 dark:bg-primary-200 focus:ring-0 focus:shadow-none dark:text-primary-900',
      },
      default: {
        variant: 'none'
      }
    },
    notifications: {
      position: 'bottom-4 left-4 top-auto',
    }
  }
})