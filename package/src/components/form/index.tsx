import { Button, Stack, StackProps } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { UseMutationResult } from '@tanstack/react-query'
import React from 'react'

const Form = <
  MUTATION extends Omit<UseMutationResult<any, any, any, any>, 'mutate' | 'mutateAsync'>,
  INPUT extends Exclude<MUTATION['variables'], undefined>,
  FORM extends UseFormReturnType<INPUT>,
>(props: {
  mutation: MUTATION
  form: FORM
  children: React.ReactNode
  submit: (input: INPUT) => Promise<any> | any

  button?: (submitProps: { loading: boolean }) => React.ReactNode

  options?: {
    /**
     * return "undefined" to prevent the form from submitting
     */
    checkpoint?: (values: INPUT) => boolean
  }

  props?: {
    stack?: StackProps
  }
}) => {
  return (
    <>
      <form
        onSubmit={props.form.onSubmit(async (values) => {
          if (props?.options?.checkpoint) {
            const result = props.options.checkpoint(values)

            if (result === false) {
              return
            }
          }

          await props.submit(values)
        })}
      >
        <Stack {...props.props?.stack}>
          {props.children}

          {props.button ? (
            <>{props.button({ loading: props.form.submitting })}</>
          ) : (
            <>
              <Button
                type="submit"
                loading={props.form.submitting}
                disabled={!props.form.isDirty()}
              >
                Submit
              </Button>
            </>
          )}
        </Stack>
      </form>
    </>
  )
}

export { Form }
export default Form
