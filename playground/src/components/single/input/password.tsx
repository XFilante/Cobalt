import { PasswordInput as Input, PasswordInputProps } from '@mantine/core';
import { inputPropsResolver } from './util';

type Props = PasswordInputProps & {
  optional?: boolean;
};

export const PasswordInput = (props: Props) => {
  return (
    <>
      <Input {...inputPropsResolver(props)} />
    </>
  );
};
