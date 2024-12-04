import {
  Divider,
  Grid,
  Group,
  Pagination,
  Paper,
  PaperProps,
  PolymorphicComponentProps,
  ScrollArea,
  Select,
  Stack,
  StackProps,
  Text,
} from '@mantine/core'
import { capitalCase } from 'case-anything'
import { Children, useMemo } from 'react'
import { useRouter } from 'next/router.js'
import { DTRows } from './types.js'
import { DTCells } from './columns/index.js'
import DTTextCell from './columns/text.js'
import DTAnchorCell from './columns/anchor.js'

const DataTable = <ROWS extends DTRows, CELLS extends DTCells<ROWS>>(props: {
  rows: ROWS

  children: Array<CELLS>

  columns?: (params: { cells: CELLS[] }) => number

  loading?: boolean
  disabled?: boolean

  pagination?: {
    limit: number
    limitOptions?: number[]

    /** total number of rows in complete data */
    total: number

    page: number
    onPageChange: (page: number) => void
    onLimitChange: (size: number) => void
  }

  props?: {
    wrapper?: PolymorphicComponentProps<'div', PaperProps>
    stack?: StackProps
  }
}) => {
  const columns = useMemo(
    () => (props.columns ? props.columns({ cells: props.children }) : props.children.length * 2),
    [props.columns, props.children]
  )

  const router = useRouter()

  return (
    <>
      <Paper h="100%" {...props.props?.wrapper} withBorder>
        <Stack h="100%" {...props.props?.stack} gap={0}>
          <Grid
            columns={columns}
            p="md"
            py="xs"
            style={{
              borderRadius: 'var(--mantine-radius-md)',
            }}
          >
            {Children.toArray(
              props.children.map((column) => (
                <Grid.Col span={2} {...column.props?.col}>
                  <Text size="sm" fw="bold" {...column.props?.headerText}>
                    {capitalCase(column.label)}
                  </Text>
                </Grid.Col>
              ))
            )}
          </Grid>

          <Divider />

          <ScrollArea.Autosize h="100%" offsetScrollbars scrollbarSize={4} scrollbars="y">
            <Stack p="md" gap="xs">
              {Children.toArray(
                props.rows.map((row, rowIndex) => (
                  <>
                    <Grid columns={columns}>
                      {Children.toArray(
                        props.children.map((cell) => (
                          <Grid.Col span={2} {...cell.props?.col}>
                            {(() => {
                              switch (cell.type) {
                                case 'text': {
                                  return <DTTextCell cell={cell} row={row} router={router} />
                                }

                                case 'anchor': {
                                  return <DTAnchorCell cell={cell} row={row} />
                                }

                                case 'custom': {
                                  return cell.render(row)
                                }

                                default: {
                                  return (
                                    <Text size="sm" c="red">
                                      Error rendering column
                                    </Text>
                                  )
                                }
                              }
                            })()}
                          </Grid.Col>
                        ))
                      )}
                    </Grid>

                    {rowIndex !== props.rows.length - 1 && <Divider />}
                  </>
                ))
              )}
            </Stack>
          </ScrollArea.Autosize>

          <Divider />

          {props.pagination && (
            <Group justify="space-between" px="md" gap="sm" py="xs">
              <Group>
                <Text size="sm">Rows per page</Text>

                <Select
                  maw={70}
                  size="xs"
                  checkIconPosition="right"
                  allowDeselect={false}
                  value={props.pagination.limit.toString()}
                  onChange={(value) => {
                    if (value) {
                      props.pagination?.onLimitChange(parseInt(value, 10))
                    }
                  }}
                  data={(props.pagination?.limitOptions || [5, 10, 20, 30]).map((option) => ({
                    value: option.toString(),
                    label: option.toString(),
                  }))}
                />
              </Group>

              <Pagination
                size="sm"
                value={props.pagination.page}
                total={Math.ceil(props.pagination.total / props.pagination.limit)}
                onChange={props.pagination.onPageChange}
              />
            </Group>
          )}
        </Stack>
      </Paper>
    </>
  )
}

export { DataTable }
export default DataTable
