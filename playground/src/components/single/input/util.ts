export const inputPropsResolver = <
  B,
  T extends B & {
    label?: React.ReactNode;
    required?: boolean;
    optional?: boolean;
  },
>(
  props: T
) => ({
  withAsterisk: false,
  inputWrapperOrder: ['label', 'input', 'description', 'error'],
  styles: {
    input: {
      backgroundColor: 'var(--mantine-color-gray-0)',
      border: 'none',
      borderBottom: '2px solid var(--mantine-color-gray-3)',
    },
  },
  ...props,
  ...(props.required &&
    props.label && {
      label: `${props.label} (required)`,
    }),
  ...(props.optional &&
    props.label && {
      label: `${props.label} (optional)`,
      required: false,
    }),
});
