import { VIDEO_SUGGESTION_SHOWN } from '@js/constants/events';

import InlinePlayerVideoCard from '@js/components/inline-player-video-card';
import { VideoCardVideo } from '@js/components/video-card/types';
import { VideoFromGraphQl } from '@js/components/video-player-fresh/utils/model';
import { SectionTitleContext } from '@js/contexts/SectionTitleContext';
import { VideoSuggestionContext } from '@js/contexts/VideoSuggestionContext';
import React, { useContext, useEffect } from 'react';

import { track } from '@js/utilities/analytics';

const TrendingPlayerVideoCard = ({
  video,
  position,
}: {
  video: VideoCardVideo & VideoFromGraphQl;
  position?: number;
}): JSX.Element => {
  const sectionTitle = useContext(SectionTitleContext);
  const videoSuggestion = useContext(VideoSuggestionContext);

  useEffect(() => {
    if (!sectionTitle || !videoSuggestion) {
      return;
    }

    track(VIDEO_SUGGESTION_SHOWN, {
      video_id: video.id,
      video_suggestion_position: position,
      recommendation_type: videoSuggestion.recommendationType,
      recommendation_system_name: videoSuggestion.recommendationSystemName,
    });
  }, [video.id, position, videoSuggestion, sectionTitle]);

  return <InlinePlayerVideoCard video={video} showProfileOnHover={true} />;
};

// eslint-disable-next-line import/no-default-export
export default TrendingPlayerVideoCard;
