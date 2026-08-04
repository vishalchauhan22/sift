import cx from 'classnames';
import React, { useState } from 'react';

import { Container, IconButton, Loader } from '@loomhq/lens';
import { SvgTrash } from '@loomhq/lens/icons/trash';

import $ from './styles.module.css';

import placeholderImage from '@assets/img/background-for-editing/placeholder-image.svg';

const AdaptiveImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}): JSX.Element => {
  // Use a placeholder if imageSrc is broken
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = placeholderImage;
  };

  // Dynamically determine object-fit based on image dimensions
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');

  const adjustObjectFit = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    // Use 'contain' if the image is smaller than its container, otherwise 'cover'
    if (img.naturalWidth <= img.width || img.naturalHeight <= img.height) {
      setObjectFit('contain');
    } else {
      setObjectFit('cover');
    }
  };

  return (
    <img
      alt={alt}
      src={src}
      className={className}
      style={{ objectFit }}
      onLoad={adjustObjectFit}
      onError={handleImageError}
    />
  );
};

export const ImageOptionButton = ({
  isSelected,
  isLoading,
  onClick,
  imageSrc,
  onDelete,
}: {
  isSelected?: boolean;
  isLoading?: boolean;
  onClick: () => void;
  imageSrc?: string;
  onDelete?: () => void;
}): JSX.Element => {
  const [iconColor, setIconColor] = useState('grey1');

  const buttonClasses = cx({
    [$.optionButton]: true,
    [$.imageButton]: true,
    [$.isSelected]: isSelected,
    [$.isLoading]: isLoading,
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <button
      onClick={isLoading ? () => {} : onClick}
      className={buttonClasses}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader size="small" />
      ) : (
        <>
          <AdaptiveImage
            alt="Custom background preview"
            src={imageSrc ?? placeholderImage}
            className={$.optionImage}
          />
          <Container className={$.optionImageDeleteButton}>
            <IconButton
              onMouseEnter={() => setIconColor('white')}
              onMouseLeave={() => setIconColor('grey1')}
              altText="Delete Background"
              size="small"
              iconColor={iconColor}
              icon={<SvgTrash />}
              onClick={handleDelete}
            />
          </Container>
        </>
      )}
    </button>
  );
};
