import { QueryKey, UseMutationOptions, useMutation as useTanMutation } from '@tanstack/react-query'
import { RouteKeys, Routes } from '@filante/arcessere/types'
import { ArcessereErrorHandler } from '../api/arcessere_error_handler.js'
import { UseFormReturnType } from '@mantine/form'
import type { Cobalt } from '../main.js'

export type UseMutationParams<
  ROUTES extends Routes,
  RK extends RouteKeys<ROUTES>,
  EP extends ROUTES[RK]['io'],
> = {
  endpoint: RK

  props?: Omit<
    UseMutationOptions<EP['output'], unknown, EP['input'], unknown>,
    'mutationFn' | 'onSuccess' | 'onError'
  >

  form?: UseFormReturnType<EP['input']>

  onSuccess: (data: EP['output']) => {
    input?: EP['input']
    queryKeys?: (qk: Cobalt<ROUTES>['queryKey']) => QueryKey[]
    after?: (data: EP['output']) => void
  } | void
}

export const useMutation = <
  ROUTES extends Routes,
  RK extends RouteKeys<ROUTES>,
  EP extends ROUTES[RK]['io'],
>(
  cobalt: Cobalt<ROUTES>,
  params: UseMutationParams<ROUTES, RK, EP>
) => {
  const internalMutation = useTanMutation({
    // Temporary

    ...params.props,

    // Permanent
    mutationFn: cobalt.api.endpoint(params.endpoint).call,
    onSuccess: (updatedData) => {
      const res = params.onSuccess(updatedData)

      if (res?.queryKeys) {
        const queryKeys = res.queryKeys(cobalt.queryKey)

        for (const queryKey of queryKeys) {
          cobalt.query.invalidateQueries({
            queryKey,
            exact: true,
            type: 'active',
          })
        }
      }

      if (params.form && res?.input) {
        params.form.setValues(res.input)
        params.form.reset()
      }

      if (res?.after) {
        res.after(updatedData)
      }
    },
    onError: (error) => {
      ArcessereErrorHandler(cobalt.logger, error, params.form)
    },
  })

  const mutate = (input: EP['input']) => {
    return internalMutation.mutateAsync(input)
  }

  return [
    internalMutation as Omit<typeof internalMutation, 'mutate' | 'mutateAsync'>,
    mutate,
  ] as const
}
