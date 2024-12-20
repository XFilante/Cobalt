import { rem } from '@mantine/core'
import { useMQ } from './use_mq.js'

export const sizeHelper =
  <T>(func: (helpers: { rem: typeof rem; mq: ReturnType<typeof useMQ> }) => T) =>
  () => {
    const mq = useMQ()

    return func({ rem, mq })
  }
