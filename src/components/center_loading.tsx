import { Center, Loader } from '@mantine/core'

type Props = {
  height?: string
  color?: string
}

export const CenterLoading = (props: Props) => (
  <>
    <Center h={props.height}>
      <Loader color={props.color} />
    </Center>
  </>
)
