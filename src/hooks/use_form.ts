import { useForm as useManForm, UseFormInput, UseFormReturnType } from '@mantine/form'
import { RouteKeys, Routes } from '@filante/arcessere/types'
import type { Cobalt } from '../index.js'
import { UseMutationParams } from './use_mutation.js'

export type UseFormParams<
  ROUTES extends Routes,
  RK extends RouteKeys<ROUTES>,
  EP extends ROUTES[RK]['io'],
> = {
  endpoint: RK
  form: UseFormInput<EP['input']>
  onSuccess: UseMutationParams<ROUTES, RK, EP>['onSuccess']
  props?: UseMutationParams<ROUTES, RK, EP>['props']
}

export const useForm = <
  ROUTES extends Routes,
  RK extends RouteKeys<ROUTES>,
  EP extends ROUTES[RK]['io'],
>(
  cobalt: Cobalt<ROUTES>,
  params: UseFormParams<ROUTES, RK, EP>
) => {
  const internalForm = useManForm(params.form as any)

  const internalMutation = cobalt.useMutation({
    endpoint: params.endpoint,
    onSuccess: params.onSuccess,
    form: internalForm as UseFormReturnType<EP['input']>,
  })

  return [internalForm as unknown as UseFormReturnType<EP['input']>, internalMutation] as const
}
