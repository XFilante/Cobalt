import {
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Title,
} from '@mantine/core';
import { CommonLayout } from '@/components/layouts/common';
import { PageHeader } from '@/components/single/page_components/header';
import { PageBody } from '@/components/single/page_components/body';
import {
  Button,
  IconButton,
  SecondaryButton,
} from '@/components/single/button';
import { Add } from '@carbon/icons-react';
import { ICON_SIZE } from '@filante/cobalt';
import { ButtonGroup } from '@/components/single/button/group';
import { TextInput } from '@/components/single/input/text';
import { PasswordInput } from '@/components/single/input/password';
import { TextAreaInput } from '@/components/single/input/text_area';

export default function Page() {
  return (
    <>
      <CommonLayout>
        <PageHeader>
          <Title>Cobalt</Title>
        </PageHeader>
        <PageBody>
          <>
            <Title order={4} c="dimmed">
              Cobalt is an open source framework for building web applications
              built on top of Mantine and Carbon Design System.
            </Title>

            <Title order={4}>
              It&apos;s free and open source. You can use it for free.
            </Title>

            <Space h="xl" />

            <Paper p="xl">
              <Stack>
                <Title order={3}>Button</Title>

                <Divider />

                <Group>
                  <Button>Button</Button>
                  <Button variant="outline">Button</Button>
                  <Button variant="transparent">Button</Button>
                  <Button rightSection={<Add size={ICON_SIZE.MD} />}>
                    Button
                  </Button>

                  <IconButton>
                    <Add size={ICON_SIZE.MD} />
                  </IconButton>

                  <ButtonGroup>
                    <SecondaryButton>Secondary Button</SecondaryButton>
                    <Button>Primary Button</Button>
                  </ButtonGroup>
                </Group>
              </Stack>
            </Paper>

            <Paper p="xl">
              <Stack>
                <Title order={3}>Input</Title>

                <Divider />

                <SimpleGrid cols={3}>
                  <Stack>
                    <TextInput
                      placeholder="AI Testing"
                      label="Workspace Name"
                    />
                    <TextInput
                      placeholder="AI Testing"
                      disabled
                      label="Workspace Name"
                    />
                    <TextInput
                      placeholder="AI Testing"
                      label="Workspace Name"
                      description="This is a description"
                    />
                    <TextInput
                      placeholder="AI Testing"
                      label="Workspace Name"
                      description="This is a description"
                      required
                    />

                    <TextInput
                      placeholder="AI Testing"
                      label="Workspace Name"
                      description="This is a description"
                      optional
                    />

                    <TextInput
                      placeholder="AI Testing"
                      label="Workspace Name"
                      description="This is a description"
                      error="This is an error"
                    />
                  </Stack>

                  <Stack>
                    <PasswordInput label="Password" placeholder="Password" />

                    <PasswordInput
                      label="Password"
                      placeholder="Password"
                      value="xxxxxxxxxxxxxxxx"
                    />
                  </Stack>

                  <Stack>
                    <TextAreaInput
                      label="Description"
                      placeholder="Something beautiful"
                    />
                  </Stack>
                </SimpleGrid>
              </Stack>
            </Paper>
          </>
        </PageBody>
      </CommonLayout>
    </>
  );
}
