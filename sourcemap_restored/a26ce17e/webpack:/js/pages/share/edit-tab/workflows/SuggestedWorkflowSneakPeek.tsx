import {
  SMART_PROMPTS_SNEAKPEEK_CLICKED,
  SMART_PROMPTS_SNEAKPEEK_DISMISSED,
  SMART_PROMPTS_SNEAKPEEK_SHOWN,
} from '@js/constants/events';

import cx from 'classnames';
import { useVideoContext } from '@js/common/video-player';
import {
  SmartPromptConfig,
  SneakPeekContent,
} from '@js/common/workflows/common/types';
import { useGeneratedSneakPeekContent } from '@js/common/workflows/common/useGeneratedSneakPeekContent';
import { useModalStore } from '@js/common/workflows/common/useModalStore';
import React, { useEffect } from 'react';

import * as analytics from '@js/utilities/analytics';

import {
  Arrange,
  Container,
  Icon,
  SkeletonContainer,
  SkeletonText,
  Text,
  IconButton,
  Align,
  Logo,
} from '@loomhq/lens';
import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';
import { SvgClose } from '@loomhq/lens/icons/close';
import { SvgCode } from '@loomhq/lens/icons/code';
import { SvgCreateTicket } from '@loomhq/lens/icons/create-ticket';
import { SvgPullRequest } from '@loomhq/lens/icons/pull-request';

import { SvgWriteDocument } from '@loomhq/lens/icons/write-document';

import { SMART_PROMPT_CATEGORIES } from '@loomhq/shared-utilities/constants/intelligence';

import { AiLoaderContainer } from './AiLoaderContainer';

import { Workflows } from './Workflows';

import $ from './styles.module.css';

import { parseSections, formatSectionContent } from './utils';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

type SneakPeekProps = {
  category: string | null;
  content: SneakPeekContent;
  onClick: () => void;
  onCloseClick: () => void;
};

export const placeHolderLoader = (
  <SkeletonContainer
    height="74px"
    width="auto"
    radius="medium"
    animated={true}
  />
);

const Divider = () => (
  <Container
    className={cx({
      [$.divider]: true,
    })}
  />
);

const SneakPeekPill = ({
  text,
  textColor,
  pillColor,
  logo,
}: {
  text: string;
  textColor: string;
  pillColor: string;
  logo?: JSX.Element;
}) => (
  <Container
    padding="small"
    paddingY="xsmall"
    backgroundColor={pillColor}
    radius="100"
  >
    <Arrange gap="xsmall">
      {logo && logo}
      <Text color={textColor} size="body-sm" fontWeight="bold">
        {text}
      </Text>
    </Arrange>
  </Container>
);

const SneakPeek = ({
  category,
  content,
  onClick,
  onCloseClick,
}: SneakPeekProps): JSX.Element | null => {
  const smartPromptConfig =
    SMART_PROMPT_CONFIGS[category as keyof typeof SMART_PROMPT_CONFIGS];
  const { text, icon, sneakPeekSection } = smartPromptConfig;

  let sneakPeekSectionTitle = sneakPeekSection;

  const processSneakPeekContent = () => {
    if (category === SMART_PROMPT_CATEGORIES.BUG_REPORT) {
      const sections = content?.body
        ? parseSections(content.body as string)
        : {};

      // Check if steps_to_reproduce section exists and has content
      if (!sections.steps_to_reproduce) {
        return null;
      }

      return formatSectionContent({
        content: sections.steps_to_reproduce,
        hasEllipsis: true,
      });
    }
    if (
      category === SMART_PROMPT_CATEGORIES.PR_DESCRIPTION ||
      category === SMART_PROMPT_CATEGORIES.CODE_DOCS
    ) {
      const sections = parseSections(content?.body as string);

      // Check if overview section exists and has content
      if (!sections.overview) {
        return null;
      }

      return formatSectionContent({
        content: sections.overview,
        hasEllipsis: false,
      });
    }

    if (
      category === SMART_PROMPT_CATEGORIES.PROCESS_WALKTHROUGH ||
      category === SMART_PROMPT_CATEGORIES.QA_STEPS ||
      category === SMART_PROMPT_CATEGORIES.STEP_BY_STEP
    ) {
      const sections = content?.body
        ? parseSections(content.body as string)
        : {};

      // Find the first key that contains the word "step"
      const stepKey = Object.keys(sections).find(key =>
        key.toLowerCase().includes('step')
      );

      if (category === SMART_PROMPT_CATEGORIES.QA_STEPS) {
        sneakPeekSectionTitle = sections.title;
      } else if (category === SMART_PROMPT_CATEGORIES.STEP_BY_STEP) {
        sneakPeekSectionTitle = '';
      }

      const stepContent = stepKey ? sections[stepKey] : '';

      // Check if step content exists and has content
      if (!stepContent) {
        return null;
      }

      return formatSectionContent({
        content: stepContent,
        hasEllipsis: true,
      });
    }

    return null;
  };

  const sectionContent = processSneakPeekContent();

  // Don't render the sneak peek if there's no valid section content
  if (
    !sectionContent ||
    (Array.isArray(sectionContent) && sectionContent.length === 0)
  ) {
    return null;
  }

  return (
    <div
      className={cx({
        [$.sneakPeek]: true,
      })}
    >
      <Container height="100%" width="100%">
        <Container
          padding={1.5}
          height="146px"
          className={cx({
            [$.sneakPeekContainer]: true,
          })}
        >
          {content && content.body && (
            <div
              className={cx({
                [$.sneakPeekContent]: true,
              })}
            >
              <Arrange
                autoFlow="row"
                gap={1}
                width="100%"
                justifyContent="stretch"
              >
                <Arrange
                  autoFlow="column"
                  justifyContent="stretch"
                  width="100%"
                >
                  <Arrange gap={'4px'}>
                    <SneakPeekPill
                      text={`Suggested ${text} for you`}
                      textColor="blurpleDark"
                      pillColor="blurpleLight"
                      logo={
                        <Align alignment="centerLeft">
                          <Logo brand="ai" maxWidth={1.5} variant="symbol" />
                        </Align>
                      }
                    />
                  </Arrange>
                  <Align alignment="centerRight">
                    <IconButton
                      altText="Close"
                      icon={<SvgClose />}
                      onClick={onCloseClick}
                    />
                  </Align>
                </Arrange>

                <Arrange justifyContent="space-between">
                  <Text htmlTag="h3" fontWeight="bold" color="bodyDimmed">
                    {sneakPeekSectionTitle}
                  </Text>
                </Arrange>
                <Arrange autoFlow="row">{sectionContent}</Arrange>
              </Arrange>
            </div>
          )}
        </Container>
        <Divider />
        <Container>
          <button
            className={cx({
              [$.sneakPeekButton]: true,
            })}
            onClick={onClick}
          >
            <Arrange autoFlow="column" gap="xsmall" justifyContent="stretch">
              <Arrange justifyContent="space-between" height="39px">
                <Arrange gap={2}>
                  <Icon
                    icon={icon}
                    className={cx({
                      [$.icon]: true,
                    })}
                  />
                  <Text alignment="left" fontWeight="bold">
                    Create {text}
                  </Text>
                </Arrange>
                <div>
                  <Icon icon={<SvgChevronRight />} />
                </div>
              </Arrange>
            </Arrange>
          </button>
        </Container>
      </Container>
    </div>
  );
};

type WorkflowsProps = {
  isSneakPeekAvailableToGenerate: boolean;
  isTranscriptInProgress: boolean;
  category: string | null;
  isDisabled: boolean;
  tooltipText?: string;
  onDocumentClick: () => void;
  onBugReportClick: () => void;
  onMessageClick: () => void;
  onCloseClick: () => void;
  hasConfluencePermissions: boolean;
};

const SMART_PROMPT_CONFIGS: Record<string, SmartPromptConfig> = {
  [SMART_PROMPT_CATEGORIES.BUG_REPORT]: {
    icon: <SvgCreateTicket />,
    text: 'bug report',
    sneakPeekSection: 'Steps to Reproduce',
  },
  [SMART_PROMPT_CATEGORIES.PR_DESCRIPTION]: {
    icon: <SvgPullRequest />,
    text: 'PR description',
    sneakPeekSection: 'Overview',
  },
  [SMART_PROMPT_CATEGORIES.PROCESS_WALKTHROUGH]: {
    icon: <SvgWriteDocument />,
    text: 'SOP',
    sneakPeekSection: 'Key Steps',
  },
  [SMART_PROMPT_CATEGORIES.CODE_DOCS]: {
    icon: <SvgCode />,
    text: 'code doc',
    sneakPeekSection: 'Overview',
  },
  [SMART_PROMPT_CATEGORIES.QA_STEPS]: {
    icon: <SvgWriteDocument />,
    text: 'QA steps',
    sneakPeekSection: '',
  },
  [SMART_PROMPT_CATEGORIES.STEP_BY_STEP]: {
    icon: <SvgWriteDocument />,
    text: 'how-to guide',
    sneakPeekSection: '',
  },
} as const;

export const SuggestedWorkflowSneakPeek = ({
  isSneakPeekAvailableToGenerate,
  isTranscriptInProgress,
  category,
  isDisabled,
  tooltipText,
  onDocumentClick,
  onBugReportClick,
  onMessageClick,
  onCloseClick,
  hasConfluencePermissions,
}: WorkflowsProps): JSX.Element => {
  const {
    video: { id: videoId },
  } = useVideoContext();

  const { isLoomCategorizationInProgress } = useModalStore();

  const { content: sneakPeekContent, loading: isSneakPeekContentLoading } =
    useGeneratedSneakPeekContent(
      category,
      videoId,
      isSneakPeekAvailableToGenerate
    );

  const isSneakPeekReady =
    isSneakPeekAvailableToGenerate && !isSneakPeekContentLoading && !isDisabled;

  // Check if SneakPeek has valid content to display
  const hasValidSneakPeekContent = (() => {
    if (!isSneakPeekReady || !sneakPeekContent?.body) {
      return false;
    }

    if (category === SMART_PROMPT_CATEGORIES.BUG_REPORT) {
      const sections = parseSections(sneakPeekContent.body as string);
      return Boolean(sections.steps_to_reproduce);
    }
    if (
      category === SMART_PROMPT_CATEGORIES.PR_DESCRIPTION ||
      category === SMART_PROMPT_CATEGORIES.CODE_DOCS
    ) {
      const sections = parseSections(sneakPeekContent.body as string);
      return Boolean(sections.overview);
    }
    if (
      category === SMART_PROMPT_CATEGORIES.PROCESS_WALKTHROUGH ||
      category === SMART_PROMPT_CATEGORIES.QA_STEPS ||
      category === SMART_PROMPT_CATEGORIES.STEP_BY_STEP
    ) {
      const sections = parseSections(sneakPeekContent.body as string);
      const stepKey = Object.keys(sections).find(key =>
        key.toLowerCase().includes('step')
      );
      return Boolean(stepKey && sections[stepKey]);
    }
    return false;
  })();

  const showLoader =
    (isTranscriptInProgress || isLoomCategorizationInProgress) && !isDisabled;
  const showAiLoader =
    !isDisabled && isSneakPeekAvailableToGenerate && isSneakPeekContentLoading;

  useEffect(() => {
    if (hasValidSneakPeekContent) {
      analytics.track(SMART_PROMPTS_SNEAKPEEK_SHOWN, {
        ...withIdentifiers(
          SMART_PROMPTS_SNEAKPEEK_SHOWN,
          AnalyticsEntityId.video(videoId, 'videoId')
        ),
        artifactType: category,
      });
    }
  }, [hasValidSneakPeekContent, category, videoId]);

  const loaderContent = (
    <SkeletonText lines={2} animated={true} size="heading-md" />
  );

  return (
    <Arrange autoFlow="row" gap={1.5} justifyContent="stretch">
      {hasValidSneakPeekContent ? null : (
        <Text color="body">Use your video to generate a...</Text>
      )}
      {showLoader ? (
        placeHolderLoader
      ) : showAiLoader ? (
        <AiLoaderContainer content={loaderContent} />
      ) : hasValidSneakPeekContent ? (
        <SneakPeek
          category={category}
          onClick={() => {
            if (
              (category as SMART_PROMPT_CATEGORIES) ===
              SMART_PROMPT_CATEGORIES.BUG_REPORT
            ) {
              onBugReportClick();
            } else {
              onDocumentClick();
            }
            analytics.track(SMART_PROMPTS_SNEAKPEEK_CLICKED, {
              ...withIdentifiers(
                SMART_PROMPTS_SNEAKPEEK_CLICKED,
                AnalyticsEntityId.video(videoId, 'videoId')
              ),
              artifactType: category,
            });
          }}
          onCloseClick={() => {
            onCloseClick();
            if (category) {
              analytics.track(SMART_PROMPTS_SNEAKPEEK_DISMISSED, {
                ...withIdentifiers(
                  SMART_PROMPTS_SNEAKPEEK_DISMISSED,
                  AnalyticsEntityId.video(videoId, 'videoId')
                ),
                artifactType: category,
              });
            }
          }}
          content={sneakPeekContent as SneakPeekContent}
        />
      ) : (
        <Workflows
          showCTA={false}
          isDisabled={isDisabled}
          tooltipText={tooltipText}
          onDocumentClick={onDocumentClick}
          onBugReportClick={onBugReportClick}
          onMessageClick={onMessageClick}
          hasConfluencePermissions={hasConfluencePermissions}
        />
      )}
    </Arrange>
  );
};
