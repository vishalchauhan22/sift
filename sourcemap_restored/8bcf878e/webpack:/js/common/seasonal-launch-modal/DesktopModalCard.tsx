import React, { useMemo } from 'react';
import cn from 'classnames';
import {
  Align,
  Arrange,
  Container,
  ModalCard,
  Spacer,
  Split,
  SplitSection,
} from '@loomhq/lens';
import styles from './styles.module.css';
import { useMatchLargeTabletOrDesktop } from '../../hooks/useMatchMedia';
import { Title } from './Title';
import { DesktopModalCardProps } from './types';

export const DesktopModalCard: React.FC<DesktopModalCardProps> = ({
  modal,
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
  footerSlot,
}) => {
  const isLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();

  const modalCardMaxWidth = modal?.maxWidth || 110;
  const proceedButtonText = done ? 'Get started' : 'Next';
  const ContentContainer = launchConfig?.ContentContainer || Arrange;

  const featureAssets = useMemo(() => {
    return featuresSlot?.map((slot, index) => {
      const isActiveStep = index === currentStep;

      if (!isActiveStep) {
        return null;
      }

      return (
        <Container
          key={index}
          width={
            isLargeTabletOrDesktop ? launchConfig.featuresSlotWidth : '100%'
          }
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
  }, [
    featuresSlot,
    currentStep,
    isLargeTabletOrDesktop,
    launchConfig,
    hasChangedSteps,
  ]);

  return (
    <ModalCard
      data-testid="seasonal-launch-modal"
      maxWidth={modalCardMaxWidth}
      maxHeight="80vh"
      onCloseClick={() => dismissModal('close-button')}
      isOpen={isOpen}
      className={cn(styles.modal)}
      initialFocus={false}
    >
      <ContentContainer rows={['1fr', 'auto']} className="overflow-hidden">
        <Container
          paddingX="xlarge"
          paddingTop="xlarge"
          className="flex-1 min-h-0 overflow-y-auto"
        >
          <Align alignment="center">
            <Title
              aboveSubtitleSlot={aboveSubtitleSlot}
              belowSubtitleSlot={belowSubtitleSlot}
            >
              {titleSlot ? <Spacer bottom={0.5}>{titleSlot}</Spacer> : null}
            </Title>
          </Align>
          <Spacer bottom={2} />
          {featuresSlot && featuresSlot.length ? (
            <Arrange
              gap={launchConfig.columnLayout.gap}
              alignItems="start"
              columns={launchConfig.columnLayout.columns}
            >
              <Align alignment="center">
                <Arrange gap={launchConfig.featureSlotGap} rows="auto">
                  {featuresSlot.map((slot, index) =>
                    slot.feature({
                      collapsible: false,
                      hasAiAddOn,
                      hasChangedSteps,
                      index,
                      isActive: index === currentStep,
                      memberRole: workspace.memberRole,
                      personaRole,
                      showFeature,
                      tourIsEnabled,
                      workspaceType: workspace.type,
                    })
                  )}
                </Arrange>
              </Align>

              {featureAssets}
            </Arrange>
          ) : null}

          <Spacer bottom="medium" />
        </Container>

        <Container
          id="seasonal-launch-modal-footer"
          className={cn(launchConfig.footerClassName)}
        >
          <Container paddingX="large" width="100%">
            <Split justifyContent="center">
              <SplitSection>
                <Arrange gap={launchConfig.footerBtnsGap}>
                  {upgradeCtaSlot &&
                    upgradeCtaSlot({ dismissModal, eventProps })}

                  {connectCalendarCtaSlot &&
                    connectCalendarCtaSlot({
                      onClick: onConnectCalendarClick,
                    })}

                  {myLibraryCtaSlot &&
                    myLibraryCtaSlot({
                      onClick: onMyLibraryClick,
                    })}

                  {featureTourCtaSlot &&
                    featureTourCtaSlot({
                      onClick: () =>
                        done ? handleTakeTour() : showFeature(currentStep + 1),
                      children: proceedButtonText,
                    })}

                  {closeCtaSlot &&
                    closeCtaSlot({
                      onClick: () => dismissModal('close-button'),
                    })}
                </Arrange>
              </SplitSection>
            </Split>
          </Container>

          {footerSlot && (
            <Container
              paddingY="large"
              paddingX="xlarge"
              borderSide="top"
              backgroundColor="highlight"
            >
              <Align alignment="center">
                {footerSlot({ onClick: onConnectCalendarClick })}
              </Align>
            </Container>
          )}
        </Container>
      </ContentContainer>
    </ModalCard>
  );
};
