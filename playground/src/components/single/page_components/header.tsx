import { Box, Container, Stack } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};

export const PageHeader = (props: Props) => {
  return (
    <>
      <Box bg="black" c="white">
        <Container size="xl">
          <Stack mih={300} justify="end" py="xl">
            {props.children}
          </Stack>
        </Container>
      </Box>
    </>
  );
};
