import { GridColProps, TextProps } from '@mantine/core'
import { Paths } from '../../types/object_path.js'

export type DTRows = Record<string, any>[]

export type DTRowKeys<ROWS extends DTRows> = Paths<ROWS[number]>

export type DTCellProps<
  ROWS extends DTRows,
  TYPE extends string,
  PROPS extends Record<string, any>,
  CompPROPS extends Record<string, any>,
  KEY extends boolean,
> = {
  /**
   * Cell type
   */
  type: TYPE

  /**
   * Column Label
   */
  label: string
  props?: {
    col?: GridColProps
    headerText?: TextProps
  } & CompPROPS
} & PROPS &
  (KEY extends true
    ? {
        /**
         * An array of row keys
         */
        key: DTRowKeys<ROWS> | ((row: ROWS[number]) => string | number | boolean | null | undefined)
      }
    : {})

export type DTCellCompProps<
  ROWS extends DTRows,
  CompPROPS extends DTCellProps<ROWS, any, any, any, any>,
  PROPS extends Record<string, any> = {},
> = {
  row: ROWS[number]
  cell: CompPROPS
} & PROPS
