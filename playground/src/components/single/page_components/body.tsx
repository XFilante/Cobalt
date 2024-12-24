import { Container, Stack } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};

export const PageBody = (props: Props) => {
  return (
    <>
      <Container size="xl">
        <Stack py="xl" pb={500}>
          {props.children}
        </Stack>
      </Container>
    </>
  );
};
