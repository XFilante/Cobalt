import { UseQueryResult } from '@tanstack/react-query'
import { Center, Paper, Skeleton, Text } from '@mantine/core'
import { CenterMessage } from './center_message.js'

const HEIGHT = '100%'

type Props<OUT> = {
  children: (data: NonNullable<OUT>) => React.ReactNode
  conditions?: (data: NonNullable<OUT>) => React.ReactNode | void
  query: UseQueryResult<OUT, unknown>
  height?: string
  isLoading?: React.ReactNode
  isError?: React.ReactNode
  isData?: React.ReactNode
}

export const QueryLoader = <OUT,>(props: Props<OUT>) => {
  if (props.query.isLoading) {
    return props.isLoading ?? <Skeleton h="100%" w="100%" />
  }

  if (props.query.isError) {
    return (
      props.isError ?? (
        <Paper h="100%" w="100%" withBorder>
          <Center h="100%">
            <Text size="sm" fw="bold" fs="italic">
              Error
            </Text>
          </Center>
        </Paper>
      )
    )
  }

  const { data } = props.query

  if (!data) {
    return (
      props.isData ?? (
        <CenterMessage
          height={props.height ?? HEIGHT}
          title="Oops!"
          description="Data not found."
        />
      )
    )
  }

  if (props.conditions) {
    const conditions = props.conditions(data)

    if (conditions) {
      return conditions
    }
  }

  return props.children(data)
}
