import React from 'react';

import { useController } from 'react-hook-form';

import { TextInput } from '@loomhq/lens';

import { wrapEvent } from './helpers/wrapEvent';

import type { FieldValues, UseControllerProps } from 'react-hook-form';

type TextInputProps = Omit<
  React.ComponentProps<typeof TextInput>,
  'name' | 'defaultValue'
>;

interface Props<FormValues extends FieldValues>
  extends UseControllerProps<FormValues>,
    TextInputProps {
  id: string;
}

export function FieldInput<FormValues extends FieldValues = object>({
  ...props
}: Props<FormValues>): JSX.Element {
  const { rules, shouldUnregister, defaultValue, name, ...inputProps } = props;
  const { field, fieldState, formState } = useController({
    name,
    control: props.control || undefined,
    rules,
    shouldUnregister,
    defaultValue,
  });

  const showError =
    Boolean(fieldState.error) &&
    (fieldState.isTouched || formState.isSubmitted);

  return (
    // TS casting below because of @emotion type issues.
    <TextInput
      {...field}
      {...inputProps}
      aria-invalid={fieldState.invalid ? 'true' : 'false'}
      aria-describedby={`${name}-field-error`}
      aria-required={rules?.required === 'Required' ? true : false}
      hasError={showError}
      onChange={wrapEvent(inputProps.onChange, field.onChange)}
      onBlur={wrapEvent(inputProps.onBlur, field.onBlur)}
    />
  );
}
