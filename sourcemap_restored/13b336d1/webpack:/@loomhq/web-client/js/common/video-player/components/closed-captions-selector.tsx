import { VIDEO_QUALITY_CONTROL_CLOSED_CAPTIONS } from '@js/constants/events';
import { SHOW_CAPTIONS } from '@js/constants/localStorage';

import React from 'react';

import { Arrange } from '@loomhq/lens';
import * as analytics from '@js/utilities/analytics';
import { setLocalStorageKey } from '@js/utilities/localStorage';

import { useCaptionsSelector, useToggleCaptions } from '../hooks';
import { captionsStore } from '../hooks/captionsStore';
import styles from './styles.module.css';
import { SettingDirectoryPill } from './setting-directory-pill';
import { SettingPill } from './setting-pill';
import classNames from 'classnames';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { useVideoContext } from '@js/common/video-player';

const SettingDirectoryPillMemoized = React.memo(SettingDirectoryPill);
const SettingPillMemoized = React.memo(SettingPill);

type ClosedCaptionsSelectorProps = {
  videoId: string;
  rolloutTranslateCaptions?: boolean;
  returnToMenu?: () => void;
};

export const ClosedCaptionsSelector: React.FC<
  React.PropsWithChildren<ClosedCaptionsSelectorProps>
> = ({ videoId, rolloutTranslateCaptions, returnToMenu }) => {
  const { availableStyles, currentCaptionsStyle } = useCaptionsSelector();
  const { setCaptionsStyleSelection } = captionsStore(state => state);
  const { onToggle, captionsActive } = useToggleCaptions(videoId);
  const PillMemoized = rolloutTranslateCaptions
    ? SettingDirectoryPillMemoized
    : SettingPillMemoized;

  const {
    video: { modelId },
  } = useVideoContext();

  return (
    <div
      className={
        rolloutTranslateCaptions
          ? classNames(styles.scrollableMenuSmallScreen, {
              [styles.scrollableMenuNoOverFlow]: true,
            })
          : styles.selectorWrapper
      }
    >
      <Arrange
        gap={rolloutTranslateCaptions ? 'xsmall' : 'small'}
        justifyContent="space-between"
        autoFlow="row"
      >
        <>
          <PillMemoized
            isActive={!captionsActive}
            onClick={() => {
              if (captionsActive) {
                onToggle();
                setLocalStorageKey(SHOW_CAPTIONS, false);
                analytics.track(VIDEO_QUALITY_CONTROL_CLOSED_CAPTIONS, {
                  type: 'off',
                  ...withIdentifiers(
                    VIDEO_QUALITY_CONTROL_CLOSED_CAPTIONS,
                    AnalyticsEntityId.video(modelId, 'video_id')
                  ),
                });
              }

              if (returnToMenu) {
                returnToMenu();
              }
            }}
            key={'off'}
          >
            Off
          </PillMemoized>
          {availableStyles.map((captionsStyle, index) => (
            <PillMemoized
              isActive={
                captionsActive && currentCaptionsStyle === captionsStyle.id
              }
              onClick={() => {
                if (!captionsActive) {
                  onToggle();
                  setLocalStorageKey(SHOW_CAPTIONS, true);
                }

                setCaptionsStyleSelection(captionsStyle.id, modelId);

                if (returnToMenu) {
                  returnToMenu();
                }
              }}
              key={index}
            >
              {`${captionsStyle.label} captions`}
            </PillMemoized>
          ))}
        </>
      </Arrange>
    </div>
  );
};
