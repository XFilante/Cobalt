import { AdminLayout } from '@/components/layouts/admin';
import { cobalt } from '@/configs/cobalt';
import { FixedWrapper, Form, PageHeader } from '@filante/cobalt/components';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  const [form, [mutation, submit]] = cobalt.useForm({
    endpoint: 'API_V1_USER_CREATE',
    form: {
      initialValues: {
        email: '',
        birthday: '',
        name: '',
      },
    },
    onSuccess: (updatedUser) => {
      notifications.show({
        message: 'User has been created!',
      });

      return {
        input: {
          ...updatedUser,
        },
        after: () => {
          router.push('/users');
        },
        queryKeys: (qk) => [qk('API_V1_USER_LIST', undefined)],
      };
    },
  });

  return (
    <>
      <AdminLayout>
        <FixedWrapper>
          {[
            {
              children: (
                <PageHeader
                  title="Create User"
                  description="Create a new user in the system."
                />
              ),
            },
            {
              children: (
                <Form mutation={mutation} form={form} submit={submit}>
                  {[
                    [
                      {
                        type: 'text',
                        label: 'Full Name',
                        placeholder: 'John',
                        key: ['name'],
                      },
                      {
                        type: 'text',
                        label: 'Email',
                        placeholder: 'xxx@xxx.xxx',
                        key: ['email'],
                      },
                    ],
                    {
                      type: 'datetime',
                      label: 'Birthday',
                      placeholder: 'Your birthday',
                      key: ['birthday'],
                    },
                  ]}
                </Form>
              ),
            },
          ]}
        </FixedWrapper>
      </AdminLayout>
    </>
  );
}
