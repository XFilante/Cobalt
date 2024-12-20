import { QueryKey, UseMutationOptions, useMutation as useTanMutation } from '@tanstack/react-query'
import { Text, TextProps } from '@mantine/core'
import { RouteKeys, Routes } from '@filante/arcessere/types'
import { ArcessereErrorHandler } from '../api/arcessere_error_handler.js'
import { modals } from '@mantine/modals'
import { UseFormReturnType } from '@mantine/form'
import type { Cobalt } from '../index.js'

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

  confirmation?: {
    title?: string
    message:
      | { type: 'text'; value: string; props?: TextProps }
      | { type: 'custom'; render: React.ReactNode }
  }

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
          })
        }
      }

      if (params.form && res?.input) {
        params.form.reset()
        params.form.setValues(res.input)
      }

      if (res?.after) {
        res.after(updatedData)
      }
    },
    onError: (error) => {
      ArcessereErrorHandler(cobalt.logger, error, params.form)
    },
  })

  const submitInternalMutation = (input: EP['input']) => {
    if (params.confirmation) {
      modals.openConfirmModal({
        title: params.confirmation.title || 'Please confirm your action',
        children: (
          <>
            {(() => {
              switch (params.confirmation.message.type) {
                case 'text': {
                  return (
                    <>
                      <Text size="sm" {...params.confirmation.message.props}>
                        {params.confirmation.message.value}
                      </Text>
                    </>
                  )
                }

                case 'custom': {
                  return params.confirmation.message.render
                }

                default: {
                  return <Text c="red">Unsupported confirmation message type</Text>
                }
              }
            })()}
          </>
        ),
        closeOnCancel: true,
        closeOnConfirm: true,
        closeOnEscape: true,
        centered: true,
        labels: { confirm: 'Delete', cancel: 'Cancel' },
        confirmProps: {
          loading: internalMutation.isPending,
          color: 'red',
        },
        cancelProps: {
          disabled: internalMutation.isPending,
        },
        onConfirm: () => internalMutation.mutate(input),
      })

      return
    }

    internalMutation.mutate(input)
  }

  return [
    internalMutation as Omit<typeof internalMutation, 'mutation'>,
    submitInternalMutation,
  ] as const
}
