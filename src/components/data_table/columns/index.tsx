import { DTRows } from '../types.js'

import type { DTTextCellT } from './text.js'
import type { DTAnchorCellT } from './anchor.js'
import type { DTCustomCellT } from './custom.js'
import dynamic from 'next/dynamic'
import { DynamicSkeleton } from '../../skeleton/dynamic.js'

export type DTCells<ROWS extends DTRows> =
  | DTTextCellT<ROWS>
  | DTAnchorCellT<ROWS>
  | DTCustomCellT<ROWS>

export const DTTextCellD = dynamic(() => import('./text.js'), {
  ssr: false,
  loading: (options) => <DynamicSkeleton options={options} />,
})

export const DTAnchorCellD = dynamic(() => import('./anchor.js'), {
  ssr: false,
  loading: (options) => <DynamicSkeleton options={options} />,
})
