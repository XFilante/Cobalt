import dynamic from 'next/dynamic'
import { DynamicSkeleton } from '../skeleton/dynamic.js'

export const DataTableD = dynamic(() => import('./index.js'), {
  ssr: false,
  loading: (options) => <DynamicSkeleton options={options} />,
})
