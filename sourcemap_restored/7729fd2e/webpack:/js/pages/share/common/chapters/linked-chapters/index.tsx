import cx from 'classnames';
import { useSetPlayerTime, useVideoContext } from '@js/common/video-player';
import { parseTimestampToChapter } from '@js/common/video-player/components/chapters-bar/utils';
import { parseVideo } from '@js/components/video-player-fresh/utils';

import { isChaptersEmpty } from '@js/pages/share/common/chapters';
import React, { useState, useEffect } from 'react';
import { useHover } from 'react-laag';
import * as logger from '@js/utilities/loggerx';

import { useGetVideoSsrLazyQuery } from '@loomhq/graphql-preload';

import { Arrange, Text, IconButton, Tooltip, TextButton } from '@loomhq/lens';
import { SvgEdit } from '@loomhq/lens/icons/edit';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useOnRecordingCompletedSubscription } from './OnRecordingCompleted.generated';

import { convertTextToChapters } from './convertTextToChapters';
import styles from './styles.module.css';

const EDIT_CHAPTERS_TEXT = 'Edit chapters';
const MAX_TOTAL_WORDS_SEE_MORE = 100;

interface LinkedChaptersProps {
  chapters: string;
  onClick: (event) => void;
  canEdit: boolean;
  hasError?: boolean;
}

function truncateChaptersText(chaptersText: string) {
  // only consider the chapter titles to determine length
  const lines = chaptersText.split('\n');

  let result = '';
  let runningWordCount = 0;

  for (const [i, line] of lines.entries()) {
    if (i > 0) {
      result += '\n';
    }

    const timestampToChapter = parseTimestampToChapter(line);

    const words = (timestampToChapter?.chapter ?? line).split(' ');

    runningWordCount += words.length;

    if (runningWordCount >= MAX_TOTAL_WORDS_SEE_MORE) {
      // we're over the limit, truncate this last line and break
      const wordsToRemove = runningWordCount - MAX_TOTAL_WORDS_SEE_MORE;

      // drop excess words from end of line
      words.splice(words.length - wordsToRemove, wordsToRemove);
      const timestamp = timestampToChapter
        ? timestampToChapter.timestamp + ' '
        : '';

      result += `${timestamp}${words.join(' ').trim()}…`;
      break;
    } else {
      result += line;
    }
  }

  return result;
}

function appendSeeMoreButton(
  content: (JSX.Element | [JSX.Element, JSX.Element])[],
  onClick: (event) => void
) {
  // the button is always appended to the last item
  const lastItem = content.pop();

  const seeMore = (
    <TextButton onClick={onClick} size="small">
      See more
    </TextButton>
  );

  if (Array.isArray(lastItem)) {
    content.push([
      lastItem[0],
      <>
        {lastItem[1]}
        {seeMore}
      </>,
    ]);
  } else {
    content.push(
      <>
        {lastItem}
        {seeMore}
      </>
    );
  }
}

export const LinkedChapters = ({
  chapters,
  onClick,
  canEdit,
  hasError = false,
}: LinkedChaptersProps): JSX.Element => {
  const noChapters = isChaptersEmpty(chapters);
  const [isHovering, hoverProps] = useHover();
  const {
    setVideo,
    video: {
      complete: videoCompleted = false,
      currentUserCanEdit: userCanEdit,
      id: videoId,
      videoProperties: { playableDuration },
    },
  } = useVideoContext();
  const [visibleChaptersText, setVisibleChaptersText] = useState(chapters);

  const [getLoomSsr, { data: getLoomSsrData }] = useGetVideoSsrLazyQuery({
    onError: err => {
      if (err) {
        logger.error(
          err,
          {
            message: 'Error fetching video',
          },
          { feature: Feature.VideoPreload }
        );
      }
    },
    onCompleted: () => {
      const videoData = getLoomSsrData?.getVideo;

      // Our video was incomplete but has now completed
      // Now update our stores with the latest data.
      const video = parseVideo(videoData);

      setVideo(video);
    },
  });

  const { data: subscriptionData, error } = useOnRecordingCompletedSubscription(
    {
      variables: { videoId },
      // do not start the subscription if the video is already complete
      skip: videoCompleted || !videoId,
      onData: () => {
        // Once recording is complete, call fetch video data
        if (recordingCompleted) {
          getLoomSsr();
        }
      },
    }
  );

  const recordingCompleted =
    subscriptionData?.recordingCompleted ||
    error?.message === 'Video already completed';

  const setPlayerTime = useSetPlayerTime({
    videoId,
  });

  useEffect(() => {
    let visibleText = chapters;

    if (!userCanEdit) {
      if (visibleText.split(' ').length > MAX_TOTAL_WORDS_SEE_MORE) {
        visibleText = truncateChaptersText(visibleText);
      }
    }

    setVisibleChaptersText(visibleText);
  }, [setVisibleChaptersText, chapters, userCanEdit]);

  if (noChapters) {
    return <></>;
  }

  const classes = cx(styles.whiteSpaceBreak, styles.show, {
    [styles.chaptersHover]: canEdit,
    [styles.textCursor]: canEdit,
    [styles.hintPadding]: canEdit,
    [styles.matchPlaceholderColor]: noChapters && canEdit,
    [styles.showErrorOutline]: hasError,
  });

  const content = convertTextToChapters(
    visibleChaptersText,
    playableDuration,
    videoId,
    setPlayerTime
  );

  if (!content) {
    return <></>;
  }

  const showSeeMore = visibleChaptersText !== chapters;

  // if the content has been truncated, add a "see more" button
  if (showSeeMore) {
    appendSeeMoreButton(content, event => {
      event.stopPropagation();
      setVisibleChaptersText(chapters);
    });
  }

  return (
    <div className={cx(classes)} {...hoverProps}>
      <Arrange alignItems="start" gap="xsmall" columns={['11fr', '1fr']}>
        <Arrange
          alignItems="start"
          gap="xsmall"
          columns={['max-content', '1fr']}
        >
          {content.map((line, index) => {
            const cols = Array.isArray(line) ? line : ['', line];

            return [
              <Text
                data-testid={`chapter-timestamp-${index}`}
                key={`time_${index}`}
                size="body-md"
                style={{ textAlign: 'right' }}
              >
                {cols[0]}
              </Text>,
              <Text
                data-testid={`chapter-title-${index}`}
                key={`title_${index}`}
                size="body-md"
              >
                {cols[1]}
              </Text>,
            ];
          })}
        </Arrange>
        {canEdit && isHovering ? (
          <div className={styles.showEditChapters}>
            <Tooltip tabIndex={-1} content={EDIT_CHAPTERS_TEXT}>
              <IconButton
                data-testid="edit-chapters"
                altText={EDIT_CHAPTERS_TEXT}
                icon={<SvgEdit />}
                onClick={onClick}
              />
            </Tooltip>
          </div>
        ) : null}
      </Arrange>
    </div>
  );
};
