import React from 'react';

import { DEFAULT_CTA_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import { useGetCta } from '@js/common/cta-form';
import { useVideoContext } from '@js/common/video-player';
import { Page } from '@js/components/share-video-fresh/right-panel/editor-tools/Page';
import { EDIT_TOOLS_LIST } from '@js/pages/share/common';

import { useHasScope } from '@js/hooks/useHasScopes';

export const AddLinkSubtab = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element => {
  const { video } = useVideoContext();
  const hasCta = useGetCta(video.id)?.ctaEnabled;
  // TODO: figure out if it's okay to remove this, ff is set to specific user scopes but
  // hasDefaultCtaScope already checks the user scope
  // const hasDefaultCtaFlag = useFeatureFlagValue(ROLLOUT_DEFAULT_CTA);
  // update: flag removed from LD, scope will need to be reenabled in Statsig
  const hasDefaultCtaScope = useHasScope(DEFAULT_CTA_ACCESS);

  return (
    <Page
      currentPage={EDIT_TOOLS_LIST.Link}
      onClose={onClose}
      pageTitle={hasCta ? 'Edit the link' : 'Add a link'}
      showDefaultCta={hasDefaultCtaScope}
    />
  );
};
