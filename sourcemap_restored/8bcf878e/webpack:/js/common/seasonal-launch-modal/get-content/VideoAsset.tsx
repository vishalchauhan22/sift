import cn from 'classnames';
import React from 'react';

import styles from '../styles.module.css';

type VideoAssetProps = React.ComponentProps<'video'> & {
  variant?: 'border' | 'borderless';
};

export const VideoAsset = ({
  variant = 'borderless',
  ...videoProps
}: VideoAssetProps): React.ReactElement => {
  const containerClassName =
    variant === 'border'
      ? undefined
      : cn(styles.videoContainer, 'md-radius:xlarge');
  const videoClassName =
    variant === 'border' ? cn('border', 'md-radius:xlarge') : undefined;

  return (
    <div className={cn(containerClassName, 'height:full')}>
      <video
        className={cn(videoClassName, styles.fullCover)}
        {...videoProps}
        loop
        autoPlay
        muted
      />
    </div>
  );
};
