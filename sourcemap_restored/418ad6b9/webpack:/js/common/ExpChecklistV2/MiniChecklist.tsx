import React from 'react';

import { Arrange, Container, IconButton, Spacer, Text } from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SvgChevronUp } from '@loomhq/lens/icons/chevron-up';

import { Task } from '@js/hooks/onboarding/checklist/types';

import { ChecklistV2ProgressBar, TaskHeight } from './ChecklistV2ProgressBar';
import styles from './MiniChecklist.module.css';

export function MiniChecklist({
  isExpIntegratedChecklist,
  isOpen = false,
  onClick,
  tasks,
}: {
  isOpen?: boolean;
  onClick: () => void;
  tasks: Array<Task>;
  isExpIntegratedChecklist: boolean;
}): JSX.Element {
  return (
    <Container
      padding={isExpIntegratedChecklist ? 'medium' : 'large'}
      backgroundColor="background"
      borderSide="all"
      radius="large"
    >
      <Arrange alignItems="center" justifyContent={'space-around'}>
        <button className={styles.titleButton} onClick={onClick}>
          <Text color="body" size={'body-lg'} fontWeight="bold" htmlTag="h2">
            {'Get Started'}
          </Text>
        </button>
        <div className={styles.chevron}>
          <IconButton
            altText="Collapse checklist"
            size="medium"
            icon={isOpen ? <SvgChevronDown /> : <SvgChevronUp />}
            onClick={onClick}
          />
        </div>
      </Arrange>
      <Spacer top="medium" />
      <ChecklistV2ProgressBar
        taskHeight={TaskHeight.Small}
        tasks={tasks}
        isExpIntegratedChecklist={isExpIntegratedChecklist}
      />
    </Container>
  );
}
