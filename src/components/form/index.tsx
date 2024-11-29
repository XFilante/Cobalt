import {
  Button,
  ButtonProps,
  Checkbox,
  CheckboxProps,
  ComboboxData,
  PasswordInput,
  PasswordInputProps,
  Select,
  SelectProps,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  TextInputProps,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { UseMutationResult } from '@tanstack/react-query'
import { Children } from 'react'
import { Paths } from '../../types/index.js'

const Form = <
  MUTATION extends Omit<UseMutationResult<any, any, any, any>, 'mutation'>,
  INPUT extends Exclude<MUTATION['variables'], undefined>,
  FORM extends UseFormReturnType<INPUT>,
  KEY extends Paths<INPUT>,
  FIELD extends
    | {
        type: 'text'
        label: string
        placeholder: string
        key: KEY
        props?: TextInputProps
      }
    | {
        type: 'password'
        label: string
        placeholder: string
        key: KEY
        props?: PasswordInputProps
      }
    | {
        type: 'select'
        label: string
        placeholder: string
        key: KEY
        data: ComboboxData
        props?: SelectProps
      }
    | {
        type: 'checkbox'
        label: string
        key: KEY
        props?: CheckboxProps
      }
    | {
        type: 'custom'
        render: React.ReactNode
      },
>(props: {
  mutation: MUTATION
  form: FORM
  children: (FIELD | [FIELD, FIELD])[]
  submit: (input: INPUT) => void

  formProps?: {
    beforeSubmit?: (values: INPUT) => void | undefined
    submitProps?: {
      label?: string
      props?: ButtonProps
    }
  }
}) => {
  const columnParser = (field: FIELD) => {
    switch (field.type) {
      case 'text': {
        return (
          <>
            <TextInput
              required
              withAsterisk={false}
              disabled={props.mutation.isPending}
              {...props.form.getInputProps(field.key.join('.'))}
              {...field.props}
              label={field.label}
              placeholder={field.placeholder}
            />
          </>
        )
      }

      case 'password': {
        return (
          <>
            <PasswordInput
              required
              withAsterisk={false}
              disabled={props.mutation.isPending}
              {...props.form.getInputProps(field.key.join('.'))}
              {...field.props}
              label={field.label}
              placeholder={field.placeholder}
            />
          </>
        )
      }

      case 'checkbox': {
        return (
          <>
            <Checkbox
              required
              disabled={props.mutation.isPending}
              {...props.form.getInputProps(field.key.join('.'), {
                type: 'checkbox',
              })}
              {...field.props}
              label={field.label}
            />
          </>
        )
      }

      case 'select': {
        return (
          <>
            <Select
              required
              withAsterisk={false}
              disabled={props.mutation.isPending}
              {...props.form.getInputProps(field.key.join('.'))}
              {...field.props}
              label={field.label}
              placeholder={field.placeholder}
              data={field.data}
            />
          </>
        )
      }

      case 'custom': {
        return field.render
      }

      default: {
        return <Text c="red">Unsupported field</Text>
      }
    }
  }

  return (
    <>
      <form
        onSubmit={props.form.onSubmit((values) => {
          if (props.formProps?.beforeSubmit) {
            const result = props.formProps.beforeSubmit(values)

            if (result === undefined) {
              return
            }
          }

          props.submit(values)
        })}
      >
        <Stack>
          {Children.toArray(
            props.children.map((child) => {
              if (Array.isArray(child)) {
                return (
                  <>
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                      {columnParser(child[0])}
                      {columnParser(child[1])}
                    </SimpleGrid>
                  </>
                )
              }

              return columnParser(child)
            })
          )}

          <Button
            variant="filled"
            {...props.formProps?.submitProps?.props}
            type="submit"
            loading={props.mutation.isPending}
          >
            {props.formProps?.submitProps?.label || 'Submit'}
          </Button>
        </Stack>
      </form>
    </>
  )
}

export { Form }
export default Form
