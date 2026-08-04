//  🚩 Start: EXP_AI_WORKFLOWS_FOR_VIEWERS
import cn from 'classnames';
import { useIsSidebarCollapsedOrStacked } from '@js/common/layout';
import { WORKFLOWS_MODAL } from '@js/common/modal-container/modal-components/constants';
import { useModals } from '@js/common/modal-container/useModals';
import { usePlayerFromContext, useVideoContext } from '@js/common/video-player';
import { useWorkflowsAnalytics } from '@js/common/workflows/common/useWorkflowsAnalytics';
import { WorkflowTriggerTypes } from '@js/common/workflows/workflows-modal/common/constants';
import React from 'react';

import {
  Arrange,
  Container,
  Icon,
  Logo,
  Text,
  Tooltip,
  Spacer,
} from '@loomhq/lens';
import { SvgWriteDocument } from '@loomhq/lens/icons/write-document';

import styles from './styles.module.css';
import { useWorkflowHeaderFlagValue } from '../workflows-modal/hooks';

export const WorkflowsModalEntryFooter = ({
  parentWidth,
  isExpanded = true,
}: {
  parentWidth: number;
  isExpanded?: boolean;
}): JSX.Element => {
  const { openModal } = useModals();
  const { video } = useVideoContext();
  const player = usePlayerFromContext();

  const analytics = useWorkflowsAnalytics();

  const { isStacked } = useIsSidebarCollapsedOrStacked();
  const workflowHeaderFlagValue = useWorkflowHeaderFlagValue();

  const workflowsModalEntryFooterRef = React.useRef<HTMLDivElement | null>(
    null
  );

  const openWorkflowsModal = (workflowType: 'document' | 'ticket') => {
    analytics.openViewerWorkflowsModal(workflowType);

    openModal({
      modalType: WORKFLOWS_MODAL,
      options: {
        workflowTypeOnOpen: workflowType,
        triggerSource: WorkflowTriggerTypes.ActivityTab,
        workflowHeaderFlagValue,
      },
    });
  };

  return (
    <>
      {/* The visible footer has a fixed position, so it doesn't take up space.
        The below div is a placeholder for when there are comments; this ensures
        the bottom comments aren't hidden behind the footer. */}
      <div
        style={
          workflowsModalEntryFooterRef.current
            ? {
                height: `${workflowsModalEntryFooterRef.current.clientHeight}px`,
              }
            : {}
        }
      ></div>
      <div
        ref={workflowsModalEntryFooterRef}
        className={styles.gradientBackground}
        style={{
          ...(parentWidth ? { width: `${parentWidth}px` } : {}),
          ...{ position: isStacked ? 'absolute' : 'fixed' },
        }}
      >
        <div className={`flex`}>
          <div
            className={`${
              isExpanded ? '' : 'width:full flex justify:spaceBetween'
            }`}
          >
            <Arrange gap="2px">
              <Text size="body-lg">View this Loom as a document</Text>
              <Container position="relative" top="-4px" left="-2px">
                <Logo variant="symbol" maxWidth={1} brand="ai" />
              </Container>
            </Arrange>
            {isExpanded ? null : (
              <>
                <Tooltip
                  isInline={false}
                  content="Summarize this Loom in an SOP, step-by-step and more."
                >
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
                  <div
                    className={cn(styles.gradientBorder, 'p:medium')}
                    onClick={() => {
                      player?.pause();
                      openWorkflowsModal('document');
                    }}
                  >
                    <Text fontWeight="bold" size="body-md">
                      Read now
                    </Text>
                  </div>
                </Tooltip>
              </>
            )}
          </div>
        </div>
        {isExpanded ? (
          <>
            <Text color="bodyDimmed">
              {`Here are the key takeaways from ${video.owner.displayName}'s video...`}
            </Text>
            <Spacer bottom={2} />
            <Tooltip
              isInline={false}
              content="Summarize this Loom in an SOP, step-by-step and more."
            >
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
              <div
                className={cn(styles.gradientBorder, 'p:medium')}
                onClick={() => {
                  player?.pause();
                  openWorkflowsModal('document');
                }}
              >
                <Arrange gap="small">
                  <Icon icon={<SvgWriteDocument />} />

                  <Text fontWeight="bold" size="body-md">
                    Read full summary
                  </Text>
                </Arrange>
              </div>
            </Tooltip>
          </>
        ) : null}
      </div>
    </>
  );
};
// 🚩 End: EXP_AI_WORKFLOWS_FOR_VIEWERS
