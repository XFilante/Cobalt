import { MantineColorScheme } from '@mantine/core'
import { MetaTagsProps } from '../components/meta_tags.js'

export type CobaltConfig = {
  theme: MantineColorScheme
  forceTheme: boolean
  meta: MetaTagsProps
  gtag: string | null
}
