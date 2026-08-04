import {
  CSM_AI_WIDGET_CLOSED,
  CSM_AI_WIDGET_OPENED,
} from '@js/constants/events';

import cx from 'classnames';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import React, { forwardRef } from 'react';

import * as analytics from '@js/utilities/analytics';

import { incrementMetric } from '@js/utilities/metrics';

import { Arrange, Icon, Spacer, Text } from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';

import $ from './styles.module.css';
import { WIDGET_BUBBLE_SIZE, WIDGET_EDGE_OFFSET } from '../constants';
import { useCsmJourneyId } from '../csm-journey-id';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../utilities/analytics/attribute-transformer';

type CsmWidgetBubbleProps = {
  expanded: boolean;
  onMouseEnter: () => void;
  onFocus: () => void;
  onClick: () => void;
  className?: string;
  rightOffset: number;
};

export const CsmWidgetBubble = forwardRef<
  HTMLButtonElement,
  CsmWidgetBubbleProps
>(
  (
    { className, onClick, expanded, onMouseEnter, onFocus, rightOffset },
    ref
  ) => {
    const csmJourneyId = useCsmJourneyId();
    const workspace = useGetSelectedWorkspace();
    const workspacePlan = workspace?.type;

    const buttonIcon = expanded ? (
      <Icon icon={<SvgClose />} color="body" />
    ) : (
      <Text size="heading-sm" color="body">
        ?
      </Text>
    );

    const handleClick = () => {
      if (expanded) {
        incrementMetric('csm.widget.bubble.click', {
          action: 'close',
        });
        analytics.track(CSM_AI_WIDGET_CLOSED, {
          ...withIdentifiers(
            CSM_AI_WIDGET_CLOSED,
            AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
          ),
          workspacePlan,
        });
      } else {
        incrementMetric('csm.widget.bubble.click', {
          action: 'open',
        });
        analytics.track(CSM_AI_WIDGET_OPENED, {
          ...withIdentifiers(
            CSM_AI_WIDGET_OPENED,
            AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
          ),
          workspacePlan,
        });
      }

      onClick();
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-controls="csm-widget"
        aria-haspopup="dialog"
        aria-expanded={expanded}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        aria-label={!expanded ? 'Open help widget' : 'Close help widget'}
        className={cx(
          $.button,
          'border flex items:center justify:center',
          className,
          {
            [$.active]: expanded,
          }
        )}
        onClick={handleClick}
        style={{
          ['--local-widget-bubble-size' as string]: `${WIDGET_BUBBLE_SIZE}px`,
          ['--local-widget-right-edge-offset' as string]: `${rightOffset + WIDGET_EDGE_OFFSET}px`,
          ['--local-widget-bottom-edge-offset' as string]: `${WIDGET_EDGE_OFFSET}px`,
        }}
      >
        <Spacer x="medium" y="small">
          <Arrange gap="small">{buttonIcon}</Arrange>
        </Spacer>
      </button>
    );
  }
);

CsmWidgetBubble.displayName = 'CsmWidgetBubble';
