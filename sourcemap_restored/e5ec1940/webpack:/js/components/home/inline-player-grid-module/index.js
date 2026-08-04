/* eslint-disable @loomhq/loom/no-js-extension */
import { SHOW_MORE_VIDEOS_BUTTON_CLICKED } from '@js/constants/events';

import { SectionTitleContext } from '@js/contexts/SectionTitleContext';
import React, { useEffect, useRef, useState } from 'react';

import { Arrange, Spacer } from '@loomhq/lens';

import { track } from '@js/utilities/analytics';

import SectionHeader from '../SectionHeader';
import { ButtonToggle } from '../constants';
import TrendingPlayerVideoCard from '../trending/TrendingPlayerVideoCard';
import useTrendingVideosPerRow from '../useTrendingVideosPerRow';

/**
 * @param {obj} param
 * @param {string} [param.title]
 * @param {Array} [param.videos]
 * @param {number} [param.minLinesToShow]
 * @param {any} [param.tooltip]
 */
// eslint-disable-next-line import/no-default-export
export default function InlinePlayerGridModule({
  title,
  videos,
  minLinesToShow = 1,
  tooltip = null,
}) {
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const videosPerLine = useTrendingVideosPerRow();
  const videosToDisplay = shouldShowMore
    ? videos
    : videos.slice(0, minLinesToShow * videosPerLine);

  const hasExpandedOnce = useRef(false);

  useEffect(() => {
    // Use hasExpandedOnce to avoid logging until clicked
    if (!hasExpandedOnce.current) {
      return;
    }

    track(SHOW_MORE_VIDEOS_BUTTON_CLICKED, {
      toggled_to: shouldShowMore
        ? ButtonToggle.EXPANDED
        : ButtonToggle.COLLAPSED,
      video_count: videosToDisplay.length,
    });
  }, [shouldShowMore, title, videosToDisplay.length]);

  return (
    <div>
      <SectionHeader
        title={title}
        isShowMoreButtonVisible={
          !shouldShowMore && videos.length > videosToDisplay.length
        }
        isShowLessButtonVisible={shouldShowMore}
        numVideosRemaining={videos.length - videosToDisplay.length}
        onShowMoreToggle={() => {
          hasExpandedOnce.current = true;
          setShouldShowMore(!shouldShowMore);
        }}
        tooltip={tooltip}
      >
        {title}
      </SectionHeader>

      <Spacer top="medium" />

      <SectionTitleContext.Provider value={title}>
        <Arrange
          gap="large"
          columns={`repeat(${videosPerLine}, minmax(0, 1fr))`}
        >
          {videosToDisplay.map((video, index) => (
            <div key={video.id}>
              <TrendingPlayerVideoCard video={video} position={index} />
            </div>
          ))}
        </Arrange>
      </SectionTitleContext.Provider>
    </div>
  );
}
