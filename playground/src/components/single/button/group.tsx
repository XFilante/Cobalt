import { Group, GroupProps } from '@mantine/core';

type Props = GroupProps & {};

export const ButtonGroup = (props: Props) => {
  return (
    <>
      <Group gap={0} {...props} />
    </>
  );
};
