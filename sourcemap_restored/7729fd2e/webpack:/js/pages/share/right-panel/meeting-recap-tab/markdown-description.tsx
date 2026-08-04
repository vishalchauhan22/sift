import { useVideoContext, useSetPlayerTime } from '@js/common/video-player';

import DOMPurify from 'dompurify';
import markdownit from 'markdown-it';
import React, { useEffect, useRef } from 'react';

import { markdownItUtils } from '@loomhq/shared-utilities';

import {
  ALLOWED_MEETING_RECORDING_TAGS,
  ALLOWED_MEETING_RECORDING_ATTR,
} from '@loomhq/shared-utilities/constants/meetingRecordings';

import styles from './styles.module.css';

interface MarkdownDescriptionProps {
  videoUrl: string;
  videoLength: number;
  description: string;
}

export const MarkdownDescription = ({
  description,
  videoUrl,
  videoLength,
}: MarkdownDescriptionProps): JSX.Element => {
  const markdownContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    video: { id: videoId },
  } = useVideoContext();
  const setPlayerTime = useSetPlayerTime({
    videoId,
  });

  // Hook up click handlers for any timestamps rendered in the description
  useEffect(() => {
    if (!markdownContainerRef.current) {
      return;
    }

    // handleClick mirrors the logic found in `linkifyDescription`. Maybe they
    // can be shared someday?
    const handleClick = e => {
      e.preventDefault();
      e.stopPropagation();

      setPlayerTime(parseInt(e.currentTarget.getAttribute('data-seconds')));
    };

    // Find all timestamps in the description and add click handlers.
    const timestampTags = markdownContainerRef.current.querySelectorAll(
      `.${styles.timestamp}[data-seconds]`
    );
    for (let i = 0; i < timestampTags.length; i++) {
      const timestampTag = timestampTags[i];
      timestampTag.addEventListener('click', handleClick);
    }

    return () => {
      // Cleanup the click handlers when the component is unmounted.
      for (let i = 0; i < timestampTags.length; i++) {
        const timestampTag = timestampTags[i];
        timestampTag.removeEventListener('click', handleClick);
      }
    };
  }, [setPlayerTime]);

  return (
    <div
      ref={markdownContainerRef}
      dangerouslySetInnerHTML={{
        __html: markdownit({ html: true })
          .use(markdownItUtils.timestampPlugin, {
            videoUrl,
            videoLength,
            timestampClassName: styles.timestamp,
          })
          .render(
            DOMPurify(window).sanitize(description, {
              ALLOWED_TAGS: ALLOWED_MEETING_RECORDING_TAGS,
              ALLOWED_ATTR: ALLOWED_MEETING_RECORDING_ATTR,
            })
          ),
      }}
    />
  );
};
