import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'

type Props = {
  loading?: boolean
  title?: string
  message: string
  props?: Parameters<typeof modals.openConfirmModal>[0]
}

export const useConfirmation = (props: Props) => {
  const open = (openProps: { onConfirm: () => void; onCancel?: () => void }) => {
    modals.openConfirmModal({
      title: props.title || 'Please confirm your action',
      children: (
        <>
          <Text size="sm">{props.message}</Text>
        </>
      ),
      closeOnCancel: true,
      closeOnConfirm: true,
      closeOnEscape: true,
      centered: true,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: {
        loading: props.loading,
        color: 'red',
      },
      cancelProps: {
        disabled: props.loading,
      },
      onConfirm: () => openProps.onConfirm(),
      onCancel: () => openProps.onCancel?.(),
      ...props.props,
    })
  }

  return open
}
