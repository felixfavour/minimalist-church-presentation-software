import { Hymn } from '~/types'
// import hymnsObj from '../public/large_assets/hymns.json'

const useHymn = (number: string): Hymn | null => {
  const hymnsObj = inject('hymns')
  const toast = useToast()
  const hymns = Object.values(hymnsObj.hymns) as Array<Hymn>

  try {
    const hymn = hymns.find(hymn => hymn.number === number) as Hymn
    return hymn
  } catch (err) {
    toast.add({ title: 'Hymn not found', icon: 'i-bx-error', color: 'red' })
  }
  return null
}

export default useHymn

