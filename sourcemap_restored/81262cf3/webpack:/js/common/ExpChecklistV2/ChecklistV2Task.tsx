import { GET_STARTED_CHECKLIST_SUMMARY_CLICKED } from '@js/constants/events';

import cn from 'classnames';
import React from 'react';
import AnimateHeight from 'react-animate-height';

import { CSSTransition } from 'react-transition-group';

import { Arrange, IconButton, Pill, Text } from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';

import styles from '@js/common/ExpChecklistV2/ChecklistV2Task.module.css';

import * as analytics from '@js/utilities/analytics';

import { ChecklistV2DisplayContext } from './types';

import { Task } from '@js/hooks/onboarding/checklist/types';
import { SvgChevronUp } from '@loomhq/lens/icons/chevron-up';

const transitionClasses = {
  enter: styles.transitionEnter,
  enterActive: styles.transitionEnterActive,
  exit: styles.transitionExit,
  exitActive: styles.transitionExitActive,
};

export interface ChecklistV2TaskProps {
  isOpen: boolean;
  isComplete: boolean;
  isCurrent: boolean;
  showCompletionAnimation: boolean;
  title: string;
  children: any;
  onOpen: (event: Event) => void;
  onClose: (event: Event) => void;
  task: Task;
  displayContext: ChecklistV2DisplayContext;
}

export function ChecklistV2Task({
  isOpen,
  isComplete,
  isCurrent,
  showCompletionAnimation,
  title,
  children,
  onOpen,
  onClose,
  task,
  displayContext,
}: ChecklistV2TaskProps): JSX.Element {
  const canOpen = Boolean(children);
  const onClickSummary = event => {
    event.preventDefault();

    if (isOpen) {
      onClose(event);
    } else if (canOpen) {
      onOpen(event);
    }

    analytics.track(GET_STARTED_CHECKLIST_SUMMARY_CLICKED, {
      displayContext,
    });
  };

  const showNewPill =
    displayContext === ChecklistV2DisplayContext.Full && task.shouldShowNewPill;

  const fontWeight = isOpen ? 'bold' : 'book';
  const color = isComplete ? 'bodyDimmed' : 'body';

  return (
    <details
      className={cn(
        styles.details,
        isComplete && styles.isComplete,
        isCurrent && styles.isCurrentTask,
        isOpen && styles.isOpen,
        !canOpen && styles.disabled,
        showCompletionAnimation && styles.completionAnimation
      )}
      open={isOpen}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <summary
        className={styles.summary}
        onClick={onClickSummary}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={canOpen ? 0 : -1}
      >
        <span className={styles.statusIcon} />
        <CSSTransition classNames={transitionClasses} timeout={300}>
          <Text
            className={task.isComplete ? styles.completedTask : ''}
            fontWeight={fontWeight}
            color={color}
          >
            {title}
          </Text>
        </CSSTransition>

        {canOpen && (
          <span className={styles.toggleIcon}>
            <Arrange autoFlow="column" gap="xsmall">
              {showNewPill ? (
                <Pill backgroundColor="upgrade" color="body">
                  New
                </Pill>
              ) : null}
              <IconButton
                size="small"
                icon={isOpen ? <SvgChevronUp /> : <SvgChevronDown />}
                color={color}
                altText={`Expand ${title} step`}
              />
            </Arrange>
          </span>
        )}
      </summary>
      <AnimateHeight
        id={`${task.id}-panel`}
        duration={300}
        height={isOpen ? 'auto' : 0}
      >
        <div className={cn(styles.content, isComplete && styles.isComplete)}>
          {children}
        </div>
      </AnimateHeight>
    </details>
  );
}
