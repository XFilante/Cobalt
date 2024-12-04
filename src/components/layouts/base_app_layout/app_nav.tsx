import { AppShell, Stack, Text } from '@mantine/core'
import { NavButton, NavButtonProps } from './app_nav_components/button.js'
import { NavDivider, NavDividerProps } from './app_nav_components/divider.js'
import { Children } from 'react'
import { useRouter } from 'next/router.js'
import { HEADER_HEIGHT } from '../../../const.js'

export type NavTypes = NavButtonProps | NavDividerProps

type Props = {
  header?: React.ReactNode
  children: NavTypes[]
}

export const BaseAppNav = (props: Props) => {
  const router = useRouter()

  return (
    <>
      <AppShell.Navbar>
        {props.header && (
          <AppShell.Section h={HEADER_HEIGHT} p="5">
            {props.header}
          </AppShell.Section>
        )}
        <AppShell.Section p="5">
          <Stack gap={5}>
            {Children.toArray(
              props.children.map((d) => {
                switch (d.type) {
                  case 'button':
                    return <NavButton {...d} active={router.asPath === d.href} />

                  case 'divider':
                    return <NavDivider />

                  default:
                    return (
                      <Text size="sm" c="red">
                        Unsupported nav link type
                      </Text>
                    )
                }
              })
            )}
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>
    </>
  )
}
