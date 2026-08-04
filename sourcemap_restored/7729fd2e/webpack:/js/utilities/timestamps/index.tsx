import { VIDEO_TIMESTAMP_CLASS } from '@js/constants/comments';
import { SHARE_VIDEO_DESCRIPTION_TIMESTAMP_CLICKED } from '@js/constants/events';

import cx from 'classnames';
import React from 'react';
import urlRegexSafe from 'url-regex-safe';

import { splitTrailingPunctuation } from '@js/utilities/url';

import { Link } from '@loomhq/lens';

import { chapterLiteralToSeconds } from '@loomhq/shared-utilities/utilities/timeUtils';
import * as analytics from '@js/utilities/analytics';

import styles from './styles.module.less';

interface Timestamp {
  time: number;
  endIndex: number;
  literal: string;
}

export const detectTimestamps = (
  description: string,
  videoLength: number
): Timestamp[] => {
  const re = /\d{0,2}:\d{1,2}:\d{2}|\d{1,2}:\d{2}/g;

  const result: Timestamp[] = [];
  let stamp: RegExpExecArray | null;

  while ((stamp = re.exec(description)) !== null) {
    const time = chapterLiteralToSeconds(stamp[0]);

    if (time == null) {
      continue;
    }

    const isValidTimeInVideo = time <= videoLength;

    if (isValidTimeInVideo) {
      result.push({
        time,
        endIndex: re.lastIndex,
        literal: stamp[0],
      });
    }
  }

  return result;
};

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const replaceURLs = (
  text: string,
  ind: number,
  prefix: string,
  isChaptersField = false
): JSX.Element => {
  const regResult = urlRegexSafe({
    apostrophes: true,
    strict: true,
    re2: false,
  }).exec(text);

  if (regResult == null) {
    return (
      <span key={`${ind}-${prefix}`}>
        {isChaptersField ? text.trimStart() : text}
      </span>
    );
  }

  const matchedUrl = regResult[0];

  return (
    <div
      data-testid="replace-url-wrapper"
      className={styles.contents}
      key={`link-${ind}`}
    >
      <span>{text.substring(0, regResult.index)}</span>
      {createLink(matchedUrl)}
      {replaceURLs(
        text.substring(regResult.index + matchedUrl.length),
        ind + regResult.index,
        prefix
      )}
    </div>
  );
};

export const createLink = (url: string): JSX.Element => {
  const [trimmedUrl, trailing] = splitTrailingPunctuation(url);
  const hrefVal = /^www/.test(trimmedUrl) ? `//${trimmedUrl}` : trimmedUrl;

  return (
    <>
      <Link
        target="_blank"
        onClick={e => e.stopPropagation()}
        variant="neutral"
        href={hrefVal}
      >
        {trimmedUrl}
      </Link>
      {trailing}
    </>
  );
};

export const linkifyDescription = (
  timestamps: Timestamp[],
  description: string,
  setPlayerTime: (time: number) => void
): JSX.Element[] | [] => {
  const linkedDescription: JSX.Element[] = [];
  let indexPointer = 0;

  timestamps.forEach(part => {
    // Add previous section

    const replacedUrl = replaceURLs(
      description.substring(indexPointer, part.endIndex - part.literal.length),
      indexPointer,
      'pre'
    );

    const handleClickTimestamp = e => {
      analytics.track(SHARE_VIDEO_DESCRIPTION_TIMESTAMP_CLICKED);

      e.preventDefault();
      e.stopPropagation();

      setPlayerTime(part.time);
    };

    const link = (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        key={indexPointer}
        variant="neutral"
        className={cx(VIDEO_TIMESTAMP_CLASS, styles.tabular)}
        onClick={handleClickTimestamp}
        data-seconds={part.time}
      >
        {part.literal}
      </Link>
    );

    linkedDescription.push(replacedUrl);
    linkedDescription.push(link);

    indexPointer = part.endIndex;
  });

  const finalReplacedUrl = replaceURLs(
    description.substring(indexPointer),
    indexPointer,
    'post'
  );

  // Add final part
  linkedDescription.push(finalReplacedUrl);

  return linkedDescription;
};

export const getChapterLink = (
  chapterTimestamp: string,
  chapterText: string,
  videoDuration: number,
  trackChapterClick: () => void,
  setPlayerTime: (time: number) => void
): [JSX.Element, JSX.Element] => {
  const time = chapterLiteralToSeconds(chapterTimestamp);

  if (time === null) {
    return [<></>, <></>];
  }

  const handleClickTimestamp = e => {
    e.preventDefault();
    e.stopPropagation();

    setPlayerTime(time);

    if (trackChapterClick) {
      trackChapterClick();
    }
  };

  const isValidTimeInVideo = time <= videoDuration;

  const handleClick = event => {
    if (!isValidTimeInVideo) {
      return;
    }

    handleClickTimestamp(event);
  };

  const link = (
    <Link
      style={{ textDecoration: 'none' }}
      key={chapterTimestamp}
      variant={isValidTimeInVideo ? 'primary' : 'neutral'}
      className={cx(VIDEO_TIMESTAMP_CLASS, styles.tabular)}
      onClick={handleClick}
      data-seconds={time}
      href={`?t=${time}`}
    >
      {chapterTimestamp}
    </Link>
  );

  const chapterContent = replaceURLs(chapterText, 0, 'pre', true);

  return [link, chapterContent];
};
