import React from 'react';

import styles from './style.module.less';

interface Props {
  variant?: 'vertical' | 'horizontal';
}

export const Field: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  variant = 'vertical',
}): JSX.Element => {
  if (variant === 'horizontal') {
    return (
      <div
        className={`${styles['form_field']} ${styles['form_field_horizontal']}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={`${styles['form_field']} ${styles['form_field_vertical']}`}>
      {children}
    </div>
  );
};
