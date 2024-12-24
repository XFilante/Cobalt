import { AdminLayout } from '@/components/layouts/admin';
import { cobalt } from '@/configs/cobalt';
import { ICON_SIZE } from '@filante/cobalt';
import {
  CenterMessage,
  DataTable,
  PageHeader,
  QueryLoader,
} from '@filante/cobalt/components';
import { ActionIcon, Button, Stack } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import Link from 'next/link';

export default function Page() {
  const [query] = cobalt.useList({
    endpoint: 'API_V1_USER_LIST',
    input: undefined,
  });

  return (
    <>
      <AdminLayout>
        <Stack py="md">
          <PageHeader
            title="Users"
            description="List of all users."
            rightSection={
              <>
                <ActionIcon variant="outline">
                  <IconDots size={ICON_SIZE.SM} />
                </ActionIcon>
              </>
            }
          />

          <QueryLoader
            query={query}
            conditions={(paginated) => {
              if (paginated.length === 0) {
                return (
                  <CenterMessage
                    height="50vh"
                    title="Empty"
                    description="Users not found."
                  />
                );
              }

              return undefined;
            }}
          >
            {(paginatedData) => (
              <>
                <DataTable
                  rows={paginatedData}
                  loading={query.isLoading}
                  pagination={{
                    limit: 10,
                    page: 1,
                    total: 1,
                    onLimitChange: () => {},
                    onPageChange: () => {},
                  }}
                >
                  {[
                    {
                      type: 'text',
                      key: ['name'],
                      label: 'Name',
                      dimmed: false,
                      clipboard: true,
                      href: (row) => `/users/${row.id}`,
                    },
                    {
                      type: 'text',
                      key: ['email'],
                      label: 'Email',
                      clipboard: true,
                    },
                    {
                      type: 'text',
                      key: ['createdAt'],
                      label: 'Created At',
                      transform: 'date',
                    },
                  ]}
                </DataTable>
              </>
            )}
          </QueryLoader>
        </Stack>
      </AdminLayout>
    </>
  );
}
