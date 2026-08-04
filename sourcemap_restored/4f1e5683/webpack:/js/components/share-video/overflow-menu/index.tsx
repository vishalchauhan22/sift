import { COPY_LINK } from '@js/constants/menuOptions';

import { useShareMenuOptions } from '@js/hooks/useShareMenuOptions';
import React from 'react';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Dropdown, IconButton, Tooltip } from '@loomhq/lens';
import { SvgMoreHoriz } from '@loomhq/lens/icons/more-horiz';

import { Feature } from '@loomhq/shared-utilities/constants/product';

type OverflowMenuProps = {
  currentPlanIsFreePlan: boolean;
  isDownloadGateExperiment: boolean;
};

const OverflowMenuWithoutFeatureWrapper = ({
  currentPlanIsFreePlan = false,
  isDownloadGateExperiment = false,
}: OverflowMenuProps): JSX.Element | null => {
  // TODO: Refactor this to use useBulkMenuOptions once this does not depend on a videos dashboard context
  const options = useShareMenuOptions({
    currentPlanIsFreePlan,
    isDownloadGateExperiment,
  });

  const { featureLoadedRef } = useFeatureWrapper();

  type OptionsObject = {
    title: string;
    icon: JSX.Element | null;
    onClick: () => void;
    disabled: boolean;
  };

  const getDefaultOptionProps = (option: any): OptionsObject => ({
    title: option.title || '',
    icon: option.icon || null,
    onClick: option.onClick || (() => null),
    disabled: option.disabled || false,
  });

  if (options.length === 1) {
    const option = options[0];

    if (!option || option.title === COPY_LINK) {
      return null;
    }

    const { title, icon, onClick, disabled } = getDefaultOptionProps(option);

    return (
      <IconButton
        altText={title}
        icon={icon}
        onClick={onClick}
        isDisabled={disabled}
      />
    );
  }

  // Dropdown can't accept nullish values, so we filter them out
  const validOptions = options
    .filter(Boolean)
    .map(option => getDefaultOptionProps(option));

  if (validOptions.length === 0) {
    return null;
  }

  return (
    <div ref={featureLoadedRef}>
      <Dropdown
        options={validOptions}
        trigger={
          <Tooltip
            tabIndex={-1}
            content="More actions"
            placement="bottomCenter"
          >
            <IconButton
              data-testid="toggleActions"
              id="toggleActions"
              altText="Toggle actions"
              icon={<SvgMoreHoriz />}
            />
          </Tooltip>
        }
        menuPosition="right"
        menuZIndex={1001}
      />
    </div>
  );
};

export const OverflowMenu = (props: OverflowMenuProps): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.OverflowActionsMenu}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <OverflowMenuWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};
