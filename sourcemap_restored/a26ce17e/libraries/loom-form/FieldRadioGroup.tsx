import React from 'react';

import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import { Fieldset } from './Fieldset';

interface Props<FormValues extends FieldValues>
  extends UseControllerProps<FormValues> {
  children: React.ReactNode;
}

export function FieldRadioGroup<FormValues extends FieldValues = object>({
  name,
  control,
  rules,
  children,
}: Props<FormValues>): JSX.Element {
  useController({ name, control, rules });

  return <Fieldset>{children}</Fieldset>;
}
