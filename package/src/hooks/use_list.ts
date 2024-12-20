import { useDebouncedValue, useSetState } from '@mantine/hooks'
import { RouteKeys, Routes } from '@filante/arcessere/types'
import type { Cobalt } from '../index.js'
import { UseQueryParams } from './use_query.js'

export type UseListParams<
  ROUTES extends Routes,
  RK extends RouteKeys<ROUTES>,
  EP extends ROUTES[RK]['io'],
> = {
  endpoint: RK

  input: EP['input']

  props?: UseQueryParams<ROUTES, RK, EP>['props']

  debounce?: number
}

export const useList = <
  ROUTES extends Routes,
  RK extends RouteKeys<ROUTES>,
  EP extends ROUTES[RK]['io'],
>(
  cobalt: Cobalt<ROUTES>,
  params: UseListParams<ROUTES, RK, EP>
) => {
  const [internalBody, setInternalBody] = useSetState(params.input as Record<string, any>)

  const [debouncedBody] = useDebouncedValue(internalBody, params.debounce || 200)

  const internalQueryCall = cobalt.useQuery({
    endpoint: params.endpoint,
    input: debouncedBody,
    props: params.props,
  })

  return [
    internalQueryCall,
    [
      internalBody as EP['input'],
      setInternalBody as unknown as (
        statePartial: Partial<EP['input']> | ((currentState: EP['input']) => Partial<EP['input']>)
      ) => void,
    ],
  ] as const
}
