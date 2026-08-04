import {
  CSM_AI_EXP_EVALUATED,
  HELP_BUBBLE_CLICKED,
} from '@js/constants/events';

import { hide } from '@intercom/messenger-js-sdk';
import classNames from 'classnames';
import { useCurrentUserSelector } from '@js/common/current-user';
import { useIsSidebarCollapsedOrStacked } from '@js/common/layout';
import { CONTACT_SUPPORT_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useExpMwebCommenting } from '@js/hooks/experiments/useExpMwebCommenting';
import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useHasScope } from '@js/hooks/useHasScopes';
import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';
import { useScreenInLandscapeMode } from '@js/hooks/useScreenInLandscapeMode';
import { useSearchParams } from '@js/hooks/useSearchParams';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import _debounce from 'lodash/debounce';
import React, { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import * as analytics from '@js/utilities/analytics';
import * as logger from '@js/utilities/loggerx';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Container, Icon, Spacer, Text } from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { HELP_BUBBLE_CONTACT_SUPPORT } from '@loomhq/shared-utilities/constants/scopes';
import {
  FEATURE_GATES,
  ControlType,
  EXPERIMENTS,
} from '@loomhq/shared-utilities/constants/statsig';

import { useIntercomEventSubscription } from './IntercomEvent.generated';
import {
  EXTRA_WIDTH_OFFSET,
  OFFSET_STACKED_RIGHT_PANEL,
  OPEN_ON_LAUNCH_PARAM,
} from './constants';
import { HelpBubbleContext } from './context';
import { HelpMenu } from './help-menu';
import { CsmWidget } from './help-widget';
import {
  CsmJourneyIdProvider,
  useCsmJourneyId,
} from './help-widget/csm-journey-id';
import { useIsEnterpriseUser } from './help-widget/panel/hooks';
import $ from './styles.module.css';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../utilities/analytics/attribute-transformer';

interface HelpBubbleProps {
  inVideoWrapper?: boolean;
  rightPanelRef?: React.RefObject<HTMLDivElement> | null;
}

const HelpBubbleWithoutFeatureWrapper: React.FC<
  React.PropsWithChildren<HelpBubbleProps>
> = ({ inVideoWrapper = false, rightPanelRef = null }) => {
  const csmJourneyId = useCsmJourneyId();
  const [showMenu, setShowMenu] = useState(false);
  const [shouldFocusOnClose, setShouldFocusOnClose] = useState(false);
  const isEnterpriseUser = useIsEnterpriseUser();
  const params = useSearchParams();
  const openOnLaunch = params.get(OPEN_ON_LAUNCH_PARAM) === 'true';

  const helpBubbleContext = React.useContext(HelpBubbleContext);
  const { showBubble } = helpBubbleContext;

  // variables for positioning the bubble in video wrapper
  const [offsetWidth, setOffsetWidth] = useState(0);
  // Store the element that had focus before opening the menu
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isStacked } = useIsSidebarCollapsedOrStacked();
  const isOnLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();

  const hasContactSupportScope = useHasScope(HELP_BUBBLE_CONTACT_SUPPORT);

  const { featureLoadedRef } = useFeatureWrapper(containerRef);

  const workspace = useGetSelectedWorkspace();
  const workspacePlan = workspace?.type;

  const isInLandscapeMode = useScreenInLandscapeMode();
  const { isExpMwebCommenting } = useExpMwebCommenting();
  const isLandscapeModeOnExpMwebCommenting =
    isInLandscapeMode && isExpMwebCommenting;

  // to set the help bubble position
  useEffect(() => {
    // we don't need to calc the position if
    //  - the bubble's not placed in video wrapper
    //  - OR the right panel is closed (ie use the default CSS rules)
    if (!inVideoWrapper || !rightPanelRef?.current) {
      return;
    }

    const widthOffset = isStacked
      ? OFFSET_STACKED_RIGHT_PANEL
      : offsetWidth + EXTRA_WIDTH_OFFSET;

    if (containerRef.current) {
      containerRef.current.style.right = `${widthOffset}px`;
    }
  }, [inVideoWrapper, rightPanelRef, isStacked, offsetWidth]);

  useEffect(() => {
    if (!inVideoWrapper || !rightPanelRef?.current) {
      return;
    }

    const update = e => {
      const width = e[0].target.clientWidth;

      setOffsetWidth(width);
    };

    const ro = new ResizeObserver(_debounce(update, 100));

    if (rightPanelRef?.current) {
      ro.observe(rightPanelRef.current);
    }

    return () => ro.disconnect();
  }, [inVideoWrapper, rightPanelRef]);

  const handleBubbleClick = () => {
    if (!showMenu) {
      analytics.track(HELP_BUBBLE_CLICKED);
    }

    setShowMenu(!showMenu);
  };

  // Handle focus trap and restoration
  useEffect(() => {
    if (showMenu) {
      // Store the currently focused element before opening menu
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the button when menu opens
      buttonRef.current?.focus();
    } else if (!showMenu && previousFocusRef.current && !shouldFocusOnClose) {
      // Restore focus to previous element when menu closes (unless modal is closing)
      previousFocusRef.current.focus();
    }
  }, [showMenu, shouldFocusOnClose]);

  // Handle focus when modal closes
  useEffect(() => {
    if (shouldFocusOnClose) {
      buttonRef.current?.focus();
      setShouldFocusOnClose(false);
    }
  }, [shouldFocusOnClose]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!showMenu) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowMenu(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showMenu, setShowMenu]);

  const [showChatbot] = useFlagIsActivated({
    flag: FEATURE_GATES.LOOM_ROLLOUT_INTERCOM_CHAT_BOT_GATE,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
    eligibilityPreCheckFunction: () => {
      if (!showBubble) {
        return {
          pass: false,
          failReason: 'Help bubble is not shown',
        };
      }

      return {
        pass: true,
      };
    },
    returnAssignmentName: true,
  });

  const [csmChatWidgetExperimentEnabled, csmChatWidgetExperimentAssignment] =
    useFlagIsActivated({
      flag: EXPERIMENTS.LOOM_CSM_AI_CHAT_EXPERIMENT,
      controlType: ControlType.STATSIG_EXPERIMENT,
      activationValues: ['variant'],
      eligibilityPreCheckFunction: () => {
        if (!showBubble) {
          return {
            pass: false,
            failReason: 'Help bubble is not shown',
          };
        }

        return {
          pass: true,
        };
      },
      returnAssignmentName: true,
    });

  useEffect(() => {
    if (
      typeof csmChatWidgetExperimentAssignment !== 'undefined' &&
      showBubble
    ) {
      analytics.track(CSM_AI_EXP_EVALUATED, {
        ...withIdentifiers(
          CSM_AI_EXP_EVALUATED,
          AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
        ),
        experimentKey: EXPERIMENTS.LOOM_CSM_AI_CHAT_EXPERIMENT,
        experimentValue: csmChatWidgetExperimentAssignment,
        workspacePlan,
      });
    }
  }, [
    csmChatWidgetExperimentAssignment,
    showBubble,
    csmJourneyId,
    workspacePlan,
  ]);

  const userId = useCurrentUserSelector(user => user.id, undefined);

  const { openModal } = useModals();

  useEffect(() => {
    if (openOnLaunch) {
      if (csmChatWidgetExperimentEnabled === true) {
        setShowMenu(true);
        // TODO: add Enterprise user check once the experiment is over
      } else if (csmChatWidgetExperimentEnabled === false) {
        openModal({
          modalType: CONTACT_SUPPORT_MODAL,
          options: {
            isNonLoggedInUser: false,
          },
        });
      }
    }
  }, [
    csmChatWidgetExperimentEnabled,
    isEnterpriseUser,
    openModal,
    openOnLaunch,
  ]);

  useIntercomEventSubscription({
    variables: {
      userId: userId as number,
    },
    skip: !userId || !hasContactSupportScope || !showChatbot || !showBubble,
    onData: ({ data }) => {
      if (data?.data?.intercomEvent && hasContactSupportScope) {
        const { conversationId, createdAt, updatedAt } =
          data?.data?.intercomEvent;

        // Hide Intercom bot
        hide();

        openModal({
          modalType: CONTACT_SUPPORT_MODAL,
          options: {
            conversationId,
            createdAt,
            updatedAt,
            onClose: () => {
              // Return focus to the help button when modal closes
              buttonRef.current?.focus();
            },
          },
        });
      }
    },
    onError: err => {
      logger.error(
        err,
        { message: `Error in Intercom event subscription`, userId },
        {
          feature: Feature.Intercom,
        }
      );
    },
  });

  const buttonIcon = showMenu ? (
    <Icon icon={<SvgClose />} color="body" />
  ) : (
    <Text size="heading-sm" color="body">
      ?
    </Text>
  );

  // showVideoTitleAboveVideo is false when the browser width
  // shrinks to > 768px. In this case we don't need to display
  // it as there's another one handling it already in "header-v2"
  if (inVideoWrapper && !isOnLargeTabletOrDesktop) {
    return null;
  }

  const button = (
    <div
      className={classNames($.help, {
        [$.helpLandscapeMweb]: isLandscapeModeOnExpMwebCommenting,
      })}
      ref={featureLoadedRef}
    >
      <Spacer top="medium">
        <Container backgroundColor="background" radius="200">
          <button
            ref={buttonRef}
            className={classNames(
              $.helpBubble,
              'border flex items:center justify:center',
              {
                active: showMenu,
              }
            )}
            onClick={handleBubbleClick}
            aria-expanded={showMenu}
            aria-haspopup="true"
            aria-controls="help-menu"
          >
            {buttonIcon}
          </button>
        </Container>
      </Spacer>
      <div id="help-menu">
        <HelpMenu
          show={showMenu}
          setShowMenu={setShowMenu}
          showChatbot={showChatbot}
          hasContactSupportScope={hasContactSupportScope}
          helpButtonRef={buttonRef}
        />
      </div>
    </div>
  );

  if (!showBubble || typeof csmChatWidgetExperimentEnabled === 'undefined') {
    return null;
  }

  if (csmChatWidgetExperimentEnabled) {
    return (
      <div className={classNames($.help)} ref={featureLoadedRef}>
        <CsmWidget
          rightOffset={offsetWidth}
          buttonRef={buttonRef}
          expanded={showMenu}
          setExpanded={setShowMenu}
        />
      </div>
    );
  }

  return button;
};

export const HelpBubble: React.FC<React.PropsWithChildren<HelpBubbleProps>> = ({
  inVideoWrapper = false,
  rightPanelRef = null,
}) => {
  return (
    <FeatureWrapper
      feature={Feature.HelpBubble}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <CsmJourneyIdProvider>
        <HelpBubbleWithoutFeatureWrapper
          inVideoWrapper={inVideoWrapper}
          rightPanelRef={rightPanelRef}
        />
      </CsmJourneyIdProvider>
    </FeatureWrapper>
  );
};
