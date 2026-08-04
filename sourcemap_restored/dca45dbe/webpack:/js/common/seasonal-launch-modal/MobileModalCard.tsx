import React, { useMemo } from 'react';
import cn from 'classnames';
import {
  Align,
  Arrange,
  Container,
  ModalCard,
  Spacer,
  IconButton,
  Button,
} from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';
import { Title } from './Title';
import styles from './styles.module.css';
import { MobileModalCardProps } from './types';

type DotsIndicatorProps = {
  numberOfDots?: number;
  activeIndex?: number;
};

const DotsIndicator: React.FC<DotsIndicatorProps> = ({
  numberOfDots = 0,
  activeIndex,
}) => {
  if (numberOfDots === 0) {
    return null;
  }

  return (
    <Container paddingTop="medium" className={styles.dotsContainer}>
      {Array.from({ length: numberOfDots }).map((_, index) => (
        <span
          key={index}
          className={cn(
            styles.dot,
            activeIndex === index ? 'bgc:blurple' : 'bgc:blurpleMedium'
          )}
        />
      ))}
    </Container>
  );
};

export const MobileModalCard: React.FC<MobileModalCardProps> = ({
  isOpen,
  dismissModal,
  titleSlot,
  aboveSubtitleSlot,
  belowSubtitleSlot,
  featuresSlot,
  launchConfig,
  hasAiAddOn,
  hasChangedSteps,
  currentStep,
  workspace,
  personaRole,
  showFeature,
  tourIsEnabled,
  upgradeCtaSlot,
  eventProps,
  connectCalendarCtaSlot,
  onConnectCalendarClick,
  myLibraryCtaSlot,
  onMyLibraryClick,
  featureTourCtaSlot,
  done,
  handleTakeTour,
  closeCtaSlot,
}) => {
  const hasFullWidth = true;
  const proceedButtonText = done ? 'Get started' : 'Next';

  const featureAssets = useMemo(() => {
    return featuresSlot?.map((slot, index) => {
      const isActiveStep = index === currentStep;

      if (!isActiveStep) {
        return null;
      }

      return (
        <Container
          key={index}
          width="100%"
          height={launchConfig.featuresSlotHeight}
          position="relative"
        >
          <span
            className={cn(
              styles.assetContainer,
              isActiveStep ? styles.visible : styles.invisible,
              hasChangedSteps && styles.animateVisibility
            )}
          >
            {slot.asset}
          </span>
        </Container>
      );
    });
  }, [featuresSlot, currentStep, launchConfig, hasChangedSteps]);

  return (
    <ModalCard
      data-testid="seasonal-launch-modal"
      isOpen={isOpen}
      className={cn(styles.modal)}
      placement="bottom"
      maxHeight="max-content"
      removeClose
      initialFocus={false}
    >
      <div className={cn(styles.mobileModalContent)}>
        <Container>
          <Align alignment="center">{featureAssets}</Align>
        </Container>

        <Container paddingX="medium" paddingTop="medium" paddingBottom="medium">
          <Align alignment="center">
            <Title
              aboveSubtitleSlot={aboveSubtitleSlot}
              belowSubtitleSlot={belowSubtitleSlot}
            >
              <Arrange gap="small" columns={['auto', '2rem']}>
                {titleSlot ? <Spacer bottom={1}>{titleSlot}</Spacer> : null}
                <Align alignment="topCenter">
                  <IconButton
                    altText="Close"
                    size="large"
                    icon={<SvgClose />}
                    onClick={() => dismissModal('close-button')}
                  />
                </Align>
              </Arrange>
            </Title>

            {featuresSlot && <Spacer bottom="large" />}

            {featuresSlot
              ?.find((_, index) => index === currentStep)
              ?.feature({
                collapsible: false,
                hasAiAddOn,
                hasChangedSteps,
                index: currentStep,
                isActive: true,
                memberRole: workspace.memberRole,
                personaRole,
                showFeature,
                tourIsEnabled,
                workspaceType: workspace.type,
              })}
          </Align>
        </Container>

        <Container
          id="seasonal-launch-modal-footer"
          paddingX="small"
          paddingTop="small"
          paddingBottom="large"
          className={cn(styles.footer)}
        >
          {upgradeCtaSlot &&
            upgradeCtaSlot({ dismissModal, eventProps, hasFullWidth })}

          {connectCalendarCtaSlot && (
            <>
              <Spacer bottom="medium" />
              {connectCalendarCtaSlot({
                onClick: onConnectCalendarClick,
                hasFullWidth,
              })}
            </>
          )}

          <Spacer bottom="medium" />

          <div className={cn(styles.footerAssetsNavigation)}>
            {currentStep > 0 && (
              <Button
                variant="neutral"
                size="large"
                hasFullWidth
                onClick={() => showFeature(currentStep - 1)}
              >
                Back
              </Button>
            )}

            {!done ? (
              <Button
                variant="neutral"
                size="large"
                hasFullWidth
                onClick={() => showFeature(currentStep + 1)}
              >
                Next
              </Button>
            ) : (
              <>
                {myLibraryCtaSlot &&
                  myLibraryCtaSlot({
                    onClick: onMyLibraryClick,
                    hasFullWidth,
                  })}

                {featureTourCtaSlot &&
                  featureTourCtaSlot({
                    onClick: () => handleTakeTour(),
                    children: proceedButtonText,
                    hasFullWidth,
                  })}

                {closeCtaSlot &&
                  closeCtaSlot({
                    onClick: () => dismissModal('close-button'),
                    hasFullWidth,
                  })}
              </>
            )}
          </div>

          <DotsIndicator
            numberOfDots={featureAssets?.length}
            activeIndex={currentStep}
          />
        </Container>
      </div>
    </ModalCard>
  );
};
