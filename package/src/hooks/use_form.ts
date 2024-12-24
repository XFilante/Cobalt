import { useForm as useManForm, UseFormInput, UseFormReturnType } from '@mantine/form'
import { RouteKeys, Routes } from '@filante/arcessere/types'
import type { Cobalt } from '../main.js'
import { UseMutationParams } from './use_mutation.js'
import type { FormInputType, GetInputPropOptions, GetInputPropsReturnType } from '../types/form.js'
import { Paths } from '../types/object_path.js'
import { DateValue } from '@mantine/dates'

export type UseFormParams<
  ROUTES extends Routes,
  RK extends RouteKeys<ROUTES>,
  EP extends ROUTES[RK]['io'],
> = {
  endpoint: RK
  onSuccess: UseMutationParams<ROUTES, RK, EP>['onSuccess']
  form: {
    values: NonNullable<UseFormInput<EP['input']>['initialValues']>
    onValuesChange?: UseFormInput<EP['input']>['onValuesChange']
    props?: Exclude<
      UseFormInput<EP['input']>,
      'initialValues' | 'mode' | 'onValuesChange' | 'enhanceGetInputProps'
    >
  }
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
  const internalForm = useManForm({
    mode: 'uncontrolled',
    initialValues: params.form.values,
    enhanceGetInputProps: (payload) => {
      const type: FormInputType = payload.options?.input ?? 'default'

      const base = {
        key: payload.form.key(payload.field),
        disabled: payload.form.submitting,
        required: true,
        withAsterisk: false,
      }

      switch (type) {
        case 'datetime':
          return {
            ...base,
            valueFormat: 'DD MMM YYYY hh:mm A',
            defaultValue: payload.inputProps.defaultValue
              ? new Date(payload.inputProps.defaultValue)
              : null,
            value: payload.inputProps.value ? new Date(payload.inputProps.value) : null,
            onChange: (value: DateValue) => {
              if (value) {
                payload.form.setFieldValue(payload.field, value.toISOString() as any)
              } else {
                payload.form.setFieldValue(payload.field, null as any)
              }
            },
          }

        default:
          return base
      }
    },
  })

  const internalMutation = cobalt.useMutation({
    endpoint: params.endpoint,
    onSuccess: params.onSuccess,
    form: internalForm as UseFormReturnType<EP['input']>,
  })

  const getExtendedInputProps = (
    key: Paths<EP['input']>,
    options?: GetInputPropOptions<EP['input']>
  ): GetInputPropsReturnType<EP['input']> => {
    return internalForm.getInputProps(key.join('.'), options)
  }

  return [
    internalForm as unknown as UseFormReturnType<EP['input']>,
    getExtendedInputProps,
    internalMutation,
  ] as const
}
