import { CHAPTER_CLICKED } from '@js/constants/events';

import { parseTimestampToChapter } from '@js/common/video-player/components/chapters-bar/utils';

import { replaceURLs, getChapterLink } from '@js/utilities/timestamps';

import * as analytics from '@js/utilities/analytics';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

/**
 *
 * This takes in a string of text and converts it to an array of JSX elements.
 * If the line break is a timestamp, it will convert it to a link to the video
 * If the line break does not contain a timestamp, it will output a normal string
 *
 * @param chaptersText : string representing the chapter content
 * @param videoDuration : number representing the length of the video in seconds
 * @param videoId
 * @returns
 */
export const convertTextToChapters = (
  chaptersText: string,
  videoDuration: number | null,
  videoId: string,
  setPlayerTime: (time: number) => void
): null | (JSX.Element | [JSX.Element, JSX.Element])[] => {
  if (chaptersText.length === 0) {
    return null;
  }

  const chaptersByLine = chaptersText.split('\n');

  const results: (JSX.Element | [JSX.Element, JSX.Element])[] = [];

  for (const [i, line] of chaptersByLine.entries()) {
    const timestampToChapter = parseTimestampToChapter(line, videoDuration);

    // continue if the line does not match the timestamp format or if
    // we were not given a duration for the video
    if (!timestampToChapter || typeof videoDuration !== 'number') {
      const replacedLine = replaceURLs(line, i, 'pre', true);

      results.push(replacedLine);
      continue;
    }

    const trackChapterClick = () => {
      analytics.track(CHAPTER_CLICKED, {
        ...withIdentifiers(
          CHAPTER_CLICKED,
          AnalyticsEntityId.video(videoId, 'video_id')
        ),
        chapter_timestamp: timestampToChapter.timestamp,
        chapter_title: timestampToChapter.chapter,
      });
    };

    const chapterLink = getChapterLink(
      timestampToChapter.timestamp,
      timestampToChapter.chapter,
      videoDuration,
      trackChapterClick,
      setPlayerTime
    );

    results.push(chapterLink);
  }

  return results;
};
