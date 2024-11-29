import { DTCellProps, DTRows } from '../types.js'

export type DTCustomCellT<ROWS extends DTRows> = DTCellProps<
  ROWS,
  'custom',
  {
    render: (row: ROWS[number]) => React.ReactNode
  },
  {},
  false
>
