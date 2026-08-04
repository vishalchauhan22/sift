import React from 'react';

import styles from './style.module.less';

/**
 * @description Used to group related form controls together
 * Most commonly used to group radio & checkbox controls
 * @requires FieldsetLegend child element
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
 */
export const Fieldset: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <fieldset className={`${styles['form_fieldset']}`} style={{ border: 0 }}>
      {children}
    </fieldset>
  );
};
