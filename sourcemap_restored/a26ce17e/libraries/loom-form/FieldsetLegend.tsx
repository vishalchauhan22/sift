import React from 'react';

export const FieldsetLegend: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return <legend>{children}</legend>;
};
