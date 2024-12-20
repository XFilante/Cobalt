import { AppShell, Box } from '@mantine/core'

type Props = {
  nav: React.ReactNode
  children: React.ReactNode
}

export const BaseAppLayout = (props: Props) => {
  return (
    <>
      <AppShell navbar={{ width: 250, breakpoint: 'sm' }} padding={0} layout="alt">
        {props.nav}
        <AppShell.Main>
          <Box px="sm" h="100vh">
            {props.children}
          </Box>
        </AppShell.Main>
      </AppShell>
    </>
  )
}
