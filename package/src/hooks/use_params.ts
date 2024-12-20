import { useRouter } from 'next/router.js'

export const useParams = <KEYS>() => {
  const router = useRouter()

  return {
    isReady: router.isReady,
    param: (key: KEYS) => {
      if (!router.isReady) {
        return ''
      }

      const value = router.query[key as string]

      if (typeof value !== 'string') {
        return ''
      }

      return value
    },
  }
}
