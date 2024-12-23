import { UndefinedInitialDataOptions, useQuery as useTanQuery } from '@tanstack/react-query'
import { RouteKeys, Routes } from '@filante/arcessere/types'
import type { Cobalt } from '../main.js'

export type UseQueryParams<
  ROUTES extends Routes,
  RK extends RouteKeys<ROUTES>,
  EP extends ROUTES[RK]['io'],
> = {
  endpoint: RK

  input: EP['input']

  props?: Omit<
    UndefinedInitialDataOptions<EP['input'], Error, EP['output']>,
    'queryFn' | 'queryKey'
  >
}

export const useQuery = <
  ROUTES extends Routes,
  RK extends RouteKeys<ROUTES>,
  EP extends ROUTES[RK]['io'],
>(
  cobalt: Cobalt<ROUTES>,
  params: UseQueryParams<ROUTES, RK, EP>
) => {
  const internalQuery = useTanQuery({
    // Temporary

    ...params.props,

    // Permanent
    queryKey: cobalt.queryKey(params.endpoint, params.input?.params, params.input?.query),
    queryFn: () => cobalt.api.endpoint(params.endpoint).call(params.input),
  })

  return internalQuery
}
