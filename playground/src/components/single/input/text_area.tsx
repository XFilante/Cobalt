import { Textarea as Input, TextareaProps } from '@mantine/core';
import { inputPropsResolver } from './util';

type Props = TextareaProps & {
  optional?: boolean;
};

export const TextAreaInput = (props: Props) => {
  return (
    <>
      <Input
        resize="vertical"
        autosize
        minRows={3}
        {...inputPropsResolver(props)}
      />
    </>
  );
};
