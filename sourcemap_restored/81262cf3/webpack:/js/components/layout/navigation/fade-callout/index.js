/* eslint-disable @loomhq/loom/no-js-extension */
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import styles from './styles.module.less';

export function FadeCallout({ visible, width, children, ...props }) {
  const isFirstRender = useRef(true);
  const [className, setClassName] = useState();

  useEffect(() => {
    const initial = isFirstRender.current;

    if (visible) {
      setClassName([styles.visible, initial && styles.initial]);
    } else {
      setClassName([styles.hidden, initial && styles.initial]);
    }
  }, [visible]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  if (width === 'expanded') {
    width = styles.widthExpanded;
  } else if (width === 'collapsed') {
    width = styles.widthCollapsed;
  }

  return (
    <div {...props} className={cn(className, width, props.className)}>
      {children}
    </div>
  );
}
