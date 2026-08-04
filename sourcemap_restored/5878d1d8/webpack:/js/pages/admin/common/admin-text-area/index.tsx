import { AdminTextAreaCopy, AdminTextAreaType } from '@js/pages/admin/common';
import React from 'react';

import { FormField, Textarea } from '@loomhq/lens';

type AdminTextAreaProps = {
  type?: AdminTextAreaType;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
  value?: string;
  disabled?: boolean;
};

export const AdminTextArea = ({
  type = AdminTextAreaType.Users,
  onChange,
  value,
  errorMessage,
  disabled,
}: AdminTextAreaProps): JSX.Element => {
  const { id, label, placeholder } = AdminTextAreaCopy[type];

  return (
    <FormField label={label} labelFor={id}>
      <Textarea
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        size="medium"
        error={errorMessage}
        onChange={onChange}
      />
    </FormField>
  );
};
