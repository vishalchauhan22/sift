import cx from 'classnames';

import React from 'react';

import { Arrange, Container, Icon, Text, Tooltip } from '@loomhq/lens';
import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';
import { SvgConfluenceNeutral } from '@loomhq/lens/icons/confluence-neutral';
import { SvgCreateTicket } from '@loomhq/lens/icons/create-ticket';
import { SvgWriteDocument } from '@loomhq/lens/icons/write-document';

import { SvgWriteMessage } from '@loomhq/lens/icons/write-message';

import $ from './styles.module.css';

type WorkflowButtonProps = {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
  isDisabled: boolean;
  tooltipText?: string;
  hasConfluencePermissions?: boolean;
};

const WorkflowsButton = ({
  icon,
  text,
  isDisabled,
  tooltipText,
  hasConfluencePermissions = false,
  onClick,
}: WorkflowButtonProps): JSX.Element => {
  return (
    <Tooltip
      content={tooltipText}
      isDisabled={!tooltipText}
      placement="bottomCenter"
      isInline={false}
    >
      <button
        className={cx({
          [$.workflowsButton]: !hasConfluencePermissions,
          [$.confluenceBlueWorkflowsButton]: hasConfluencePermissions,
          [$.isDisabled]: isDisabled,
        })}
        disabled={isDisabled}
        onClick={onClick}
      >
        <Container
          padding={1.5}
          backgroundImage={
            !isDisabled ? 'var(--lns-gradient-ai-secondary)' : undefined
          }
          height="100%"
          width="100%"
        >
          <Arrange autoFlow="row" gap="xsmall" justifyContent="stretch">
            <Arrange justifyContent="space-between">
              <Icon icon={icon} className={$.icon} />
              <div className={$.chevronIcon}>
                <Icon icon={<SvgChevronRight />} />
              </div>
            </Arrange>
            <Text alignment="left" fontWeight="bold">
              {text}
            </Text>
          </Arrange>
        </Container>
      </button>
    </Tooltip>
  );
};

type WorkflowsProps = {
  onDocumentClick: () => void;
  onMessageClick: () => void;
  onBugReportClick: () => void;
  isDisabled: boolean;
  tooltipText?: string;
  showCTA?: boolean;
  hasConfluencePermissions?: boolean;
};

export const Workflows = ({
  isDisabled,
  tooltipText,
  showCTA = true,
  onDocumentClick,
  onMessageClick,
  onBugReportClick,
  hasConfluencePermissions = false,
}: WorkflowsProps): JSX.Element => {
  return (
    <Arrange autoFlow="row" gap={1.5} justifyContent="stretch">
      {showCTA && <Text color="body">Use your video to generate a...</Text>}
      <Arrange
        gap={1.5}
        justifyContent="stretch"
        columns={['1fr', '1fr', '1fr']}
      >
        <WorkflowsButton
          icon={
            hasConfluencePermissions ? (
              <SvgConfluenceNeutral />
            ) : (
              <SvgWriteDocument />
            )
          }
          text={hasConfluencePermissions ? 'Page' : 'Document'}
          onClick={onDocumentClick}
          isDisabled={isDisabled}
          tooltipText={tooltipText}
          hasConfluencePermissions={hasConfluencePermissions}
        />

        <WorkflowsButton
          icon={<SvgWriteMessage />}
          text="Message"
          onClick={onMessageClick}
          isDisabled={isDisabled}
          tooltipText={tooltipText}
        />

        <WorkflowsButton
          icon={<SvgCreateTicket />}
          text="Bug report"
          onClick={onBugReportClick}
          isDisabled={isDisabled}
          tooltipText={tooltipText}
        />
      </Arrange>
    </Arrange>
  );
};
