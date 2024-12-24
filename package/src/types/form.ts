import { UseFormReturnType } from '@mantine/form'

export type FormInputType = 'default' | 'datetime'

export type GetInputPropOptions<Values> = NonNullable<
  Parameters<UseFormReturnType<Values>['getInputProps']>[1]
> & {
  input?: FormInputType
}

export type GetInputPropsReturnType<Values> = ReturnType<UseFormReturnType<Values>['getInputProps']>

export type SetPartialState<T extends Record<string, unknown>> = (
  statePartial: Partial<T> | ((currentState: T) => Partial<T>)
) => void
