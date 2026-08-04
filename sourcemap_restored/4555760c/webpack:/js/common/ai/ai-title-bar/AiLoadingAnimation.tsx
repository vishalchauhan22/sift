import { AUTO_TITLE_GLYPH_HOVER } from '@js/constants/events';

import React from 'react';

import { AiFeatureMarkers } from '@js/utilities/rum/constants';
import { SuccessMarker } from '@js/utilities/rum/markers';

import { Text, Tooltip } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';

import styles from './AiLoadingAnimation.module.css';

export const AiLoadingAnimation = ({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element => {
  return (
    <div className={styles.aiTitleAnimationWrapper}>
      <SuccessMarker name={AiFeatureMarkers.AutoTitleLoading} />
      <Tooltip
        content="We are using AI to create a title tailored to your Loom."
        placement="topCenter"
      >
        <div className={styles.aiTitleAnimation}>
          <div className={styles.assistant}>
            <div className={styles.gradient} />
            <div className={styles.mask} />
          </div>
        </div>
        <button
          className={styles.aiTitleAnimationText}
          onClick={onClick}
          onMouseEnter={() => analytics.track(AUTO_TITLE_GLYPH_HOVER)}
        >
          <Text size="heading-sm" color="bodyDimmed">
            Generating title
          </Text>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#96999e">
            <circle cx="5.5" cy="12.5" r="1.5">
              <animate
                attributeName="cy"
                values="11;13;13;13;13;13;13;11"
                dur="1s"
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>
            <circle cx="11.5" cy="10.5" r="1.5">
              <animate
                attributeName="cy"
                values="11;13;13;13;13;13;13;11"
                dur="1s"
                repeatCount="indefinite"
                begin="0.2s"
              />
            </circle>
            <circle cx="17.5" cy="12.5" r="1.5">
              <animate
                attributeName="cy"
                values="11;13;13;13;13;13;13;11"
                dur="1s"
                repeatCount="indefinite"
                begin="0.4s"
              />
            </circle>
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};
