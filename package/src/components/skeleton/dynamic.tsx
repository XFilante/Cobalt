import { Center, Paper, Skeleton, Text } from '@mantine/core'
import { DynamicOptionsLoadingProps } from 'next/dynamic.js'

export const DynamicSkeleton = (props: {
  options: DynamicOptionsLoadingProps
  children?: React.ReactNode
}) => {
  if (props.options.error) {
    // logger.error(props.options.error);

    return (
      <>
        <Paper withBorder h="100%" w="100%">
          <Center h="100%">
            <Text size="sm" c="red">
              Error
            </Text>
          </Center>
        </Paper>
      </>
    )
  }

  return props.children ?? <Skeleton h="100%" w="100%" />
}
