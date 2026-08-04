import { useVideoContext } from '@js/common/video-player';
import { redirectToVariablesEditPage } from '@js/pages/edit-video/page/transcript-editor/common/components/audioVariables/utils';
import { useIsVideoEligibleForAudioVariables } from '@js/pages/share/common/variables';
import React from 'react';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { TextButton, Text, Container, Tooltip } from '@loomhq/lens';
import { SvgVariables } from '@loomhq/lens/icons/variables';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { VideoPersonalizationType } from '@js/globalTypes.generated';

import styles from './styles.module.css';

// This width is reserved as padding internal to the title bar's input. It's important
// to keep this updated when changes are made to this button so that the title bar retains
// enough space for the button.
export const VARIABLES_BUTTON_WIDTH = '188px';

const TextInputVariablesButtonForConsolidatedTitleVariables = () => {
  const {
    video: { id: videoId, isParentOfPersonalizedCopies, personalizationType },
  } = useVideoContext();

  const { hasAccess, reason } = useIsVideoEligibleForAudioVariables();

  const isTitleVariablesVideoParent =
    isParentOfPersonalizedCopies &&
    personalizationType === VideoPersonalizationType.Title;

  const tooltipText = isTitleVariablesVideoParent
    ? 'Variables has moved! You can now send personalized videos with AI-generated audio that sounds exactly like you. Record a new video to get started'
    : hasAccess
      ? 'Personalize your video and title with realistic AI-generated audio that sounds exactly like you'
      : reason;

  const shouldDisableButton = !hasAccess || isTitleVariablesVideoParent;

  return (
    <Tooltip
      content={tooltipText}
      tabIndex={-1}
      placement="bottomCenter"
      keepOpen={true}
    >
      <TextButton
        icon={<SvgVariables />}
        iconPosition="left"
        onClick={() =>
          redirectToVariablesEditPage(videoId, 'share-page-title-input')
        }
        isDisabled={shouldDisableButton}
        onMouseDown={e => {
          e.preventDefault();
        }}
      >
        <Text
          size="body-md"
          fontWeight="bold"
          className={styles.variableButtonText}
        >
          Add audio variable
        </Text>
      </TextButton>
    </Tooltip>
  );
};

const TitleBarVariablesButtonWithoutFeatureWrapper = (): JSX.Element | null => {
  const { featureLoadedRef } = useFeatureWrapper();
  const refHandler = newRef => {
    featureLoadedRef(newRef);
  };

  return (
    <Container refHandler={refHandler} position="absolute" right={'small'}>
      <TextInputVariablesButtonForConsolidatedTitleVariables />
    </Container>
  );
};

export const TitleBarVariablesButton = (): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.Variables}
      errorType={ErrorBoundaryTypes.SILENT}
      additionalLoggingValues={{ version: 'title bar' }}
    >
      <TitleBarVariablesButtonWithoutFeatureWrapper />
    </FeatureWrapper>
  );
};
