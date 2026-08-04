import {
  CHAPTERS_ADD_CLICKED,
  CHAPTERS_EDIT_CLICKED,
} from '@js/constants/events';

import { CHAPTERS } from '@js/constants/sharePage';

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import cx from 'classnames';
import { useVideoContext } from '@js/common/video-player';
import { useIsEmailGatingIncomplete } from '@js/common/video-player/components/email-gating/useIsEmailGatingIncomplete';

import { useIsOwnerAfterRecording } from '@js/hooks/useIsOwnerAfterRecording';
import {
  useChaptersContext,
  CHAPTERS_TEXT_AREA,
} from '@js/pages/share/common/chapters';
import { GeneratedByLoom } from '@js/pages/share/common/generated-by-loom';
import React, { useState } from 'react';
import { AiFeatureMarkers } from '@js/utilities/rum/constants';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { SuccessMarker } from '@js/utilities/rum/markers';

import {
  Arrange,
  Container,
  SkeletonText,
  Spacer,
  Text,
  Link,
  Popover,
  Icon,
} from '@loomhq/lens';
import { SvgInfo } from '@loomhq/lens/icons/info';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { AutoresizeChapterTextArea } from './autoresize-chapter-textarea';

import { LinkedChapters } from './linked-chapters';
import styles from './styles.module.css';

const CHAPTERS_HELP_ARTICLE_URL =
  'https://support.loom.com/hc/en-us/articles/360018208478-How-to-add-a-summary-and-chapters-to-your-video';

const ChapterTooltipWrapper = styled.div`
  padding: var(--lns-space-medium);
  background: var(--lns-color-background);
  border-radius: var(--lns-radius-large);
  border: 1px solid var(--lns-color-border);
  box-shadow: var(--lns-shadow-small);
  width: 360px;
`;

const ChapterTooltip = () => (
  <ChapterTooltipWrapper>
    <Arrange gap="xsmall" autoFlow="row">
      <Text color="bodyDimmed">
        You can add chapters to any Loom by adding a list of ascending
        timestamps and chapter titles.
      </Text>
      <Text color="bodyDimmed">
        Chapters must start at 00:00 and be at least 5 seconds long.
      </Text>
      <Link href={CHAPTERS_HELP_ARTICLE_URL}>
        🔗 More on creating chapters for your Loom
      </Link>
    </Arrange>
  </ChapterTooltipWrapper>
);

const PlaceholderText = '0:00 Chapter 1\n0:20 Chapter 2\n0:30 Chapter 3';

const VideoChaptersWithoutFeatureWrapper = (): JSX.Element | null => {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const { featureLoadedRef } = useFeatureWrapper();

  const { video } = useVideoContext();

  const userCanEdit = video.currentUserCanEdit ?? false;

  const isEmailGatingIncomplete = useIsEmailGatingIncomplete();

  const isOwnerAfterRecording = useIsOwnerAfterRecording({ videoId: video.id });

  const {
    canEditChapters,
    userEdited,
    errorMsg,
    chapters,
    draftChapters,
    fetchingChapters,
    setDraftChapters,
    editChapters,
    saveChapters,
    cancelEditChapters,
    clearChapters,
    chaptersAvailable,
    waitingForAi,
    showInput,
    chaptersInputWrapperRef,
    isAutoChaptersExpected,
  } = useChaptersContext();

  // if the current user has no edit access and there's no chapters available, OR the user has not passed the email gate
  // we can simply return null
  if ((!userCanEdit && !chapters) || isEmailGatingIncomplete) {
    return null;
  }

  const hasError = errorMsg !== null && userCanEdit;

  function renderChaptersLoading() {
    return (
      <>
        <Arrange alignItems="start" gap="xsmall" columns={['80px', '11fr']}>
          <div>
            {/* timestamps - 3 separate 1-line skeletons so they all have the same width */}
            <SkeletonText lines={1} />
            <SkeletonText lines={1} />
            <SkeletonText lines={1} />
          </div>
          <div>
            {/* chapter titles - single 3-line skeleton the widths vary a little */}
            <SkeletonText lines={3} />
          </div>
        </Arrange>
        <SuccessMarker name={AiFeatureMarkers.AutoChaptersLoading} />
      </>
    );
  }

  function renderChaptersInput() {
    return (
      <div className={styles.inputContainer}>
        <AutoresizeChapterTextArea
          id={CHAPTERS_TEXT_AREA}
          textRef={chaptersInputWrapperRef}
          placeholder={PlaceholderText}
          className={cx(styles.autoHeight, styles.chaptersInput, {
            [styles.hasError]: hasError,
          })}
          value={draftChapters || ''}
          onChange={e => setDraftChapters(e.target.value)}
          shouldHighlight
          onSave={saveChapters}
          onCancel={cancelEditChapters}
          onClear={clearChapters}
          hasError={hasError}
        />
        {hasError ? (
          <Container>
            <Text color="danger">{errorMsg}</Text>
            <Spacer />
            <Text color="danger" fontWeight="bold">
              Example:
            </Text>
            <Spacer />
            <Text size="body-sm" color="danger">
              0:00 Introduction
              <br />
              0:45 Proposed solution
              <br />
              2:17 Action items
            </Text>
          </Container>
        ) : null}
      </div>
    );
  }

  function renderFormattedChapters() {
    // We only want to show errors if the user has edited the chapters.
    // If AI generated an erroneous chapter list, we don't want the user landing
    // on a page with an error message post-record.
    const showError = hasError && userEdited;
    return (
      <>
        {!userEdited && <GeneratedByLoom />}
        <div data-testid="formatted-chapters">
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
          <div
            onClick={() =>
              editChapters({ analyticsEventName: CHAPTERS_EDIT_CLICKED })
            }
          >
            <LinkedChapters
              canEdit={canEditChapters}
              onClick={() =>
                editChapters({ analyticsEventName: CHAPTERS_EDIT_CLICKED })
              }
              chapters={chapters}
              // Only show red border if the user has edited the chapters, we
              // don'e want users landing on an erroneous
              hasError={showError}
            />
            {showError ? <Text color="danger">{errorMsg}</Text> : null}
          </div>
        </div>
        {isOwnerAfterRecording && isAutoChaptersExpected && (
          <SuccessMarker name={AiFeatureMarkers.AutoChapters} />
        )}
      </>
    );
  }

  function renderEmptyChapters() {
    return (
      <Container paddingY="small">
        <Arrange gap="xsmall">
          <Text
            data-testid="add-chapters-text"
            size="body-md"
            color="bodyDimmed"
            onClick={() =>
              editChapters({ analyticsEventName: CHAPTERS_ADD_CLICKED })
            }
            className={styles.addChaptersText}
          >
            + Add chapters
          </Text>
        </Arrange>
      </Container>
    );
  }

  let renderChapters: null | (() => JSX.Element) = null;

  if (canEditChapters && waitingForAi) {
    // waiting for auto-generated chapters
    renderChapters = renderChaptersLoading;
  } else if (showInput && canEditChapters) {
    // we are in edit mode
    renderChapters = renderChaptersInput;
  } else if (chaptersAvailable) {
    // we are in view mode with chapters to be shown
    renderChapters = renderFormattedChapters;
  } else if (canEditChapters && !fetchingChapters) {
    // we are in view mode with no chapters to be shown
    // note that we shouldn't render this until we have
    // finished fetching chapters, otherwise it may flash
    renderChapters = renderEmptyChapters;
  }

  // if we have a rendering function it means we will show chapters so we need to show the header too
  const showChaptersHeader = renderChapters !== null;

  return (
    <div ref={featureLoadedRef}>
      {showChaptersHeader && (
        <Arrange gap="small">
          <Text fontWeight="bold" size="body-lg">
            {CHAPTERS}
          </Text>
          {canEditChapters ? (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
              onMouseEnter={() => setTooltipIsOpen(true)}
              onMouseLeave={() => setTooltipIsOpen(false)}
              style={{ zIndex: tooltipIsOpen ? 3 : 0 }}
            >
              <Popover
                isOpen={tooltipIsOpen}
                placement="rightCenter"
                content={<ChapterTooltip />}
              >
                <Icon
                  icon={<SvgInfo />}
                  altText="Info"
                  size={2}
                  color="bodyDimmed"
                />
              </Popover>
            </div>
          ) : null}
        </Arrange>
      )}
      {renderChapters?.()}
    </div>
  );
};

export const VideoChapters = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.VideoPackaging}
      errorType={ErrorBoundaryTypes.DEFAULT}
      additionalLoggingValues={{ version: 'chapters' }}
    >
      <VideoChaptersWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};
