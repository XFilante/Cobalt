import { TextInputProps, TextInput as Input } from '@mantine/core';
import { inputPropsResolver } from './util';

type Props = TextInputProps & {
  optional?: boolean;
};

export const TextInput = (props: Props) => {
  return (
    <>
      <Input {...inputPropsResolver(props)} />
    </>
  );
};
