import { Group, Stack, Text } from '@mantine/core'

type Props = {
  name: React.ReactNode
  value: React.ReactNode
  description?: React.ReactNode
}

export const InfoCol = (props: Props) => (
  <>
    <Stack gap={0}>
      <Group justify="space-between">
        <Text size="sm" fw="bold">
          {props.name}
        </Text>

        <Text size="sm">{props.value}</Text>
      </Group>

      {props.description && (
        <Text c="dimmed" size="xs">
          {props.description}
        </Text>
      )}
    </Stack>
  </>
)
