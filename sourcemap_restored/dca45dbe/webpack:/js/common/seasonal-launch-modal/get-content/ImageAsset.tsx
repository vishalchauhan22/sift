import cn from 'classnames';
import React from 'react';

import styles from '../styles.module.css';

type ImageAssetProps = React.ComponentProps<'img'> & {
  alt: string;
};

export const ImageAsset = (props: ImageAssetProps): JSX.Element => {
  const alt = props.alt || 'Image asset';

  return (
    <div className={cn(styles.imageContainer, 'md-radius:xlarge')}>
      <img {...props} alt={alt} />
    </div>
  );
};
