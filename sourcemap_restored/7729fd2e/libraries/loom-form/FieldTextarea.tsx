import React from 'react';
import { useController } from 'react-hook-form';

import { Textarea } from '@loomhq/lens';

import type { FieldValues, UseControllerProps } from 'react-hook-form';

type SlimTextareaProps = Omit<
  React.ComponentProps<typeof Textarea>,
  'onBlur' | 'onFocus' | 'onChange' | 'value' | 'name' | 'defaultValue'
>;

interface Props<FormValues extends FieldValues>
  extends SlimTextareaProps,
    UseControllerProps<FormValues> {
  id: string;
}

export function FieldTextarea<FormValues extends FieldValues = object>(
  props: Props<FormValues>
): JSX.Element {
  const { rules, shouldUnregister, defaultValue, name, ...inputProps } = props;
  const { field, fieldState } = useController({
    name,
    control: props.control || undefined,
    rules,
    shouldUnregister,
    defaultValue,
  });

  return (
    <Textarea
      {...field}
      {...inputProps}
      aria-invalid={fieldState.invalid ? 'true' : 'false'}
      aria-describedby={`${name}-field-error`}
    />
  );
}
