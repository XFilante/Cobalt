import { ActionIcon } from '@/components/single/action_icon';
import { Header } from '@/components/single/header';
import {
  AppShell,
  Button,
  Container,
  NavLink,
  Stack,
  Title,
} from '@mantine/core';
import { Switcher } from '@carbon/icons-react';
import { ICON_SIZE } from '@filante/cobalt';

const HEADER_HEIGHT = 47;

export default function Page() {
  return (
    <>
      <AppShell
        header={{ height: HEADER_HEIGHT }}
        navbar={{
          width: 256,
          breakpoint: 'sm',
        }}
        padding={0}
        withBorder={false}
      >
        <AppShell.Header>
          <Header
            bg="black"
            height={HEADER_HEIGHT}
            name="Cobalt"
            links={
              <>
                <Button h="100%" variant="subtle" color="white">
                  Application
                </Button>
                <Button h="100%" variant="subtle" color="white">
                  Components
                </Button>
              </>
            }
            props={{
              wrapper: {
                bg: 'black',
                c: 'gray.1',
              },
            }}
          >
            <>
              <ActionIcon tooltip="Menu" height={HEADER_HEIGHT}>
                <Switcher
                  size={ICON_SIZE.SM}
                  color="var(--mantine-color-gray-1)"
                />
              </ActionIcon>
            </>
          </Header>
        </AppShell.Header>

        <AppShell.Navbar withBorder py="md">
          <Stack>
            <NavLink
              href="#required-for-focus"
              label="With icon"
              // leftSection={<IconHome2 size="1rem" stroke={1.5} />}
            />
          </Stack>
        </AppShell.Navbar>

        <AppShell.Main bg="gray.0">
          <Stack>
            <Container fluid bg="black" h="40vh" c="white" size="100%">
              <Title>Components</Title>
            </Container>
          </Stack>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
