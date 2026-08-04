import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Checkbox } from '@loomhq/lens';

import type { FieldValues, UseControllerProps } from 'react-hook-form';

type SlimCheckboxProps = Omit<
  React.ComponentProps<typeof Checkbox>,
  'name' | 'defaultValue'
>;
interface Props<FormValues extends FieldValues>
  extends SlimCheckboxProps,
    UseControllerProps<FormValues> {
  id: string;
}

export function FieldCheckbox<FormValues extends FieldValues = object>(
  props: Props<FormValues>
): JSX.Element {
  const { rules, shouldUnregister, defaultValue, name, ...rest } = props;

  const context = useFormContext();
  const control = props.control || context.control;

  const { isIndeterminate, ...checkboxProps } = rest;

  const value = checkboxProps.value;

  const ref = React.useRef(null);
  const [checked, setChecked] = React.useState<boolean>(
    control && typeof defaultValue === 'boolean' ? defaultValue : false
  );
  const [indeterminate, setIndeterminate] = React.useState<boolean | undefined>(
    control &&
      isIndeterminate &&
      (defaultValue === undefined || defaultValue === null)
      ? true
      : false
  );

  const { field } = useController({
    name,
    control: props.control || undefined,
    rules,
    shouldUnregister,
    defaultValue,
  });

  return (
    <Checkbox
      {...field}
      {...checkboxProps}
      ref={ref}
      aria-describedby={`${name}-field-error`}
      isChecked={Boolean(field.value)}
      onChange={() => {
        if (isIndeterminate) {
          // Handle change steps:
          // true => null (indeterminate) => false => true
          if (checked) {
            setChecked(false);
            setIndeterminate(true);
            field.onChange(null);
          } else if (indeterminate) {
            setChecked(false);
            setIndeterminate(false);
            field.onChange(false);
          } else {
            setChecked(true);
            setIndeterminate(false);
            field.onChange(value || true);
          }
        } else {
          setChecked(!field.value);

          if (value) {
            field.onChange(field.value ? undefined : value);
          } else {
            field.onChange(!field.value);
          }
        }
      }}
    />
  );
}
