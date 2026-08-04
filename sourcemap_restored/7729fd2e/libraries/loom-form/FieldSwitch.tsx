import React from 'react';
import { useController } from 'react-hook-form';

import { Switch } from '@loomhq/lens';

import { wrapEvent } from './helpers/wrapEvent';

import type { FieldValues, UseControllerProps } from 'react-hook-form';

type SlimSwitchProps = Omit<
  React.ComponentProps<typeof Switch>,
  'isActive' | 'name' | 'defaultValue' | 'onChange'
>;

interface Props<FormValues extends FieldValues>
  extends SlimSwitchProps,
    UseControllerProps<FormValues> {
  id: string;
  onChange?: (value: boolean) => void;
}

export function FieldSwitch<FormValues extends FieldValues = object>(
  props: Props<FormValues>
): JSX.Element {
  const { name, ...switchProps } = props;
  const { field } = useController(props);

  return (
    <Switch
      {...switchProps}
      isActive={field.value}
      aria-describedby={`${name}-field-error`}
      onChange={_evt => {
        wrapEvent(switchProps.onChange, field.onChange)(!field.value);
      }}
    />
  );
}
