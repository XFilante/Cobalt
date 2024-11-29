import { Box, BoxComponentProps, PolymorphicComponentProps, Stack, StackProps } from '@mantine/core'
import { Children } from 'react'
import { ifProps } from '../../helpers/if_props.js'

type BoxProps = PolymorphicComponentProps<'div', BoxComponentProps>

type Props = {
  children: {
    children: React.ReactNode
    props?: BoxProps

    /** Takes the remaining height of the parent */
    remainingHeight?: boolean
  }[]
  props?: {
    stack?: StackProps
  }
}

const Vertical = (props: Props) => (
  <Stack h="100%" py="lg" {...props.props?.stack}>
    {Children.toArray(
      props.children.map((child) => (
        <Box
          {...ifProps({
            condition: !!child.remainingHeight,

            // https://stackoverflow.com/questions/14962468/how-can-i-combine-flexbox-and-vertical-scroll-in-a-full-height-app
            true: { mih: '0', h: '100%' },

            false: { h: 'fit-content' },
          })}
          {...child.props}
        >
          {child.children}
        </Box>
      ))
    )}
  </Stack>
)

export { Vertical }
export type { Props as VerticalProps }
export default Vertical
