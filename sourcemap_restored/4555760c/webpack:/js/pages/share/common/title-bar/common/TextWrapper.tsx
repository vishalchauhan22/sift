import React from 'react';

import { Text } from '@loomhq/lens';

import styles from './TextWrapperStyles.module.css';

/**
 * This wrapper keeps commonality of text styles across different title bar states.
 */
export const TextWrapper = ({
  children,
  onClick,
}: {
  children: JSX.Element | string;
  onClick?: () => void;
}): JSX.Element => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, @atlassian/a11y/interactive-element-not-keyboard-focusable
    <div className={styles.textContainer} onClick={onClick}>
      <Text size="heading-sm" fontWeight="bold" hasEllipsis ellipsisLines={1}>
        {children}
      </Text>
    </div>
  );
};
