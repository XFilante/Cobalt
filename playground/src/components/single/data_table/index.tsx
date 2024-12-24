import { Group, Paper, Stack, Text, Title } from '@mantine/core';

type Props = {
  header?: {
    title: string;
    description?: string;
  };
  actions?: React.ReactNode;
  height: number;
};

export const DataTable = (props: Props) => {
  return (
    <>
      <Paper>
        <Stack>
          {props.header && (
            <Stack px="lg" pt="lg" gap={0}>
              <Title order={4}>{props.header.title}</Title>
              {props.header.description && (
                <Text c="dimmed">{props.header.description}</Text>
              )}
            </Stack>
          )}

          {props.actions && (
            <Group h={props.height} justify="end" gap={0}>
              {props.actions}
            </Group>
          )}
        </Stack>
      </Paper>
    </>
  );
};
