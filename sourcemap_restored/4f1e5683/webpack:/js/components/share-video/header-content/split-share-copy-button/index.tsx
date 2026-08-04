import { CopyShareVideoLinkIconButton } from '@js/common/share-video/copy-link-button';
import { ShareButton } from '@js/components/share-video/share-buttons';
import React from 'react';

import { Arrange } from '@loomhq/lens';

import styles from './styles.module.css';

type SplitShareCopyButtonProps = {
  organizationId: string | undefined; // TODO LEAF-95 remove organizationId prop when clean up FG
  isLoggedIn: boolean;
  videoId: string;
  videoTitle: string;
  showCopyLinkTutorial: boolean;
  viewerInMatchingWorkspace: boolean;
};

export const SplitShareCopyButton = ({
  organizationId,
  isLoggedIn,
  videoId,
  videoTitle,
  showCopyLinkTutorial,
  viewerInMatchingWorkspace,
}: SplitShareCopyButtonProps): JSX.Element => {
  return (
    <Arrange gap={viewerInMatchingWorkspace ? '1px' : '0'}>
      <div className={styles.leftButton}>
        <ShareButton
          isLoggedIn={isLoggedIn}
          videoId={videoId}
          source="share_page"
        />
      </div>
      <div className={styles.rightButton}>
        <CopyShareVideoLinkIconButton
          organizationId={organizationId}
          videoId={videoId}
          videoName={videoTitle}
          analyticsSource="share_page"
          showTutorial={showCopyLinkTutorial}
          variant={viewerInMatchingWorkspace ? 'primary' : 'neutral'}
        />
      </div>
    </Arrange>
  );
};
