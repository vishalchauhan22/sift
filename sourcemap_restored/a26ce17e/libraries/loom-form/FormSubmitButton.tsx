import React from 'react';

import { Button } from '@loomhq/lens';

import type { FieldValues, UseFormStateProps } from 'react-hook-form';

type LensButtonProps = React.ComponentProps<typeof Button>;

type FilteredLensButtonProps = Omit<
  LensButtonProps,
  'isDisabled' | 'hasLoader'
>;

interface OwnProps {
  loader?: boolean;
}

type Props<FormValues extends FieldValues> = FilteredLensButtonProps &
  OwnProps &
  UseFormStateProps<FormValues>;

export function FormSubmitButton<FormValues extends FieldValues = object>({
  disabled,
  loader,
  ...props
}: Props<FormValues>): JSX.Element {
  return (
    <Button
      type="submit"
      disabled={disabled}
      isDisabled={disabled}
      hasLoader={loader}
      {...props}
    />
  );
}
