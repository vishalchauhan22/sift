import React from 'react';

import { useController } from 'react-hook-form';

import { Radio } from '@loomhq/lens';

import type { FieldValues, UseControllerProps } from 'react-hook-form';

type RadioProps = React.HTMLProps<HTMLInputElement>;

interface Props<FormValues extends FieldValues>
  extends UseControllerProps<FormValues> {
  id: string;
  value: RadioProps['value'];
  disabled?: RadioProps['disabled'];
}

export function FieldRadio<FormValues extends FieldValues = object>(
  props: Props<FormValues>
): JSX.Element {
  const { name, value, ...radioProps } = props;
  const { field } = useController(props);

  return (
    // css attribute is solely to make TS happy.
    <Radio
      {...radioProps}
      {...field}
      // @ts-expect-error FIXME: this prop isn't defined in Lens
      css={null}
      value={value}
      isChecked={Boolean(field.value === value)}
      aria-describedby={`${name}-field-error`}
    />
  );
}
