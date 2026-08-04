import React from 'react';

type Props = React.HTMLProps<HTMLLabelElement> & {
  htmlFor: string;
};

export const FieldLabel: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  return <label {...props}>{children}</label>;
};
