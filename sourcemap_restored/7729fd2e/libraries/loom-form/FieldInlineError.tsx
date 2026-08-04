import React from 'react';

import { useController } from 'react-hook-form';

import { Text } from '@loomhq/lens';

import type { FieldValues, UseControllerProps } from 'react-hook-form';

type Props<FormValues extends FieldValues> = UseControllerProps<FormValues>;

export function FieldInlineError<FormValues extends FieldValues = object>(
  props: Props<FormValues>
): JSX.Element | null {
  const { fieldState, formState } = useController(props);
  const { name } = props;

  if ((formState.isSubmitted || fieldState.isTouched) && fieldState.error) {
    return (
      <Text
        id={`${name}-field-error`}
        className="loom-form-inline-error"
        color="danger"
        size="body-md"
        role="alert"
      >
        {fieldState.error && fieldState.error.message}
      </Text>
    );
  }

  return null;
}
