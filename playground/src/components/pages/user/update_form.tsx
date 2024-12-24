import { cobalt } from '@/configs/cobalt';
import { User } from '@/configs/routes';
import { Form } from '@filante/cobalt/components';
import { TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';

type Props = {
  user: User;
};

export const UserUpdateForm = (props: Props) => {
  const [form, getProps, [mutation, submit]] = cobalt.useForm({
    endpoint: 'API_V1_USER_UPDATE',
    form: {
      values: {
        params: { id: props.user.id },
        email: props.user.email,
        name: props.user.name,
        birthday: props.user.birthday,
      },
    },
    onSuccess: (updatedUser) => {
      notifications.show({
        message: 'User has been updated',
      });

      return {
        input: {
          ...updatedUser,
          params: {
            id: props.user.id,
          },
        },
        queryKeys: (qk) => [
          qk('API_V1_USER_LIST', undefined),
          qk('API_V1_USER_SHOW', {
            id: props.user.id,
          }),
        ],
      };
    },
  });

  return (
    <>
      <Form mutation={mutation} form={form} submit={submit}>
        <TextInput
          {...getProps(['name'])}
          label="Name"
          placeholder="John Doe"
        />
      </Form>
    </>
  );
};
