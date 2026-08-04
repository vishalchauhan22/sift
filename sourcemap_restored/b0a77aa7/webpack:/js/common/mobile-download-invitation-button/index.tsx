import { MOBILE_DOWNLOAD_INVITATION_BTN_CLICKED } from '@js/constants/events';

import { MOBILE_ANDROID_APP, MOBILE_IOS_APP } from '@js/constants/routes';

import React from 'react';

import { isIOS, isAndroid } from '@js/utilities/device';

import { Button } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';

import styles from './styles.module.css';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../utilities/analytics/attribute-transformer';

type MobileDownloadInvitationButtonProps = {
  size: 'small' | 'medium' | 'large';
  text?: string;
  videoId?: string | null;
  source?: string;
};

export const MobileDownloadInvitationButton = ({
  size,
  text = 'Open app',
  videoId,
  source = 'Anonymous header',
}: MobileDownloadInvitationButtonProps): JSX.Element => {
  const [downloadBtnWasClicked, setDownloadBtnWasClicked] =
    React.useState<boolean>(false);

  const handleClick = () => {
    // Ensure that the event is only tracked after the first click by using a state variable.
    if (!downloadBtnWasClicked && videoId) {
      analytics.track(MOBILE_DOWNLOAD_INVITATION_BTN_CLICKED, {
        ...withIdentifiers(
          MOBILE_DOWNLOAD_INVITATION_BTN_CLICKED,
          AnalyticsEntityId.video(videoId, 'videoId')
        ),
        isIOS,
        isAndroid,
        source,
      });
      setDownloadBtnWasClicked(true);
    }

    if (isIOS) {
      window.location.href = MOBILE_IOS_APP;
    } else {
      window.location.href = MOBILE_ANDROID_APP;
    }
  };

  return (
    <Button onClick={handleClick} size={size} variant="primary">
      <span className={styles.cta}>{text}</span>
    </Button>
  );
};
