import {
  AUTO_SUMMARY_SEE_MORE_CLICKED,
  AUTO_SUMMARY_SEE_MORE_IMPRESSION,
} from '@js/constants/events';

import cx from 'classnames';
import { useSetPlayerTime, useVideoContext } from '@js/common/video-player';
import React, { useEffect, useState } from 'react';

import {
  linkifyDescription,
  replaceURLs,
  detectTimestamps,
} from '@js/utilities/timestamps';

import { Container, Text, TextButton } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';

import { isEmpty } from '../common/isEmpty';
import styles from './styles.module.css';

interface DescriptionProps {
  description: string;
  defaultText: string;
  onClick: () => void;
  canEdit: boolean;
  seeMore: boolean;
  setSeeMore: (seeMore: boolean) => void;
  wordsCutoff?: number;
  className?: string;
}

export const LinkedDescription = ({
  description,
  defaultText,
  onClick,
  canEdit,
  seeMore,
  setSeeMore,
  wordsCutoff = 50,
  className,
}: DescriptionProps): JSX.Element => {
  const noDescription = isEmpty(description);
  const {
    video: {
      id,
      videoProperties: { playableDuration },
    },
  } = useVideoContext();
  const [shownDescription, setShownDescription] = useState(description);

  const timestamps = playableDuration
    ? detectTimestamps(description, playableDuration)
    : [];

  const classes = cx(className, styles.show, {
    [styles.descriptionHover]: canEdit,
    [styles.textCursor]: canEdit,
    [styles.matchPlaceholderColor]: noDescription && canEdit,
    [styles.whiteSpaceBreak]: true,
  });

  useEffect(() => {
    if (seeMore) {
      const words = description.split(' ');

      if ((words?.length ?? 0) > wordsCutoff) {
        setShownDescription(words.slice(0, wordsCutoff).join(' '));
      } else {
        setShownDescription(description);
        setSeeMore(false);
      }

      analytics.track(AUTO_SUMMARY_SEE_MORE_IMPRESSION);
    } else {
      setShownDescription(description);
    }
  }, [description, seeMore, setSeeMore, wordsCutoff]);

  const protectedDescription = shownDescription || '';

  const setPlayerTime = useSetPlayerTime({ videoId: id });

  const linkedDescription = [
    !noDescription
      ? linkifyDescription(timestamps, protectedDescription, setPlayerTime)
      : replaceURLs(protectedDescription, 0, ''),
  ];

  const readMoreFooter = seeMore ? (
    <>
      <Container htmlTag="span" paddingRight="small">
        &hellip;
      </Container>
      <TextButton
        onClick={() => {
          setShownDescription(description);
          setSeeMore(false);
          analytics.track(AUTO_SUMMARY_SEE_MORE_CLICKED);
        }}
        size="small"
        offsetSide="left"
      >
        See more
      </TextButton>
    </>
  ) : null;

  return canEdit ? (
    <Text size="body-md" onClick={onClick} className={cx(classes)}>
      {noDescription ? defaultText : linkedDescription}
      {readMoreFooter}
    </Text>
  ) : (
    <Text size="body-md" className={cx(classes)}>
      {linkedDescription}
      {readMoreFooter}
    </Text>
  );
};
