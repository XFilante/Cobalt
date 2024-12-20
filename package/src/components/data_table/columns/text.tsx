import { PolymorphicComponentProps, Text, TextProps } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { useMemo } from 'react'
import { NextRouter } from 'next/router.js'
import { DTCellCompProps, DTCellProps, DTRows } from '../types.js'
import { ifProp, ifProps } from '../../../helpers/if_props.js'
import { getDescendantPropsSingle } from '../../../helpers/get_descendent_props.js'

type RootTextProps = PolymorphicComponentProps<'p', TextProps>

export type DTTextCellT<ROWS extends DTRows> = DTCellProps<
  ROWS,
  'text',
  {
    /**
     * Transform type
     * @default 'string'
     */
    transform?: 'string' | 'date'

    /**
     * Text to display when data is empty
     * @default 'N/A'
     */
    empty?: string

    /**
     * Makes the text cell dimmed
     * @default true
     */
    dimmed?: boolean

    /**
     * Makes the text cell copyable
     */
    clipboard?: boolean

    /**
     * Custom link
     */
    href?: (value: ROWS[number]) => string
  },
  {
    text?: RootTextProps
  },
  true
>

type Props<ROWS extends DTRows> = DTCellCompProps<ROWS, DTTextCellT<ROWS>, { router: NextRouter }>

const RootText = <ROWS extends DTRows>(props: {
  comp: Props<ROWS>
  text?: {
    temporary?: RootTextProps
    permanent?: RootTextProps
  }
  children: () => React.ReactNode
}) => (
  <>
    <Text
      size="sm"
      c={ifProp((props.comp.cell.dimmed ?? true) === true, 'dimmed')}
      truncate="end"
      {...props.text?.temporary}
      {...props.comp.cell.props?.text}
      {...props.text?.permanent}
    >
      {props.children()}
    </Text>
  </>
)

const DTTextCell = <ROWS extends DTRows>(props: Props<ROWS>) => {
  const clipboard = useClipboard({ timeout: 500 })

  const data = useMemo(() => {
    const _data =
      typeof props.cell.key === 'function'
        ? props.cell.key(props.row)
        : getDescendantPropsSingle(props.row, props.cell.key)

    if (!_data) {
      return undefined
    }

    switch (props.cell.transform ?? 'string') {
      case 'string': {
        return String(_data)
      }
      case 'date': {
        return new Date(String(_data)).toLocaleString()
      }
      default: {
        return 'Unsupported transform type'
      }
    }
  }, [props.row, props.cell.key, props.cell.transform])

  return (
    <>
      <RootText
        comp={props}
        text={{
          permanent: ifProps({
            condition: !!data && !!props.cell.href,
            true: {
              onClick: () => props.cell.href && props.router.push(props.cell.href(props.row)),

              style: {
                cursor: 'pointer',
              },
            },
            false: ifProps({
              condition: !!data && !!props.cell.clipboard,
              true: {
                onClick: () => clipboard.copy(data),
                style: {
                  cursor: 'pointer',
                  pointerEvents: clipboard.copied ? 'none' : 'auto',
                },
              },
            }),
          }),
        }}
      >
        {() => {
          if (!data) {
            return props.cell.empty || 'Empty'
          }

          if (!!props.cell.clipboard && clipboard.copied) {
            return 'Copied'
          }

          return data
        }}
      </RootText>
    </>
  )
}

export default DTTextCell
