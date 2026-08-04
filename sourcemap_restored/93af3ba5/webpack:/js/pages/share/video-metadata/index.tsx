import React from 'react';

import { Arrange } from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { MediaQuery } from '@js/common/layout';
import {
  SMALL_DESKTOP_MIN_WIDTH,
  TABLET_MAX_WIDTH,
} from '@js/constants/breakpoints';

import { useHideInformationDueToPassword } from '@js/pages/share/common';
import { VideoMetadataProps } from '@js/pages/share/video-metadata/common';
import { VideoMetadataAsync as VideoMetadata } from '@js/pages/share/video-metadata/desktop/async';
import { VideoMetadataMobileAsync as VideoMetadataMobile } from '@js/pages/share/video-metadata/mobile/async';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

const VideoMetadataWrapperWithoutFeatureWrapper: React.FC<
  React.PropsWithChildren<VideoMetadataProps>
> = props => {
  const { featureLoadedRef } = useFeatureWrapper();
  const hideInformationDueToPassword = useHideInformationDueToPassword();

  if (hideInformationDueToPassword) {
    return null;
  }

  return (
    // TODO: Extract metadataContainer styles from share-video-wrapper/styles.less
    // into its own style.module.css, pass props from parentfor conditional styling rather than nested
    // parent like hideBlackBarsInVideo
    <div ref={featureLoadedRef} className="metadataContainer">
      <Arrange
        gap="medium"
        autoFlow="column"
        alignItems="start"
        justifyContent="stretch"
        columns={['100%']}
      >
        <MediaQuery query={`(max-width: ${TABLET_MAX_WIDTH}px)`}>
          <VideoMetadataMobile
            anonCreatorMode={props.anonCreatorMode}
            focusTitle={props.focusTitle}
          />
        </MediaQuery>
        <MediaQuery query={`(min-width: ${SMALL_DESKTOP_MIN_WIDTH}px)`}>
          <VideoMetadata />
        </MediaQuery>
      </Arrange>
    </div>
  );
};

export const VideoMetadataWrapper = (
  props: VideoMetadataProps
): JSX.Element => (
  <FeatureWrapper
    feature={Feature.VideoMetadata}
    errorType={ErrorBoundaryTypes.SILENT}
  >
    <VideoMetadataWrapperWithoutFeatureWrapper {...props} />
  </FeatureWrapper>
);
