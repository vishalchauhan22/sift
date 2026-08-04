import React from 'react';

import { Link as LensLink } from '@loomhq/lens';

export const Link = (props: { url: string; children: string }): JSX.Element => {
  const { url, children } = props;

  return (
    <LensLink href={url} target="_blank" rel="noopener">
      {children}
    </LensLink>
  );
};
