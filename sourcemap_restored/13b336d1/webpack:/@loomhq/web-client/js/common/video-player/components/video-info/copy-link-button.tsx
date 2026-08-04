/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { IconButton, Tooltip } from '@loomhq/lens';
import { SvgLink } from '@loomhq/lens/icons/link';

import { copyToClipBoard } from '../../clipboard';
import { useVideoContext } from '../../context';

export const CopyLinkButton = ({
  actionSize,
  container,
}: {
  actionSize?: 'small' | 'medium';
  container: HTMLElement;
}): JSX.Element => {
  const [hasBeenClicked, setHasBeenClicked] = React.useState(false);
  const { userContext } = useVideoContext();
  const { video } = useVideoContext();
  const url = `/share/${video.modelId}`;
  const LOOM_PROD_URI = 'https://www.loom.com';

  const onCopyLinkClick = () => {
    const shareId = uuidv4();
    const fullUrl = `${
      userContext.baseUrl || LOOM_PROD_URI
    }${url}?sid=${shareId}`;

    copyToClipBoard(fullUrl);
    setHasBeenClicked(true);
    setTimeout(() => setHasBeenClicked(false), 2000);
  };

  return (
    <Tooltip
      content={hasBeenClicked ? 'Link copied!' : 'Copy Link'}
      placement="bottomCenter"
      container={container}
      tabIndex={-1}
    >
      <IconButton
        size={actionSize}
        onClick={onCopyLinkClick}
        altText="Copy Link"
        icon={<SvgLink />}
        data-name="CopyLinkButton"
      />
    </Tooltip>
  );
};
