import dynamic from 'next/dynamic'
import { Box, Skeleton } from '@mantine/core'
import { DynamicSkeleton } from '../skeleton/dynamic.js'

export const VerticalD = dynamic(() => import('./index.js'), {
  ssr: false,
  loading: (options) => (
    <DynamicSkeleton options={options}>
      <Box h="100%" p="md">
        <Skeleton h="100%" />
      </Box>
    </DynamicSkeleton>
  ),
})
