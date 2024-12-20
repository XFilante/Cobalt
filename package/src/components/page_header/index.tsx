import { Divider, Group, Stack, Text, Title } from '@mantine/core'
import { capitalCase } from 'case-anything'

type Props = {
  title: string
  rightSection?: React.ReactNode
  description?: string
}

const PageHeader = (props: Props) => (
  <>
    <Stack gap="xs">
      <Group justify="space-between">
        <Title order={2} lh={0.8} tt="capitalize">
          {capitalCase(props.title)}
        </Title>

        {props.rightSection}
      </Group>

      {props.description && (
        <Text c="dimmed" size="sm">
          {capitalCase(props.description)}
        </Text>
      )}

      <Divider />
    </Stack>
  </>
)

export { PageHeader }
export default PageHeader
