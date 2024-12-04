import { DTRows } from '../types.js'

import type { DTTextCellT } from './text.js'
import type { DTAnchorCellT } from './anchor.js'
import type { DTCustomCellT } from './custom.js'

export type DTCells<ROWS extends DTRows> =
  | DTTextCellT<ROWS>
  | DTAnchorCellT<ROWS>
  | DTCustomCellT<ROWS>
