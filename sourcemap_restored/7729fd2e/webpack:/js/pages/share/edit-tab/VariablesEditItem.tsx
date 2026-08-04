// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import React, { useState } from 'react';

import { Popover, Icon } from '@loomhq/lens';
import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';
import { SvgVariables } from '@loomhq/lens/icons/variables';

import { VARIABLES_UNAVAILABLE_ON_HOVER } from '@js/constants/events';
import { redirectToVariablesEditPage } from '@js/pages/edit-video/page/transcript-editor/common/components/audioVariables/utils';
import { useIsVideoEligibleForAudioVariables } from '@js/pages/share/common/variables';

import * as analytics from '@js/utilities/analytics';

import { VariablesPopover } from './common/popovers';
import { EditItem } from './edit-item';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

export const VariablesEditItem = ({
  videoId,
  unavailableTooltipText,
}: {
  videoId: string;
  unavailableTooltipText: string;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const { hasAccess, reason } = useIsVideoEligibleForAudioVariables();

  const handleVariablesClick = () => {
    redirectToVariablesEditPage(videoId, 'share-page');
  };

  return (
    <StyledPopover
      isOpen={Boolean(hasAccess && isOpen)}
      placement="leftCenter"
      rootId="container"
      offset={1}
      content={<VariablesPopover />}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onMouseEnter={() => {
          setIsOpen(true);
          if (!hasAccess) {
            analytics.track(VARIABLES_UNAVAILABLE_ON_HOVER, {
              ...withIdentifiers(
                VARIABLES_UNAVAILABLE_ON_HOVER,
                AnalyticsEntityId.video(videoId, 'video_id')
              ),
              disabled_reason: reason,
            });
          }
        }}
        onMouseLeave={() => setIsOpen(false)}
      >
        <EditItem
          icon={<SvgVariables />}
          title="Add an audio variable"
          onClick={handleVariablesClick}
          rightOption={<Icon icon={<SvgChevronRight />} />}
          isDisabled={!hasAccess}
          disabledTooltipText={reason ?? unavailableTooltipText}
        />
      </div>
    </StyledPopover>
  );
};

const StyledPopover = styled(Popover)`
  width: 100%;
`;
