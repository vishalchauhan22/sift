import { EMPTY_STATE_RENDERED } from '@js/constants/events';

import { useExpUpdatedMobileOnboarding } from '@js/hooks/experiments/useExpUpdatedMobileOnboarding';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import { useEmptyStateContent } from '@js/hooks/useEmptyStateContent';
import { useInvitationCapabilities } from '@js/hooks/useInvitationCapabilities';
import { useWorkspaceDestinationStateData } from '@js/hooks/useWorkspaceDestinationStateData';
import React, { useEffect } from 'react';

import { Arrange, Container, Spacer, Text } from '@loomhq/lens';
import {
  DYNAMIC_CONFIGS,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';
import { track } from '@js/utilities/analytics';

import EmptyStateButton from '../EmptyStateButton';
import { EmptyStateType } from '../constants';
import { MobileDownloadButton } from '../mobile-download-button';
import EmptyStateCarousel from './EmptyStateCarousel';

import { EMPTY_STATE_CAROUSEL_SPACER_ID } from './constants';
import styles from './styles.module.less';
import { useExpMobileWebOnboardingV2 } from '@js/hooks/experiments/useExpMobileWebOnboardingVersion2';

const DestinationEmptyState = ({
  type,
}: {
  type: EmptyStateType;
}): JSX.Element | null => {
  const { showInviteButton } = useInvitationCapabilities();
  const EMPTY_STATE_CONTENT = useEmptyStateContent();
  const {
    illustration,
    imgWidth,
    title,
    subtitle,
    carouselTitle,
    carouselVideos,
    analyticsEmptyStateName,
    isViewerVariant,
    buttonText,
    showConfigVideos,
  } = EMPTY_STATE_CONTENT[type];

  const workspaceDestinationStateData = useWorkspaceDestinationStateData();

  const welcomeLoomData = useFeatureFlagValue<any>(
    DYNAMIC_CONFIGS.CONFIG_WELCOME_LOOM_IDS,
    ControlType.DYNAMIC_CONFIG
  );

  const { isExpUpdatedMobileOnboarding } = useExpUpdatedMobileOnboarding();
  const { isExpMobileWebOnboardingV2 } = useExpMobileWebOnboardingV2();

  const videos =
    welcomeLoomData?.length && showConfigVideos
      ? welcomeLoomData
      : carouselVideos;

  useEffect(() => {
    if (!workspaceDestinationStateData) {
      return;
    }

    track(EMPTY_STATE_RENDERED, {
      empty_state_name: analyticsEmptyStateName,
      is_viewer_variant: isViewerVariant,
      ...workspaceDestinationStateData,
    });
  }, [analyticsEmptyStateName, isViewerVariant, workspaceDestinationStateData]);

  const showEmptyStateButton = Boolean(buttonText) && showInviteButton;

  const alignment =
    isExpUpdatedMobileOnboarding || isExpMobileWebOnboardingV2
      ? 'left'
      : 'center';

  return (
    <Container>
      <Arrange justifyContent="center">
        <Container maxWidth="480px">
          <Arrange
            autoFlow="row"
            gap={
              isExpUpdatedMobileOnboarding || isExpMobileWebOnboardingV2
                ? 'medium'
                : 3
            }
          >
            {isExpUpdatedMobileOnboarding ||
            isExpMobileWebOnboardingV2 ? null : (
              <Container>
                <Arrange alignItems="center" justifyContent="center">
                  {/* TODO(next author): Add meaningful alt text for below img if it provides visual context and is not purely decorative. Otherwise, if the image is purely decorative, remove this todo as alt="" will suffice. Please also add an explicit height for performance/accessibility. */}
                  <img alt="" src={illustration} width={imgWidth} />
                </Arrange>
              </Container>
            )}
            <Text
              alignment={alignment}
              size="heading-sm"
              fontWeight="bold"
              htmlTag="h2"
            >
              {title}
            </Text>
            <Text
              className={styles.textWithNewline}
              alignment={alignment}
              size={
                isExpUpdatedMobileOnboarding || isExpMobileWebOnboardingV2
                  ? 'medium'
                  : 'large'
              }
              fontWeight="book"
              color="bodyDimmed"
            >
              {subtitle}
            </Text>
            <Arrange
              width="100%"
              justifyContent={
                isExpUpdatedMobileOnboarding || isExpMobileWebOnboardingV2
                  ? 'stretch'
                  : 'center'
              }
            >
              {isExpUpdatedMobileOnboarding || isExpMobileWebOnboardingV2 ? (
                <MobileDownloadButton buttonText={buttonText} />
              ) : showEmptyStateButton ? (
                <EmptyStateButton type={type} isCommunity={false} />
              ) : null}
            </Arrange>
          </Arrange>
        </Container>
      </Arrange>
      <Spacer
        id={EMPTY_STATE_CAROUSEL_SPACER_ID}
        top={isExpUpdatedMobileOnboarding || isExpMobileWebOnboardingV2 ? 5 : 9}
      />
      <EmptyStateCarousel title={carouselTitle} videoIds={videos} />
    </Container>
  );
};

export { EmptyStateType } from '../constants';

// eslint-disable-next-line import/no-default-export
export default DestinationEmptyState;
