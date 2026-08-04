/* eslint-disable @loomhq/loom/no-js-extension */
import cn from 'classnames';
import React from 'react';

import styles from './FadeText.module.less';

/**
 * @param {Object} args
 * @param {boolean} [args.visible]
 * @param {string & {}} [args.left]
 * @param {string & {}} [args.right]
 * @param {string & {}} [args.top]
 * @param {string & {}} [args.bottom]
 * @param {JSX.Element | null} [args.children]
 */
export function FadeText({ visible, left, right, top, bottom, children }) {
  return (
    <span
      className={cn(styles.text, !visible && styles.hidden)}
      style={{ left, right, top, bottom }}
    >
      {children}
    </span>
  );
}

export function FadeRoot({ as: Component = 'span', children, ...props }) {
  return (
    <Component {...props} className={cn(styles.root, props.className)}>
      {children}
    </Component>
  );
}
