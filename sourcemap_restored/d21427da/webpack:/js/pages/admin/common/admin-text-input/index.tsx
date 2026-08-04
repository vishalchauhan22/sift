import { AdminTextInputCopy, AdminTextInputType } from '@js/pages/admin/common';
import React from 'react';

import { FormField, TextInput } from '@loomhq/lens';

type AdminTextInputProps = {
  type: AdminTextInputType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  value?: string;
  disabled?: boolean;
  idSuffix?: string;
};

export const AdminTextInput = ({
  type,
  onChange,
  onBlur,
  value,
  hasError,
  disabled = false,
  idSuffix,
}: AdminTextInputProps): JSX.Element => {
  const { id: idBase, label, placeholder } = AdminTextInputCopy[type];

  const id = idSuffix ? `${idBase}-${idSuffix}` : idBase;

  return (
    <FormField label={label} labelFor={id}>
      <TextInput
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        value={value ?? undefined}
        size="medium"
        hasError={hasError}
        onChange={onChange}
        onBlur={onBlur}
      />
    </FormField>
  );
};
