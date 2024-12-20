import { Center, Stack, Text, Title } from '@mantine/core'

type Props = {
  height?: string
  title: string
  description: string
  children?: React.ReactNode
}

export const CenterMessage = (props: Props) => (
  <>
    <Center h={props.height}>
      <Stack>
        <Title ta="center">{props.title}</Title>
        <Text c="dimmed" ta="center">
          {props.description}
        </Text>

        {props.children}
      </Stack>
    </Center>
  </>
)
