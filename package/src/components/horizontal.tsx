import { Input, SimpleGrid, SimpleGridProps, Stack, StackProps } from '@mantine/core'

type Props = {
  label: string
  description?: string
  required?: boolean
  error?: string
  props?: {
    root?: SimpleGridProps
    stack?: StackProps
  }
  children: React.ReactNode
}

export const Horizontal = (props: Props) => (
  <>
    <SimpleGrid cols={2} {...props.props?.root}>
      <Stack gap={3} h="100%" justify="center" {...props.props?.stack}>
        <Input.Label required={props.required}>{props.label}</Input.Label>

        {props.description && <Input.Description>{props.description}</Input.Description>}

        {props.error && <Input.Error>{props.error}</Input.Error>}
      </Stack>

      {props.children}
    </SimpleGrid>
  </>
)
