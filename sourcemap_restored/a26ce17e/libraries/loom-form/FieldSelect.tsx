import React from 'react';

import { useController } from 'react-hook-form';

import { Select } from '@loomhq/lens';

import { wrapEvent } from './helpers/wrapEvent';

import type { FieldValues, UseControllerProps } from 'react-hook-form';

type SlimSelectProps = Omit<
  React.ComponentProps<typeof Select>,
  | 'onBlur'
  | 'onFocus'
  | 'onChange'
  | 'value'
  | 'onOpenChange'
  | 'onOuterClick'
  | 'defaultValue'
>;

interface Props<FormValues extends FieldValues>
  extends SlimSelectProps,
    UseControllerProps<FormValues> {
  onChange?: (value: string) => void;
}

export function FieldSelect<FormValues extends FieldValues = object>(
  props: Props<FormValues>
): JSX.Element {
  const { rules, shouldUnregister, defaultValue, name, ...selectProps } = props;
  const { field, fieldState } = useController({
    name,
    control: props.control || undefined,
    rules,
    shouldUnregister,
    defaultValue,
  });

  const { onChange: _onChange, ref: _ref, ...rest } = field;

  return (
    <Select
      {...rest}
      {...selectProps}
      aria-invalid={fieldState.error ? 'true' : 'false'}
      aria-describedby={`${name}-field-error`}
      selectedOptionValue={field.value}
      onChange={selected => {
        wrapEvent(
          selectProps.onChange,
          field.onChange
        )((selected as any).value);
      }}
    />
  );
}
