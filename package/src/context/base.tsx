import { createSafeContext, MantineThemeOverride } from '@mantine/core'
import { Routes } from '@filante/arcessere/types'
import { Cobalt } from '../index.js'
import { CobaltConfig } from '../types/index.js'

export type CobaltContextProps<ROUTES extends Routes> = {
  children: React.ReactNode
  cobalt?: Cobalt<ROUTES>
  mantine: MantineThemeOverride
  config: CobaltConfig
}

export type CobaltProviderValues = {}

export const [CobaltProvider, useCobaltContext] = createSafeContext<CobaltProviderValues>(
  'The component was not found in the tree under the "CobaltProvider"'
)
