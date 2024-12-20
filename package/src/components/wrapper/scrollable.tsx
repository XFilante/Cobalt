import { ScrollArea, Stack } from '@mantine/core'

type Props = {
  children: React.ReactNode
}

export const ScrollableWrapper = (props: Props) => (
  <>
    <ScrollArea.Autosize type="never">
      <Stack py="lg">{props.children}</Stack>
    </ScrollArea.Autosize>
  </>
)
