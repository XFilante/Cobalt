import { rem } from '@mantine/core'
import { useMediaQuerys } from './use_media_querys'

export const sizeHelper =
  (
    func: (helpers: { rem: typeof rem; mediaQuerys: ReturnType<typeof useMediaQuerys> }) => unknown
  ) =>
  () => {
    const mediaQuerys = useMediaQuerys()

    return func({ rem, mediaQuerys })
  }
