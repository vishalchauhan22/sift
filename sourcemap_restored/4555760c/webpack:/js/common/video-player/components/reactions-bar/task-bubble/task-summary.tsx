/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import { SemanticParser } from '@js/common/comments';
import { Task } from '@js/common/video-player';
import React from 'react';

import { Arrange, Text, Icon, Align, Container } from '@loomhq/lens';
import { SvgCheckCircle } from '@loomhq/lens/icons/check-circle';
import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';

import { timeUtils } from '@loomhq/shared-utilities';

const { secondsToVideoTS } = timeUtils;

export const TaskSummary = ({
  task,
  showExpanded,
}: {
  task: Task;
  showExpanded: boolean;
}): JSX.Element => {
  // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
  const literalTS = secondsToVideoTS(task.timestamp);

  return (
    <Arrange autoFlow="column" gap="xsmall" alignItems="start">
      <Container paddingTop="2px">
        <Icon icon={<SvgCheckCircle />} color="blurpleMedium" size={2.5} />
      </Container>
      {showExpanded ? (
        <Arrange gap="small" alignItems="center">
          <Arrange autoFlow="row">
            <Arrange gap="small">
              <Text color="blurpleMedium" fontWeight="bold">
                {literalTS}
              </Text>
              <Align alignment="center">
                <Text size="body-sm" color="bodyDimmed">
                  {task.formattedDate}{' '}
                  {task.ownerName ? `by ${task.ownerName}` : `by video owner`}
                </Text>
              </Align>
            </Arrange>
            <Text color="body" size="body-sm" hasEllipsis ellipsisLines={10}>
              <SemanticParser comment={task} />
            </Text>
          </Arrange>
          <Icon icon={<SvgChevronRight />} />
        </Arrange>
      ) : (
        <Align alignment="center">
          <Text color="body" size="body-sm" hasEllipsis ellipsisLines={10}>
            <SemanticParser comment={task} />
          </Text>
        </Align>
      )}
    </Arrange>
  );
};
