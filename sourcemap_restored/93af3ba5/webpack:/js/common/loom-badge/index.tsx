import React from 'react';

import { Logo } from '@loomhq/lens';

import styles from './styles.module.css';

type LoomBadgeProps = {
  href: string;
  title: string;
};

const Badge = () => (
  <>
    <span className={styles.loomBadgeText}>Made with</span>
    <Logo
      className={styles.loomBadgeLogo}
      maxWidth="4.25em"
      symbolColor="primary"
      wordmarkColor="body"
    />
  </>
);

export const LoomBadgeWithoutLink = (): JSX.Element => {
  // We show the component on the Workspace Settings page. It shouldn't be linked.
  return (
    <div className={styles.loomBadgeWrapper}>
      <Badge />
    </div>
  );
};

export const LoomBadge = ({ href, title }: LoomBadgeProps): JSX.Element => {
  return (
    <a
      className={styles.loomBadgeWrapper}
      href={href}
      aria-label={`Go to ${title}`}
    >
      <Badge />
    </a>
  );
};
