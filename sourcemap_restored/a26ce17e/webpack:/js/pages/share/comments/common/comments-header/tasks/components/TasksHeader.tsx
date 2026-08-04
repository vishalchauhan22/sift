import { useVideoContext } from '@js/common/video-player';
import React from 'react';

import {
  Logo,
  Arrange,
  Icon,
  IconButton,
  Tooltip,
  TextButton,
} from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SvgChevronUp } from '@loomhq/lens/icons/chevron-up';
import { SvgInfo } from '@loomhq/lens/icons/info';
import { SvgPlusCircle } from '@loomhq/lens/icons/plus-circle';

import * as analytics from '@js/utilities/analytics';

import { TASKS_EXPANDED, TASKS_COLLAPSED } from '../constants/events';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

const SUGGESTED_SUBTEXT =
  'Suggestions are only visible to you. Accept suggestions to publish them to your viewers.';

interface TasksHeaderProps {
  numOfTasks: number;
  titleElem: JSX.Element;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  setIsAddingNewTask?: (isAddingNewTask: boolean) => void;
  suggested?: boolean;
  taskInputRef?: React.RefObject<HTMLTextAreaElement>;
}

export const TasksHeader = ({
  numOfTasks,
  titleElem,
  isCollapsed,
  setIsCollapsed,
  setIsAddingNewTask,
  suggested,
  taskInputRef,
}: TasksHeaderProps): JSX.Element => {
  const {
    video: { id: videoId, currentUserCanEdit },
  } = useVideoContext();
  const canAddTasks = currentUserCanEdit && !suggested;
  const eventName = isCollapsed ? TASKS_EXPANDED : TASKS_COLLAPSED;
  const onClickCollapseExpand = () => {
    analytics.track(
      eventName,
      withIdentifiers(eventName, AnalyticsEntityId.video(videoId, 'video_id'))
    );
    setIsCollapsed(!isCollapsed);
  };

  const onClick = () => {
    setIsAddingNewTask?.(true);
    taskInputRef?.current?.focus();
  };

  return (
    <Arrange justifyContent="space-between">
      <Arrange gap="xsmall">
        {suggested && (
          <Logo
            variant="symbol"
            maxWidth={2}
            brand="ai"
            customId="taskHeader"
          />
        )}
        {titleElem}
        {suggested && (
          <Tooltip
            content={SUGGESTED_SUBTEXT}
            placement="bottomCenter"
            maxWidth={66}
          >
            <Icon
              icon={<SvgInfo />}
              size="18px"
              color="bodyDimmed"
              altText="More info on suggested tasks"
            />
          </Tooltip>
        )}
      </Arrange>
      <Arrange>
        {canAddTasks ? (
          <TextButton size="small" icon={<SvgPlusCircle />} onClick={onClick}>
            Add task
          </TextButton>
        ) : null}
        {numOfTasks > 0 ? (
          <IconButton
            icon={isCollapsed ? <SvgChevronDown /> : <SvgChevronUp />}
            altText={`${isCollapsed ? 'expand' : 'collapse'} ${
              suggested ? 'suggested' : 'approved'
            } task list`}
            onClick={onClickCollapseExpand}
          />
        ) : null}
      </Arrange>
    </Arrange>
  );
};
