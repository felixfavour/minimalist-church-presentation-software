export default defineAppConfig({
  ui: {
    primary: 'purple',
    icons: {
      dynamic: true
    },
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
      base: 'bg-gray-100',
      variant: {
        outline: 'shadow-none text-gray-900 dark:text-white ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400',
        none: 'shadow-none bg-gray-100 focus:ring-0 focus:shadow-none',
      },
      default: {
        variant: 'none'
      }
    },
    notifications: {
      position: 'top-8 bottom-auto',
    }
  }
})