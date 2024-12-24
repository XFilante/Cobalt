import { AppShell, NavLink, Stack } from '@mantine/core';
import { Header } from '../single/header';
import { useRouter } from 'next/router';

const HEADER_HEIGHT = 47;

const LINK_LIST: {
  name: string;
  href?: string;
  children?: {
    name: string;
    href?: string;
  }[];
}[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Components',
    children: [
      {
        name: 'Button',
        href: '/component/button',
      },
    ],
  },
];

type Props = {
  children: React.ReactNode;
};

export const CommonLayout = (props: Props) => {
  const router = useRouter();

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
            props={{
              wrapper: {
                bg: 'black',
                c: 'gray.1',
              },
            }}
          />
        </AppShell.Header>

        <AppShell.Navbar withBorder py="md">
          <Stack gap={0}>
            {LINK_LIST.map((d) => {
              return (
                <NavLink
                  key={d.name}
                  label={d.name}
                  href={d.href}
                  c="black"
                  color="gray"
                  active={router.pathname === d.href}
                  {...(d.children && {
                    childrenOffset: 0,
                    children: d.children.map((c) => {
                      return (
                        <NavLink
                          key={c.name}
                          href={c.href}
                          label={c.name}
                          c="black"
                          color="gray"
                          active={router.pathname === c.href}
                          styles={{
                            label: {
                              marginLeft: 20,
                            },
                          }}
                        />
                      );
                    }),
                  })}
                />
              );
            })}
          </Stack>
        </AppShell.Navbar>

        <AppShell.Main bg="gray.0">{props.children}</AppShell.Main>
      </AppShell>
    </>
  );
};
