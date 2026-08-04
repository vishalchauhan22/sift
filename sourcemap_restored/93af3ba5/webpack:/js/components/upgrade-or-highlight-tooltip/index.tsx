import { IconCircle } from '@js/components/icon-circle';
import { BusinessHighlightTooltip } from '@js/components/share-video/common/business-highlight-tooltip';
import UpgradeTooltip from '@js/components/upgrade-tooltip';

import { useOnBusinessTrial } from '@js/hooks/eligibility/useOnBusinessTrial';
import { useHasScope } from '@js/hooks/useHasScopes';
import React from 'react';
import { UpgradeComponentFeature } from '@js/utilities/upgrades';

import { Arrange, Icon, Text } from '@loomhq/lens';
import { SvgLock } from '@loomhq/lens/icons/lock';
import { SvgEditions } from '@loomhq/lens/icons/editions';

const UpgradeOrHighlightTooltip = ({
  scope,
  placement = 'bottomCenter',
  title,
  feature = UpgradeComponentFeature.DEFAULT,
  highlightText,
  inActivitySidebar = false,
}: {
  scope: string;
  placement: 'bottomCenter' | 'rightCenter' | 'leftCenter' | 'topCenter';
  title: string;
  feature: UpgradeComponentFeature;
  highlightText: string;
  inActivitySidebar?: boolean;
}): JSX.Element => {
  const isBusinessTrial = useOnBusinessTrial();
  const hasScope = useHasScope(scope);

  return !hasScope ? (
    <UpgradeTooltip
      placement={placement}
      feature={feature}
      inActivitySidebar={inActivitySidebar}
    >
      <Arrange gap="small">
        <Text
          color="disabledContent"
          size={inActivitySidebar ? 'small' : undefined}
          fontWeight={inActivitySidebar ? 'bold' : undefined}
        >
          {title}
        </Text>
        <Icon icon={<SvgLock />} size={2} color="disabledContent" />
      </Arrange>
    </UpgradeTooltip>
  ) : isBusinessTrial ? (
    <BusinessHighlightTooltip
      tooltipDirection={placement}
      tooltipText={highlightText}
      inActivitySidebar={inActivitySidebar}
    >
      <Arrange gap="small">
        {title}
        <IconCircle size="var(--lns-space-large)" backgroundColor="upgrade">
          <Icon icon={<SvgEditions />} size={2} color="body" />
        </IconCircle>
      </Arrange>
    </BusinessHighlightTooltip>
  ) : (
    <>{title}</>
  );
};

// eslint-disable-next-line import/no-default-export
export default UpgradeOrHighlightTooltip;
