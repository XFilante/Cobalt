import { SimpleLayout } from '@filante/cobalt/components';
import { Button, Center, Group, Stack, Title } from '@mantine/core';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <SimpleLayout>
        <Center mih="100vh">
          <Stack miw={400}>
            <Title ta="center">Cobalt</Title>

            <Group w="100%" grow>
              <Button variant="filled">Application</Button>

              <Button component={Link} href="/components">
                Components
              </Button>
            </Group>
          </Stack>
        </Center>
      </SimpleLayout>
    </>
  );
}
