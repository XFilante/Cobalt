import { AppShell, Box, Stack } from '@mantine/core'
import { ifProp, ifProps } from '../../helpers/index.js'
import { HEADER_HEIGHT } from '../../const.js'

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
}

export const SimpleLayout = (props: Props) => (
  <>
    <AppShell
      padding={0}
      layout="alt"
      {...ifProps({
        condition: !!props.header,
        true: { header: { height: HEADER_HEIGHT } },
      })}
    >
      {props.header && (
        <AppShell.Header withBorder={false}>
          <Box px="sm" h="100%">
            {props.header}
          </Box>
        </AppShell.Header>
      )}
      <AppShell.Main>
        <Stack px="sm" h={ifProp(!!props.header, `calc(100vh - ${HEADER_HEIGHT}px)`, '100vh')}>
          {props.children}
        </Stack>
      </AppShell.Main>
    </AppShell>
  </>
)
