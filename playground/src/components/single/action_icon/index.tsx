import {
  Tooltip,
  ActionIcon as MantineActionIcon,
  ActionIconProps,
  TooltipProps,
} from '@mantine/core';
import { ifProps } from '@filante/cobalt/helpers';

type Props = {
  height?: number;
  tooltip?: string;
  children: React.ReactNode;
  props?: {
    button?: ActionIconProps;
    tooltip?: TooltipProps;
  };
};

export const ActionIcon = (props: Props) => {
  const base = (
    <MantineActionIcon
      {...props.props?.button}
      {...ifProps({
        condition: !!props.height,
        true: {
          h: props.height,
          w: props.height,
        },
      })}
    >
      {props.children}
    </MantineActionIcon>
  );

  if (props.tooltip) {
    return (
      <Tooltip
        position="bottom-end"
        {...props.props?.tooltip}
        label={props.tooltip}
      >
        {base}
      </Tooltip>
    );
  }

  return base;
};
