import cx from 'classnames';

import React, { useState, useRef, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';

import { Container, Loader, Icon } from '@loomhq/lens';
import { SvgAdd } from '@loomhq/lens/icons/add';
import { SvgMinus } from '@loomhq/lens/icons/minus';
import { useThumbnailFlow } from '@js/common/thumbnail-flow';
import { useVideoContext } from '@js/common/video-player';

import DragToRepositionSvg from '@assets/img/illustrations/drag-to-reposition.svg';

import { Slider } from './slider';

import styles from './styles.module.css';

import { PositionProps, WindowDimsProps } from './types';
import { useUploadVideoThumbnail } from './useUploadVideoThumbnail';

const MAX_ZOOM = 4;
const MIN_ZOOM = 1;

export const ThumbnailPositioner = (): JSX.Element | null => {
  const {
    video: {
      thumbnails: { og_thumbnail_crop_dims: ogCropDims },
    },
  } = useVideoContext();
  const {
    thumbnailData: {
      uploading,
      initiateSave,
      thumbnailLocal: thumbnailLocalUrl,
      ogDims: originalImageDims,
    },
  } = useThumbnailFlow();

  const { width: ogImageWidth, height: ogImageHeight } = originalImageDims ?? {
    width: 0,
    height: 0,
  };
  const ogPositionInfo = ogCropDims?.position_info ?? {
    position: { x: 0, y: 0 },
    scale: 1,
  };
  const [scale, setScale] = useState<number>(ogPositionInfo.scale);
  const [position, setPosition] = useState<PositionProps>(
    ogPositionInfo.position
  );

  const [windowDims, setWindowDims] = useState<WindowDimsProps>({
    height: 0,
    width: 0,
  });
  const [dragging, setDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cropperRef = useRef<AvatarEditor>(null);

  const handleMove = () => {
    if (!dragging) {
      setDragging(true);
    }
  };

  const handleInteractionEnd = () => {
    setDragging(false);
  };
  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, MAX_ZOOM));
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, MIN_ZOOM));
  };

  const updateDimension = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      setWindowDims({ width, height });
    }
  };

  // on mount
  useEffect(() => {
    window.addEventListener('resize', updateDimension);

    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, []);

  useUploadVideoThumbnail({
    initiateSave,
    cropperRef,
    currentlyUploading: uploading,
    thumbnailLocalUrl: thumbnailLocalUrl as string,
    options: {
      full_width: ogImageWidth,
      full_height: ogImageHeight,
      position_info: { scale, position },
    },
  });

  useEffect(() => {
    if (ogCropDims) {
      const {
        position_info: { position, scale },
      } = ogCropDims;

      setPosition(position);
      setScale(scale);
    }
  }, [ogCropDims]);

  useEffect(() => {
    if (thumbnailLocalUrl) {
      updateDimension();
    }
  }, [thumbnailLocalUrl]);

  const currentlyEditingOrUploading = thumbnailLocalUrl || uploading;
  const currentlyEditing = thumbnailLocalUrl && !uploading;
  const showDragToRepositionNote = !dragging && currentlyEditing;

  return (
    <div
      ref={containerRef}
      className={cx(
        styles.window,
        // we conditionally set the class since we don't want the z-index
        // to affect the share drop zone unless there's a thumbnail already
        currentlyEditingOrUploading ? styles.editing : ''
      )}
    >
      {thumbnailLocalUrl ? (
        <AvatarEditor
          position={position}
          ref={cropperRef}
          image={thumbnailLocalUrl}
          width={windowDims?.width}
          height={windowDims?.height}
          scale={scale}
          style={{ cursor: 'move' }}
          onMouseMove={handleMove}
          onMouseUp={handleInteractionEnd}
          onPositionChange={setPosition}
          border={0}
        />
      ) : null}
      {showDragToRepositionNote ? (
        <img
          alt="drag to reposition"
          width="175px"
          height="42px"
          src={DragToRepositionSvg}
          className={styles.drag}
        />
      ) : null}
      {uploading ? (
        <div className={styles.loadingSpinner}>
          <Loader size="large" />
        </div>
      ) : null}
      {currentlyEditing ? (
        <>
          <RuleOfThirds height={windowDims.height} width={windowDims.width} />
          <Container
            position="absolute"
            bottom="12px"
            width="168px"
            height="large"
            paddingRight="10px"
            paddingLeft="10px"
            backgroundColor="backdrop"
            radius="medium"
            className="flex flexDirection:row justify:center items:center"
            style={{
              left: 'calc(50% - 84px)',
            }}
          >
            <Icon
              altText="zoom out"
              className={styles.pointerCursor}
              onClick={zoomOut}
              size={2.5}
              color="white"
              icon={<SvgMinus />}
            />
            <Slider
              maxZoom={MAX_ZOOM}
              minZoom={MIN_ZOOM}
              scale={scale}
              setScale={setScale}
            />
            <Icon
              altText="zoom in"
              size={2.5}
              className={styles.pointerCursor}
              onClick={zoomIn}
              color="white"
              icon={<SvgAdd />}
            />
          </Container>
        </>
      ) : null}
    </div>
  );
};

const RuleOfThirds = ({ height, width }: WindowDimsProps) => {
  const px = (num: number) => `${num}px`;
  const widthPx = px(width);
  const heightPx = px(height);

  return (
    <Container
      position="absolute"
      top={0}
      left={0}
      width={widthPx}
      height={heightPx}
      className="flex"
      style={{
        opacity: 0.4,
        pointerEvents: 'none',
      }}
    >
      <Container
        className={styles.dashedBorder}
        position="absolute"
        top={px(height / 3)}
        width={widthPx}
        height={0}
      />
      <Container
        className={styles.dashedBorder}
        position="absolute"
        top={px((2 * height) / 3)}
        width={widthPx}
        height={0}
      />

      <Container
        className={cx(styles.dashedBorder, styles.horizontal)}
        position="absolute"
        left={px(width / 3)}
        height={heightPx}
        width={0}
      />
      <Container
        className={cx(styles.dashedBorder, styles.horizontal)}
        position="absolute"
        left={px((2 * width) / 3)}
        height={heightPx}
        width={0}
      />
    </Container>
  );
};
