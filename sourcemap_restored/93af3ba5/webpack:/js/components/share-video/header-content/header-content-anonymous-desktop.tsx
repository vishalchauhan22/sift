import React from 'react';

import { TextButton, Arrange } from '@loomhq/lens';
import { useCustomBranding } from '@js/common/custom-branding/useCustomBranding';
import { ANON_HEADER_ITEM_CLICKED } from '@js/constants/events';
import { useMatchLargeTablet } from '@js/hooks/useMatchMedia';
import * as analytics from '@js/utilities/analytics';

import {
  LEARN_TO_LOOM,
  HOW_TO_RECORD,
  BLOG,
  PRICING,
} from '../../../constants/routes';

export const HeaderContentAnonymousDesktop = ({
  videoId,
}: {
  videoId: string;
}): JSX.Element | null => {
  const isTablet = useMatchLargeTablet();
  const { shouldShowLoomBranding } = useCustomBranding({ videoId });

  if (!shouldShowLoomBranding) {
    return null;
  }

  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const SEOLinks = [
    {
      name: 'Learn to Loom',
      path: LEARN_TO_LOOM,
    },
    {
      name: 'How to Record',
      path: HOW_TO_RECORD,
    },
    {
      name: 'Loom Blog',
      path: BLOG,
    },
    {
      name: 'Pricing',
      path: PRICING,
    },
  ];

  return (
    <Arrange gap={isTablet ? 1 : 3}>
      {SEOLinks.map((link, i) => (
        <TextButton
          htmlTag="a"
          className="weight:book"
          key={i}
          href={`https://loom.com${link.path}`}
          onClick={() =>
            analytics.track(ANON_HEADER_ITEM_CLICKED, { path: link.path })
          }
          target="_blank"
        >
          {link.name}
        </TextButton>
      ))}
    </Arrange>
  );
};
