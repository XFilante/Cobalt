import {
  Button,
  ButtonProps,
  Checkbox,
  CheckboxProps,
  ComboboxData,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  Select,
  SelectProps,
  SimpleGrid,
  Stack,
  StackProps,
  Text,
  Textarea,
  TextareaProps,
  TextInput,
  TextInputProps,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { UseMutationResult } from '@tanstack/react-query'
import React, { Children } from 'react'
import { Paths } from '../../types/index.js'
import { DateTimePicker, DateTimePickerProps, DateValue } from '@mantine/dates'

const getDateFieldProps = (form: UseFormReturnType<any>, key: string) => {
  const props = form.getInputProps(key)

  return {
    ...props,
    defaultValue: props.defaultValue ? new Date(props.defaultValue) : null,
    value: props.value ? new Date(props.value) : null,
    onChange: (value: DateValue) => {
      if (value) {
        form.setFieldValue(key, value.toISOString())
      } else {
        form.setFieldValue(key, null)
      }
    },
  }
}

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
        type: 'textarea'
        label: string
        placeholder: string
        key: KEY
        props?: TextareaProps
      }
    | {
        type: 'number'
        label: string
        placeholder: string
        key: KEY
        props?: NumberInputProps
      }
    | {
        type: 'datetime'
        label: string
        placeholder: string
        key: KEY
        props?: DateTimePickerProps
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

  section?: {
    /**
     * Additional content to show before the submit button
     */
    beforeSubmit?: React.ReactNode

    /**
     * Additional content to show after the submit button
     */
    afterSubmit?: React.ReactNode
  }

  formProps?: {
    beforeSubmit?: (values: INPUT) => void | undefined
    submitProps?: {
      label?: string
      props?: ButtonProps
    }
    stack?: StackProps
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
              key={props.form.key(field.key.join('.'))}
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
              key={props.form.key(field.key.join('.'))}
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
              key={props.form.key(field.key.join('.'))}
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
              key={props.form.key(field.key.join('.'))}
              label={field.label}
              placeholder={field.placeholder}
              data={field.data}
            />
          </>
        )
      }

      case 'textarea': {
        return (
          <>
            <Textarea
              required
              withAsterisk={false}
              disabled={props.mutation.isPending}
              {...props.form.getInputProps(field.key.join('.'))}
              {...field.props}
              key={props.form.key(field.key.join('.'))}
              label={field.label}
              placeholder={field.placeholder}
            />
          </>
        )
      }

      case 'number': {
        return (
          <>
            <NumberInput
              required
              withAsterisk={false}
              disabled={props.mutation.isPending}
              {...props.form.getInputProps(field.key.join('.'))}
              {...field.props}
              key={props.form.key(field.key.join('.'))}
              label={field.label}
              placeholder={field.placeholder}
            />
          </>
        )
      }

      case 'datetime': {
        return (
          <>
            <DateTimePicker
              required
              valueFormat="DD MMM YYYY hh:mm A"
              withAsterisk={false}
              disabled={props.mutation.isPending}
              {...getDateFieldProps(props.form, field.key.join('.'))}
              {...field.props}
              key={props.form.key(field.key.join('.'))}
              label={field.label}
              placeholder={field.placeholder}
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
        <Stack {...props.formProps?.stack}>
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

          {props.section?.beforeSubmit}

          <Button
            variant="filled"
            {...props.formProps?.submitProps?.props}
            type="submit"
            loading={props.mutation.isPending}
          >
            {props.formProps?.submitProps?.label || 'Submit'}
          </Button>

          {props.section?.afterSubmit}
        </Stack>
      </form>
    </>
  )
}

export { Form }
export default Form
