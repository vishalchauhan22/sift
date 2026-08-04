import cn from 'classnames';

import React, { useState } from 'react';

import { Arrange, Icon, Tooltip, Text } from '@loomhq/lens';

import { StackablePopover } from '@js/common/stackable-popover';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SvgQuickEdit } from '@loomhq/lens/icons/quick-edit';
import {
  AutoAppliedOptions,
  type AutoAppliedOptionsProps,
} from '@js/pages/share/edit-tab/common/auto-applied-options';

import $ from './styles.module.css';

type AutoAppliedPopoverButtonProps = Pick<
  AutoAppliedOptionsProps,
  | 'isAiZoomApplied'
  | 'isAiTitleApplied'
  | 'isAiChaptersApplied'
  | 'isAiSummaryApplied'
  | 'displayDefaultSettingsCallout'
  | 'videoId'
> & {
  isDisabled?: boolean;
  tooltipText?: string;
  hasAiInitiallyGenerated: boolean;
};

export const AutoAppliedPopoverButton: React.FC<
  AutoAppliedPopoverButtonProps
> = ({
  isAiZoomApplied,
  isAiTitleApplied,
  isAiChaptersApplied,
  isAiSummaryApplied,
  videoId,
  isDisabled,
  tooltipText,
  displayDefaultSettingsCallout,
  hasAiInitiallyGenerated,
}) => {
  const handleEditClick = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);

  const handlePopoverButtonClick = () => {
    if (isDisabled) {
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <StackablePopover
      isOpen={isOpen && !isDisabled}
      placement="bottomRight"
      offset={1}
      onClose={() => setIsOpen(false)}
      content={
        <div className={$.popoverContent}>
          <AutoAppliedOptions
            videoId={videoId}
            isAiZoomApplied={isAiZoomApplied}
            isAiTitleApplied={isAiTitleApplied}
            isAiChaptersApplied={isAiChaptersApplied}
            isAiSummaryApplied={isAiSummaryApplied}
            displayDefaultSettingsCallout={displayDefaultSettingsCallout}
            onTitleEditClick={handleEditClick}
            onChaptersEditClick={handleEditClick}
            onSummaryEditClick={handleEditClick}
          />
        </div>
      }
    >
      <Tooltip
        tabIndex={-1}
        content={tooltipText}
        isDisabled={!tooltipText}
        maxWidth={22}
      >
        <button
          className={cn({
            [$.popoverButton]: true,
            [$.isOpen]: isOpen,
            [$.isDisabled]: isDisabled,
          })}
          onClick={handlePopoverButtonClick}
        >
          <Arrange gap="xsmall">
            <div
              className={cn({
                [$.autoAppliedIconAnimation]: hasAiInitiallyGenerated,
              })}
            >
              <Icon
                className={$.quickEditIcon}
                size={2}
                icon={<SvgQuickEdit />}
              />
            </div>
            <div
              className={cn({
                [$.autoAppliedTextAnimation]: hasAiInitiallyGenerated,
              })}
            >
              {/* overlay text needed to fade gradient in and out */}
              {hasAiInitiallyGenerated && (
                <Text fontWeight="medium" className={$.textOverlay}>
                  Auto-applied
                </Text>
              )}
              <Text fontWeight="medium" className={$.text}>
                Auto-applied
              </Text>
            </div>
            <Icon
              className={$.chevronIcon}
              size={2}
              icon={<SvgChevronDown />}
            />
          </Arrange>
        </button>
      </Tooltip>
    </StackablePopover>
  );
};
