import React from 'react';

import { Align, Arrange, Icon, Text, TooltipBox } from '@loomhq/lens';

import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';

import { SvgLink } from '@loomhq/lens/icons/link';
import { RequestPlanUpgradeLocations } from '@js/constants/requestPlanUpgradeLocations';

import AddALinkPng from '@assets/img/add-a-link-tooltip.png';

// Below will be resolved when edit tab is moved into
// right-panel
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { RightPanelTooltipContent } from '@js/pages/share/right-panel';

import { EditItem, PaywalledEditItem } from './edit-item';

const AddDetectedLinkRightOption = () => {
  return (
    <Arrange gap="xsmall">
      <Align alignment="bottomCenter">
        <Text color="primary">Add</Text>
      </Align>
      <Icon icon={<SvgChevronRight />} />
    </Arrange>
  );
};

const AddLinkPopoverContent = ({
  isTrialing,
}: {
  isTrialing: boolean;
}): JSX.Element => {
  return (
    <TooltipBox>
      <RightPanelTooltipContent
        img={AddALinkPng}
        imgAlignment="bottomLeft"
        imgWidth="190px"
        altText="Link"
        text="Add a link within your video"
        trial={isTrialing}
      />
    </TooltipBox>
  );
};

export const AddLinkButton = ({
  onClick,
  disabledTooltipText,
  isTrialing,
  hasExistingLink,
  isAutoLinkDetected,
  autoLinkTitle,
  hasScope,
}: {
  onClick: () => void;
  disabledTooltipText: string;
  isTrialing: boolean;
  hasExistingLink: boolean;
  isAutoLinkDetected?: boolean;
  autoLinkTitle?: string;
  hasScope: boolean;
}): JSX.Element => {
  const buttonTitle = hasExistingLink
    ? 'Edit the link'
    : isAutoLinkDetected
      ? `${autoLinkTitle} link mentioned`
      : 'Add a link';

  if (!hasScope) {
    return (
      <PaywalledEditItem
        icon={<SvgLink />}
        title="Add a link"
        popoverContent={<AddLinkPopoverContent isTrialing={isTrialing} />}
        upgradeSourceLocation={
          RequestPlanUpgradeLocations.ADD_LINK_LOCKED_BUTTON
        }
      />
    );
  }

  return (
    <EditItem
      icon={<SvgLink />}
      title={buttonTitle}
      onClick={onClick}
      rightOption={
        isAutoLinkDetected && !hasExistingLink ? (
          <AddDetectedLinkRightOption />
        ) : (
          <Icon icon={<SvgChevronRight />} />
        )
      }
      // TODO: figure out if add link is ever disabled
      isDisabled={false}
      disabledTooltipText={disabledTooltipText}
      popoverContent={<AddLinkPopoverContent isTrialing={isTrialing} />}
    />
  );
};
