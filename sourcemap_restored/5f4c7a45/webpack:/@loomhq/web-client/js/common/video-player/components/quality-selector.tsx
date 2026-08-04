// TODO(next author): Please convert styled component to native Lens and/or module css instead

import React from 'react';

import { useQualitySelector } from '../hooks';

import styles from './styles.module.css';
import { Arrange } from '@loomhq/lens';
import { SettingDirectoryPill } from './setting-directory-pill';
import { SettingPill } from './setting-pill';

type QualitySelectorProps = {
  videoId: string;
  rolloutTranslateCaptions?: boolean;
  returnToMenu?: () => void;
};

export const QualitySelector: React.FC<
  React.PropsWithChildren<QualitySelectorProps>
> = ({ videoId, rolloutTranslateCaptions, returnToMenu }) => {
  const { handleVideoQualityChange, currentQualityId, availableQualities } =
    useQualitySelector(videoId);

  const handleOnSettingPillClick = React.useCallback(
    (newQualityId: number) => () => {
      handleVideoQualityChange(newQualityId);
    },
    [handleVideoQualityChange]
  );

  const Pill = rolloutTranslateCaptions ? SettingDirectoryPill : SettingPill;

  return (
    <div className={styles.selectorWrapper}>
      <Arrange
        gap={rolloutTranslateCaptions ? 'xsmall' : 'small'}
        justifyContent="space-between"
        autoFlow="row"
      >
        {availableQualities.map((qualityValue, index) => (
          <Pill
            isActive={currentQualityId === qualityValue.id}
            onClick={() => {
              handleOnSettingPillClick(qualityValue.id);

              if (returnToMenu) {
                returnToMenu();
              }
            }}
            key={index}
          >
            {qualityValue.label}
          </Pill>
        ))}
      </Arrange>
    </div>
  );
};
