import { useIsMeetingRecording } from '@js/common/meeting-recordings';
import { useVideoContext } from '@js/common/video-player';

import { VideoChapters } from '@js/pages/share/common/chapters';

import {
  VideoDescription,
  useCurrentUserCanEditVideo,
} from '@js/pages/share/common/video-description';
import React from 'react';
import { SuccessMarkers } from '@js/utilities/rum/constants';
import { SuccessMarker } from '@js/utilities/rum/markers';

import { Arrange, Spacer } from '@loomhq/lens';

export const SummaryAndChapters = (): JSX.Element => {
  const {
    video: { description, id: videoId },
  } = useVideoContext();
  const shouldShowRecapTab = useIsMeetingRecording(videoId);
  const currentUserCanEdit = useCurrentUserCanEditVideo(videoId);

  return (
    <div className="below-video-mobile">
      <SuccessMarker name={SuccessMarkers.VideoMetadata} />
      <Spacer bottom="small" />
      <div className="width:full">
        <Arrange autoFlow={'row'} justifyContent={'stretch'}>
          <div className="p:large">
            <Arrange
              columns={['auto']}
              alignItems="start"
              justifyContent="stretch"
              gap="small"
            >
              <Arrange autoFlow="row" justifyContent="stretch">
                {(description || currentUserCanEdit) && !shouldShowRecapTab ? (
                  <VideoDescription />
                ) : null}
                <VideoChapters />
              </Arrange>
            </Arrange>
          </div>
        </Arrange>
      </div>
    </div>
  );
};
