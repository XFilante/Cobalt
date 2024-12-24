import { ButtonProps, Button as MantineButton } from '@mantine/core';

type Props = ButtonProps & {};

export const Button = (props: Props) => {
  return (
    <>
      <MantineButton
        fw="400"
        mih={50}
        justify="space-between"
        styles={{
          label: {
            marginRight: 40,
          },
        }}
        size="md"
        {...props}
      />
    </>
  );
};

export const SecondaryButton = (props: Props) => {
  return (
    <>
      <Button color="gray.9" {...props} />
    </>
  );
};

export const IconButton = (props: Props) => {
  return (
    <>
      <Button styles={{}} px="sm" w="fit-content" {...props} />
    </>
  );
};
