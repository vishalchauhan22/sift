import React from 'react';
import { DOWNLOAD } from '@js/constants/menuOptions';
import classNames from 'classnames';

import { IconButton, Tooltip } from '@loomhq/lens';
import { SvgDownload } from '@loomhq/lens/icons/download';
import { CopyShareVideoLinkIconTextButton } from '@js/common/share-video/copy-link-button';
import { useTitleBar } from '@js/pages/share/common';
import * as analytics from '@js/utilities/analytics';

import { RichTitleBar } from '@js/pages/share/common/title-bar';
import { OwnerInfo } from '@js/common/owner-info';
import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { ViewerInsights } from '@js/components/share-video/viewer-insights';
import styles from './index.module.css';
import { ANONYMOUS_DOWNLOAD_VIDEO_BUTTON_CLICKED } from '@js/constants/events';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { useModals } from '@js/common/modal-container/useModals';
import { getAnonShareGateModalType } from '@js/utilities/modals';
import { Gates } from '@js/pages/share/common/constants/gates';
import { ASGSource } from '@js/common/onboarding';

const { AnonDownloadVideoOnSharePage } = ASGSource;

export const TitleBarDark = ({
  downloadable,
  organizationId,
  showViewsUnderVideo,
  thumbnail,
  videoId,
}: {
  downloadable?: boolean;
  organizationId?: string;
  showViewsUnderVideo: boolean;
  thumbnail: string;
  videoId: string;
}): JSX.Element => {
  const { isInEditMode: isTitleInEditMode } = useTitleBar();
  const { openModal } = useModals();
  const isLoggedIn = useIsCurrentUserLoggedIn();

  const openDownloadModal = (): void => {
    analytics.track(ANONYMOUS_DOWNLOAD_VIDEO_BUTTON_CLICKED, {
      ...withIdentifiers(
        ANONYMOUS_DOWNLOAD_VIDEO_BUTTON_CLICKED,
        AnalyticsEntityId.video(videoId, 'videoId')
      ),
      isDownloadVideoEnabled: downloadable,
    });

    openModal({
      modalType: getAnonShareGateModalType(),
      options: {
        header: 'Sign up to download this video',
        hideModeSwitcher: true,
        gate: Gates.HARD_GATE_DOWNLOAD,
        source: AnonDownloadVideoOnSharePage,
      },
    });
  };

  return (
    <div className={styles.videoTitleContainer} data-lens-theme="dark">
      <div
        className={classNames(
          isTitleInEditMode ? styles.isInEditMode : null,
          styles.videoTitleLayout
        )}
      >
        <div>
          <RichTitleBar />
          {isTitleInEditMode ? null : <OwnerInfo />}
          <div className={styles.videoTitleReflection}>
            {thumbnail ? <img src={thumbnail} alt="" /> : null}
          </div>
        </div>
        {showViewsUnderVideo && !isTitleInEditMode ? (
          <div className={styles.videoTitleViews}>
            <ViewerInsights videoId={videoId} buttonHasBorder={true} />
            {isLoggedIn === false ? (
              <>
                <CopyShareVideoLinkIconTextButton
                  hasTransparentBackground={true}
                  organizationId={organizationId}
                  videoId={videoId}
                  analyticsSource="share_page"
                />
                {downloadable ? (
                  <Tooltip content="Download video">
                    <IconButton
                      altText={DOWNLOAD}
                      icon={<SvgDownload />}
                      onClick={openDownloadModal}
                    />
                  </Tooltip>
                ) : null}
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
