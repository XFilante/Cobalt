import { Divider, Group, GroupProps, Text } from '@mantine/core';

type Props = {
  name: string;
  bg?: 'black' | 'white';
  height: number;
  links?: React.ReactNode;
  children?: React.ReactNode;
  props?: {
    wrapper?: GroupProps;
  };
};

export const Header = (props: Props) => {
  return (
    <>
      <Group
        justify="space-between"
        {...props.props?.wrapper}
        h="100%"
      >
        <Group h="100%">
          <Text fw="bold" pl="md">
            {props.name}
          </Text>

          {props.links && (
            <Group h="100%">
              <Divider h="60%" my="auto" orientation="vertical" />

              <Group gap={0} h="100%">
                {props.links}
              </Group>
            </Group>
          )}
        </Group>

        {props.children && (
          <>
            <Group gap={0}>
              {props.children}
            </Group>
          </>
        )}
      </Group>
    </>
  );
};
