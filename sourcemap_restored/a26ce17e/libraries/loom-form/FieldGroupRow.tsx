import React from 'react';

import styles from './style.module.less';

export const FieldGroupRow: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return <div className={`${styles['form_field-group']}`}>{children}</div>;
};
