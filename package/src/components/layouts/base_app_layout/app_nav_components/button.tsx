import { NavLink } from '@mantine/core'

export type NavButtonProps = { type: 'button'; name: string; href: string; icon: React.ReactNode }

type Props = NavButtonProps & {
  active: boolean
}

export const NavButton = (props: Props) => (
  <>
    <NavLink
      href={props.href}
      label={props.name}
      leftSection={props.icon}
      variant="filled"
      active={props.active}
      h="35px"
      styles={{
        root: {
          borderRadius: 'var(--mantine-radius-sm)',
        },
        label: {
          fontSize: 'var(--mantine-font-size-sm)',
        },
      }}
    />
  </>
)
