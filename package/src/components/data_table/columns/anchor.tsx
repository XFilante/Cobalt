import { Anchor, AnchorProps } from '@mantine/core'
import { DTCellCompProps, DTCellProps, DTRows } from '../types.js'

export type DTAnchorCellT<ROWS extends DTRows> = DTCellProps<
  ROWS,
  'anchor',
  {
    text: string
    href: (value: ROWS[number]) => string
  },
  {
    anchor?: AnchorProps
  },
  false
>

type Props<ROWS extends DTRows> = DTCellCompProps<ROWS, DTAnchorCellT<ROWS>>

const DTAnchorCell = <ROWS extends DTRows>(props: Props<ROWS>) => (
  <>
    <Anchor size="sm" fw="bold" {...props.cell.props?.anchor} href={props.cell.href(props.row)}>
      {props.cell.text}
    </Anchor>
  </>
)

export default DTAnchorCell
